export const bibleBookMapping: { [key: string]: string } = {
    // Antiguo Testamento
    'génesis': 'gn', 'genesis': 'gn',
    'éxodo': 'ex', 'exodo': 'ex',
    'levítico': 'lv', 'levitico': 'lv',
    'números': 'nm', 'numeros': 'nm',
    'deuteronomio': 'dt',
    'josué': 'js', 'josue': 'js',
    'jueces': 'jz',
    'rut': 'rt',
    '1 samuel': '1sm', 'i samuel': '1sm',
    '2 samuel': '2sm', 'ii samuel': '2sm',
    '1 reyes': '1rs', 'i reyes': '1rs',
    '2 reyes': '2rs', 'ii reyes': '2rs',
    '1 crónicas': '1cr', 'i cronicas': '1cr', '1 cronicas': '1cr',
    '2 crónicas': '2cr', 'ii cronicas': '2cr', '2 cronicas': '2cr',
    'esdras': 'ed',
    'nehemías': 'ne', 'nehemias': 'ne',
    'ester': 'et',
    'job': 'job',
    'salmos': 'sl', 'salmo': 'sl',
    'proverbios': 'pr',
    'eclesiastés': 'ec', 'eclesiastes': 'ec',
    'cantares': 'cnt', 'cantar de los cantares': 'cnt',
    'isaías': 'is', 'isaias': 'is',
    'jeremías': 'jr', 'jeremias': 'jr',
    'lamentaciones': 'lm',
    'ezequiel': 'ez',
    'daniel': 'dn',
    'oseas': 'os',
    'joel': 'jl',
    'amós': 'am', 'amos': 'am',
    'abdías': 'abd', 'abdias': 'abd',
    'jonás': 'jon', 'jonas': 'jon',
    'miqueas': 'mi',
    'nahúm': 'na', 'nahum': 'na',
    'habacuc': 'hab',
    'sofonías': 'sof', 'sofonias': 'sof',
    'hageo': 'hag',
    'zacarías': 'zac', 'zacarias': 'zac',
    'malaquías': 'mal', 'malaquias': 'mal',

    // Nuevo Testamento
    'mateo': 'mt',
    'marcos': 'mr',
    'lucas': 'lc',
    'juan': 'jn',
    'hechos': 'hch', 'hechos de los apóstoles': 'hch',
    'romanos': 'rm',
    '1 corintios': '1co', 'i corintios': '1co',
    '2 corintios': '2co', 'ii corintios': '2co',
    'gálatas': 'gl', 'galatas': 'gl',
    'efesios': 'ef',
    'filipenses': 'flp',
    'colosenses': 'col',
    '1 tesalonicenses': '1ts', 'i tesalonicenses': '1ts',
    '2 tesalonicenses': '2ts', 'ii tesalonicenses': '2ts',
    '1 timoteo': '1ti', 'i timoteo': '1ti',
    '2 timoteo': '2ti', 'ii timoteo': '2ti',
    'tito': 'tit',
    'filemón': 'flm', 'filemon': 'flm',
    'hebreos': 'he',
    'santiago': 'stg',
    '1 pedro': '1p', 'i pedro': '1p',
    '2 pedro': '2p', 'ii pedro': '2p',
    '1 juan': '1jn', 'i juan': '1jn',
    '2 juan': '2jn', 'ii juan': '2jn',
    '3 juan': '3jn', 'iii juan': '3jn',
    'judas': 'jd',
    'apocalipsis': 'ap',
};

export const getBookAbbreviation = (bookName: string): string | null => {
    const normalized = bookName.toLowerCase().trim();
    // Intentar coincidencia exacta
    if (bibleBookMapping[normalized]) {
        return bibleBookMapping[normalized];
    }

    // Intentar buscar si contiene el nombre (para casos como "1 de Juan")
    for (const [key, value] of Object.entries(bibleBookMapping)) {
        if (normalized.includes(key)) {
            return value;
        }
    }

    return null;
};
