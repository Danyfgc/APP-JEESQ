import { getBookAbbreviation } from '../data/bibleMapping';

// URL de la Biblia en español (Reina Valera) en formato JSON
const BIBLE_JSON_URL = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json';

// Cache en memoria para la Biblia completa
let bibleCache: any[] | null = null;

export interface BibleVerse {
    reference: string;
    text: string;
    translation_name: string;
}

/**
 * Lista de libros deuterocanónicos que NO están en RVR
 */
const DEUTEROCANONICAL_BOOKS = [
    'macabeos', 'tobías', 'tobias', 'judit', 'baruc',
    'sabiduría', 'sabiduria', 'eclesiástico', 'eclesiastico', 'sirácida'
];

/**
 * Verifica si un libro es deuterocanónico
 */
const isDeuterocanonical = (reference: string): boolean => {
    const refLower = reference.toLowerCase();
    return DEUTEROCANONICAL_BOOKS.some(book => refLower.includes(book));
};

/**
 * Inicializa y descarga la Biblia JSON si no está en caché
 */
const initBible = async (): Promise<boolean> => {
    if (bibleCache) {
        return true; // Ya está cargada
    }

    try {
        console.log('[BibleService] Descargando Biblia en español...');
        const response = await fetch(BIBLE_JSON_URL);

        if (!response.ok) {
            console.error('[BibleService] Error descargando Biblia:', response.status);
            return false;
        }

        bibleCache = await response.json();
        console.log('[BibleService] ✅ Biblia cargada exitosamente');
        return true;
    } catch (error) {
        console.error('[BibleService] Error al cargar Biblia:', error);
        return false;
    }
};

/**
 * Parsea una referencia bíblica
 * Ejemplos: "Juan 3:16", "Juan 3:16-18", "Juan 3"
 */
const parseReference = (reference: string) => {
    // Regex mejorado para capturar libro, capítulo y versículos
    const match = reference.match(/^((?:\d\s)?[a-zA-ZáéíóúÁÉÍÓÚñÑ\.]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?/);

    if (!match) return null;

    const book = match[1].trim();
    const chapter = parseInt(match[2]);
    const verseStart = match[3] ? parseInt(match[3]) : 1;
    const verseEnd = match[4] ? parseInt(match[4]) : (match[3] ? parseInt(match[3]) : 999);

    const abbrev = getBookAbbreviation(book);
    if (!abbrev) {
        console.warn('[BibleService] No se encontró abreviatura para:', book);
        return null;
    }

    return { abbrev, chapter, verseStart, verseEnd };
};

/**
 * Obtiene el texto bíblico desde el JSON local
 */
export const fetchBibleText = async (reference: string): Promise<BibleVerse | null> => {
    try {
        // Verificar si es deuterocanónico
        if (isDeuterocanonical(reference)) {
            console.warn('[BibleService] Libro deuterocanónico solicitado:', reference);
            return null; // Activará el botón web
        }

        // Inicializar Biblia si es necesario
        const initialized = await initBible();
        if (!initialized || !bibleCache) {
            console.error('[BibleService] No se pudo cargar la Biblia');
            return null;
        }

        // Parsear referencia
        const parsed = parseReference(reference);
        if (!parsed) {
            console.warn('[BibleService] No se pudo parsear:', reference);
            return null;
        }

        const { abbrev, chapter, verseStart, verseEnd } = parsed;

        // Buscar el libro en el JSON
        const bookData = bibleCache.find((b: any) => b.abbrev === abbrev);
        if (!bookData) {
            console.warn('[BibleService] Libro no encontrado en JSON:', abbrev);
            return null;
        }

        const chapterIndex = chapter - 1;
        if (chapterIndex < 0 || chapterIndex >= bookData.chapters.length) {
            console.warn('[BibleService] Capítulo no encontrado:', chapter);
            return null;
        }

        const chapterVerses = bookData.chapters[chapterIndex];

        // Construir el texto
        let text = '';
        const start = verseStart - 1; // base-0
        const end = verseEnd === 999 ? chapterVerses.length : verseEnd;

        // Validar rangos
        if (start < 0 || start >= chapterVerses.length) {
            console.warn('[BibleService] Versículo fuera de rango');
            return null;
        }

        // Extraer versículos
        const verses = chapterVerses.slice(start, end);
        text = verses.join(' ');

        console.log('[BibleService] ✅ Texto obtenido:', reference);

        return {
            reference: reference,
            text: text,
            translation_name: 'Reina Valera 1960 (Español)',
        };

    } catch (error) {
        console.error('[BibleService] Error obteniendo texto:', error);
        return null;
    }
};

/**
 * Genera la URL para leer en BibleGateway
 * SIEMPRE usa DHH (Dios Habla Hoy) que es una Biblia Católica completa
 * DHH incluye los 73 libros católicos (66 + 7 deuterocanónicos)
 */
export const getBibleGatewayUrl = (reference: string): string => {
    const encodedRef = encodeURIComponent(reference);
    // DHH = "Dios Habla Hoy" - Versión Católica con deuterocanónicos
    return `https://www.biblegateway.com/passage/?search=${encodedRef}&version=DHH`;
};

/**
 * Obtiene un resumen del texto (primeros 200 caracteres)
 */
export const getBibleSummary = async (
    reference: string,
    maxLength: number = 200
): Promise<string> => {
    const verse = await fetchBibleText(reference);

    if (!verse || !verse.text) {
        return `Lectura: ${reference}`;
    }

    const text = verse.text.trim();

    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + '...';
};
