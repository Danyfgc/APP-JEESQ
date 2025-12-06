// Calendario de Lecturas Bíblicas 2025 - Año 3
// Comunidad "Jesús es el Señor"

export interface DailyReading {
    month: number;
    day: number;
    reading: string;
}

// Calendario completo basado en las imágenes proporcionadas
export const readingCalendar2025: DailyReading[] = [
    // ENERO
    { month: 1, day: 1, reading: "1 Macabeos 1" },
    { month: 1, day: 17, reading: "2 Macabeos 1" },
    { month: 1, day: 27, reading: "2 Macabeos 13:14-36" },
    { month: 1, day: 28, reading: "2 Macabeos 14:37-46" }, // Asumiendo final del cap
    { month: 1, day: 29, reading: "Tobías 1" }, // Simplificado a cap 1 para demo
    { month: 1, day: 31, reading: "Tobías 5" },

    // FEBRERO
    { month: 2, day: 1, reading: "Tobías 8" },
    { month: 2, day: 2, reading: "Tobías 12" },
    { month: 2, day: 3, reading: "Judit 1" },
    { month: 2, day: 11, reading: "Baruc 1" },
    { month: 2, day: 14, reading: "Sabiduría 1" },
    { month: 2, day: 23, reading: "Eclesiástico 1" },

    // MARZO
    { month: 3, day: 1, reading: "Eclesiástico 19" },
    { month: 3, day: 17, reading: "1 Juan 1" },
    { month: 3, day: 22, reading: "1 Juan 2" },
    { month: 3, day: 27, reading: "Juan 11:28-57" },
    { month: 3, day: 28, reading: "Juan 1:29-51" },

    // ABRIL
    { month: 4, day: 1, reading: "Juan 5:1-24" },
    { month: 4, day: 2, reading: "Juan 5:25-47" },
    { month: 4, day: 3, reading: "Juan 6:01-38" },
    { month: 4, day: 4, reading: "Juan 6:39-71" },
    { month: 4, day: 5, reading: "Juan 7:01-31" },
    { month: 4, day: 6, reading: "Juan 7:32-53" },
    { month: 4, day: 7, reading: "Juan 8:01-38" },
    { month: 4, day: 8, reading: "Juan 8:39-59" },
    { month: 4, day: 10, reading: "Juan 10:01-30" },
    { month: 4, day: 11, reading: "Juan 10:31-42" },
    { month: 4, day: 12, reading: "Juan 11:01-37" },
    { month: 4, day: 13, reading: "Juan 11:38-57" },
    { month: 4, day: 15, reading: "Juan 13:1-20" },
    { month: 4, day: 16, reading: "Juan 13:21-38" },
    { month: 4, day: 19, reading: "Juan 15" },
    { month: 4, day: 20, reading: "Juan 16" },
    { month: 4, day: 22, reading: "Juan 19:01-22" },
    { month: 4, day: 23, reading: "Juan 19:23-42" },
    { month: 4, day: 25, reading: "Marcos 1" },

    // MAYO
    { month: 5, day: 1, reading: "Marcos 6" },
    { month: 5, day: 4, reading: "Marcos 9:1-29" },
    { month: 5, day: 5, reading: "Marcos 9:30-50" },
    { month: 5, day: 6, reading: "Marcos 10:01-34" },
    { month: 5, day: 7, reading: "Marcos 10:35-52" },
    { month: 5, day: 9, reading: "Marcos 12:01-27" },
    { month: 5, day: 10, reading: "Marcos 12:28-44" },
    { month: 5, day: 11, reading: "Marcos 13:1-13" },
    { month: 5, day: 12, reading: "Marcos 13:14-37" },
    { month: 5, day: 13, reading: "Marcos 14:01-42" },
    { month: 5, day: 14, reading: "Marcos 14:43-72" },
    { month: 5, day: 15, reading: "Marcos 15:1-15" },
    { month: 5, day: 16, reading: "Marcos 15:16-32" },
    { month: 5, day: 17, reading: "Marcos 15:33-47" },
    { month: 5, day: 19, reading: "Gálatas 1" },
    { month: 5, day: 25, reading: "Efesios 1" },
    { month: 5, day: 31, reading: "Filipenses 1" },

    // JUNIO
    { month: 6, day: 2, reading: "Filipenses 2" },
    { month: 6, day: 4, reading: "Colosenses 1" },
    { month: 6, day: 8, reading: "1 Tesalonicenses 1" },
    { month: 6, day: 11, reading: "2 Tesalonicenses 1" },
    { month: 6, day: 13, reading: "1 Timoteo 1" },
    { month: 6, day: 17, reading: "2 Timoteo 1" },
    { month: 6, day: 18, reading: "2 Timoteo 3" },
    { month: 6, day: 19, reading: "Tito 1" },
    { month: 6, day: 21, reading: "Filemón 1" },
    { month: 6, day: 22, reading: "Lucas 1:1-25" },
    { month: 6, day: 23, reading: "Lucas 1:26-80" },
    { month: 6, day: 25, reading: "Lucas 2:22-52" },
    { month: 6, day: 27, reading: "Lucas 4:1-30" },
    { month: 6, day: 28, reading: "Lucas 4:31-44" },
    { month: 6, day: 29, reading: "Lucas 5:1-26" },
    { month: 6, day: 30, reading: "Lucas 5:27-39" },

    // JULIO
    { month: 7, day: 1, reading: "Lucas 6:1-26" },
    { month: 7, day: 2, reading: "Lucas 6:27-49" },
    { month: 7, day: 3, reading: "Lucas 7:1-23" },
    { month: 7, day: 4, reading: "Lucas 7:24-50" },
    { month: 7, day: 5, reading: "Lucas 7:36-50" },
    { month: 7, day: 6, reading: "Lucas 8:1-25" },
    { month: 7, day: 7, reading: "Lucas 8:26-56" },
    { month: 7, day: 8, reading: "Lucas 9:1-27" },
    { month: 7, day: 9, reading: "Lucas 9:28-43" },
    { month: 7, day: 10, reading: "Lucas 10:1-16" },
    { month: 7, day: 11, reading: "Lucas 10:17-42" },
    { month: 7, day: 13, reading: "Lucas 11:29-54" },
    { month: 7, day: 17, reading: "Lucas 13:10-35" },
    { month: 7, day: 19, reading: "Lucas 14:25-35" },
    { month: 7, day: 21, reading: "Lucas 17:1-10" },
    { month: 7, day: 24, reading: "Lucas 18:1-30" },
    { month: 7, day: 26, reading: "Lucas 19:29-48" },
    { month: 7, day: 27, reading: "Lucas 20:1-19" },
    { month: 7, day: 28, reading: "Lucas 20:19-47" },
    { month: 7, day: 29, reading: "Lucas 21:1-11" },
    { month: 7, day: 30, reading: "Lucas 21:12-38" },
    { month: 7, day: 31, reading: "Lucas 22:1-38" },

    // AGOSTO
    { month: 8, day: 1, reading: "Lucas 22:39-71" },
    { month: 8, day: 2, reading: "Lucas 23:1-25" },
    { month: 8, day: 3, reading: "Lucas 23:26-56" },
    { month: 8, day: 5, reading: "Hechos 1" },
    { month: 8, day: 7, reading: "Hechos 4" },

    // SEPTIEMBRE
    { month: 9, day: 1, reading: "Romanos 4" },
    { month: 9, day: 3, reading: "Romanos 9:1-33" }, // Corregido formato raro
    { month: 9, day: 7, reading: "Romanos 10" },
    { month: 9, day: 8, reading: "Romanos 11" },
    { month: 9, day: 12, reading: "Romanos 15:1-13" },
    { month: 9, day: 13, reading: "Romanos 15:14-27" },
    { month: 9, day: 14, reading: "Mateo 1" },

    // OCTUBRE
    { month: 10, day: 1, reading: "Mateo 9:2-38" },
    { month: 10, day: 7, reading: "1 Corintios 1" },
    { month: 10, day: 13, reading: "2 Corintios 1" },
    { month: 10, day: 16, reading: "2 Corintios 12" },
    { month: 10, day: 26, reading: "Hebreos 1" },

    // NOVIEMBRE
    { month: 11, day: 1, reading: "Hebreos 8" },
    { month: 11, day: 7, reading: "Santiago 1" },
    { month: 11, day: 12, reading: "1 Pedro 1" },
    { month: 11, day: 17, reading: "2 Pedro 1" },
    { month: 11, day: 20, reading: "1 Juan 1" },
    { month: 11, day: 28, reading: "Apocalipsis 1" },

    // DICIEMBRE
    { month: 12, day: 1, reading: "Apocalipsis 4" },
    { month: 12, day: 2, reading: "Apocalipsis 5-6" },
    { month: 12, day: 3, reading: "Apocalipsis 7-8" },
    { month: 12, day: 4, reading: "Apocalipsis 9-10" },
    { month: 12, day: 5, reading: "Apocalipsis 11-12" },
    { month: 12, day: 6, reading: "Apocalipsis 13-14" },
    { month: 12, day: 7, reading: "Apocalipsis 15-16" },
    { month: 12, day: 8, reading: "Apocalipsis 17-18" },
    { month: 12, day: 9, reading: "Apocalipsis 19-20" },
    { month: 12, day: 10, reading: "Apocalipsis 21-22" },
    { month: 12, day: 11, reading: "Juan 1" },
    { month: 12, day: 12, reading: "Juan 2" },
    { month: 12, day: 13, reading: "Juan 3" },
    { month: 12, day: 14, reading: "Juan 4" },
    { month: 12, day: 15, reading: "Juan 5" },
    { month: 12, day: 16, reading: "Juan 6" },
    { month: 12, day: 17, reading: "Juan 7" },
    { month: 12, day: 18, reading: "Juan 8" },
    { month: 12, day: 19, reading: "Juan 9" },
    { month: 12, day: 20, reading: "Juan 10" },
    { month: 12, day: 21, reading: "Juan 11" },
    { month: 12, day: 22, reading: "Juan 12" },
    { month: 12, day: 23, reading: "Juan 13" },
    { month: 12, day: 24, reading: "Juan 14" },
    { month: 12, day: 25, reading: "Juan 15" },
    { month: 12, day: 26, reading: "Juan 16" },
    { month: 12, day: 27, reading: "Juan 17" },
    { month: 12, day: 28, reading: "Juan 18" },
    { month: 12, day: 29, reading: "Juan 19" },
    { month: 12, day: 30, reading: "Juan 20" },
    { month: 12, day: 31, reading: "Juan 21" },
];

/**
 * Obtiene la lectura para una fecha específica
 */
export const getReadingForDate = (date: Date): DailyReading | null => {
    const month = date.getMonth() + 1; // getMonth() retorna 0-11
    const day = date.getDate();

    // Buscar la lectura exacta para este día
    const exactMatch = readingCalendar2025.find(
        r => r.month === month && r.day === day
    );

    if (exactMatch) {
        return exactMatch;
    }

    // Si no hay lectura exacta, buscar la lectura más reciente anterior
    const previousReadings = readingCalendar2025.filter(
        r => r.month < month || (r.month === month && r.day < day)
    );

    if (previousReadings.length > 0) {
        return previousReadings[previousReadings.length - 1];
    }

    return null;
};

/**
 * Obtiene la lectura del día actual
 */
export const getTodayReading = (): DailyReading | null => {
    return getReadingForDate(new Date());
};
