// URL del Google Sheet publicado como CSV
const ACTIVITIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1ERd7Fl9bIZaGCy80zj9lYHJPawIaFXuiZg-sf3ysSsg/export?format=csv&gid=0';

// Cache en memoria
let activitiesCache: Activity[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export interface Activity {
    id: string;
    title: string;
    date: Date;
    time: string;
    location: string;
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
 * Parsea fecha en formato DD-MM-YYYY
 */
const parseDate = (dateStr: string): Date => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // Mes base-0
        const year = parseInt(parts[2]);
        return new Date(year, month, day);
    }
    return new Date();
};

/**
 * Descarga y parsea el CSV de actividades
 */
export const fetchActivities = async (forceRefresh: boolean = false): Promise<Activity[]> => {
    try {
        // Verificar caché
        const now = Date.now();
        if (!forceRefresh && activitiesCache && (now - lastFetchTime) < CACHE_DURATION) {
            console.log('[ActivitiesService] Usando caché');
            return activitiesCache;
        }

        console.log('[ActivitiesService] Descargando actividades...');
        const response = await fetch(ACTIVITIES_CSV_URL);

        if (!response.ok) {
            console.error('[ActivitiesService] Error al descargar:', response.status);
            return activitiesCache || [];
        }

        const csvText = await response.text();
        const lines = csvText.split(/\r?\n/).filter(line => line.trim());

        if (lines.length < 2) {
            console.warn('[ActivitiesService] CSV vacío o sin datos');
            return [];
        }

        // Saltar la primera línea (headers)
        const activities: Activity[] = [];

        for (let i = 1; i < lines.length; i++) {
            const fields = parseCSVLine(lines[i]);

            if (fields.length >= 4) {
                const [title, dateStr, time, location] = fields;

                activities.push({
                    id: `activity-${i}`,
                    title: title || 'Sin título',
                    date: parseDate(dateStr),
                    time: time || '',
                    location: location || '',
                });
            }
        }

        // Ordenar por fecha (más cercana primero)
        activities.sort((a, b) => a.date.getTime() - b.date.getTime());

        // Guardar en caché
        activitiesCache = activities;
        lastFetchTime = now;

        console.log('[ActivitiesService] ✅ Actividades cargadas:', activities.length);
        return activities;

    } catch (error) {
        console.error('[ActivitiesService] Error:', error);
        return activitiesCache || [];
    }
};

/**
 * Obtiene actividades futuras (desde hoy en adelante)
 */
export const getUpcomingActivities = async (forceRefresh: boolean = false): Promise<Activity[]> => {
    const all = await fetchActivities(forceRefresh);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return all.filter(activity => activity.date >= today);
};

/**
 * Obtiene actividades pasadas
 */
export const getPastActivities = async (): Promise<Activity[]> => {
    const all = await fetchActivities();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return all.filter(activity => activity.date < today);
};
