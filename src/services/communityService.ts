// URL del Google Sheet publicado como CSV
const COMMUNITY_CSV_URL = 'https://docs.google.com/spreadsheets/d/17ccPWsw0hKySjjW1ukjyKDKLtLev2UGtOZFeAliBx1M/export?format=csv';

// Cache en memoria
let communityCache: CommunityCategory[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export interface CommunityMember {
    id: string;
    name: string;
    role: string;
    contact: string;
}

export interface CommunityCategory {
    id: string;
    title: string;
    members: CommunityMember[];
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
 * Descarga y parsea el CSV de comunidad
 * Estructura esperada del CSV: Categoria, Nombre, Rol, Contacto
 */
export const fetchCommunityData = async (forceRefresh: boolean = false): Promise<CommunityCategory[]> => {
    try {
        // Verificar caché
        const now = Date.now();
        if (!forceRefresh && communityCache && (now - lastFetchTime) < CACHE_DURATION) {
            console.log('[CommunityService] Usando caché');
            return communityCache;
        }

        console.log('[CommunityService] Descargando datos...');
        const response = await fetch(COMMUNITY_CSV_URL);

        if (!response.ok) {
            console.error('[CommunityService] Error al descargar:', response.status);
            return communityCache || [];
        }

        const csvText = await response.text();
        const lines = csvText.split(/\r?\n/).filter(line => line.trim());

        if (lines.length < 2) {
            console.warn('[CommunityService] CSV vacío o sin datos');
            return [];
        }

        // Agrupar por categorías
        const categoriesMap = new Map<string, CommunityMember[]>();

        for (let i = 1; i < lines.length; i++) {
            const fields = parseCSVLine(lines[i]);

            if (fields.length >= 4) {
                const [category, name, role, contact] = fields;

                if (!category) continue;

                const member: CommunityMember = {
                    id: `member-${i}`,
                    name: name || 'Sin nombre',
                    role: role || '',
                    contact: contact || '',
                };

                if (!categoriesMap.has(category)) {
                    categoriesMap.set(category, []);
                }
                categoriesMap.get(category)?.push(member);
            }
        }

        // Convertir mapa a array de categorías
        const categories: CommunityCategory[] = Array.from(categoriesMap.entries()).map(([title, members], index) => ({
            id: `cat-${index}`,
            title,
            members,
        }));

        // Guardar en caché
        communityCache = categories;
        lastFetchTime = now;

        console.log('[CommunityService] ✅ Datos cargados:', categories.length, 'categorías');
        return categories;

    } catch (error) {
        console.error('[CommunityService] Error:', error);
        return communityCache || [];
    }
};
