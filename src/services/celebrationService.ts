import { format } from 'date-fns';

// URL del Google Sheet publicado como CSV
const CELEBRATIONS_CSV_URL = 'https://docs.google.com/spreadsheets/d/13xBA21Z62bE6YSc06zWR6Rkfl28BC-BGKAaRIvAps9Q/export?format=csv';

// Cache en memoria
let celebrationsCache: Celebration[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora (menos frecuente que actividades)

export interface Celebration {
    id: string;
    date: string; // Format: DD-MM
    category: 'Cumpleaños' | 'Aniversario' | string;
    name: string;
}

/**
 * Parsea una línea CSV teniendo en cuenta comillas
 */
const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
};

/**
 * Descarga y parsea el CSV de celebraciones
 * Estructura esperada: Fecha (DD-MM), Categoria, Nombre
 */
export const fetchCelebrations = async (forceRefresh: boolean = false): Promise<Celebration[]> => {
    try {
        // Verificar caché
        const now = Date.now();
        if (!forceRefresh && celebrationsCache && (now - lastFetchTime) < CACHE_DURATION) {
            console.log('[CelebrationService] Usando caché');
            return celebrationsCache;
        }

        console.log('[CelebrationService] Descargando datos...');
        const response = await fetch(CELEBRATIONS_CSV_URL);

        if (!response.ok) {
            console.error('[CelebrationService] Error al descargar:', response.status);
            return celebrationsCache || [];
        }

        const csvText = await response.text();
        const lines = csvText.split(/\r?\n/).filter(line => line.trim());

        if (lines.length < 2) {
            console.warn('[CelebrationService] CSV vacío o sin datos');
            return [];
        }

        const celebrations: Celebration[] = [];

        for (let i = 1; i < lines.length; i++) {
            const fields = parseCSVLine(lines[i]);

            if (fields.length >= 3) {
                const [dateStr, category, name] = fields;

                if (!dateStr || !name) continue;

                celebrations.push({
                    id: `cel-${i}`,
                    date: dateStr, // Se asume formato DD-MM
                    category: category || 'Celebración',
                    name: name,
                });
            }
        }

        // Guardar en caché
        celebrationsCache = celebrations;
        lastFetchTime = now;

        console.log('[CelebrationService] ✅ Datos cargados:', celebrations.length);
        return celebrations;

    } catch (error) {
        console.error('[CelebrationService] Error:', error);
        return celebrationsCache || [];
    }
};

/**
 * Obtiene las celebraciones del día de hoy
 */
export const getTodaysCelebrations = async (forceRefresh: boolean = false): Promise<Celebration[]> => {
    const all = await fetchCelebrations(forceRefresh);
    const todayStr = format(new Date(), 'dd-MM');

    return all.filter(c => c.date === todayStr);
};
