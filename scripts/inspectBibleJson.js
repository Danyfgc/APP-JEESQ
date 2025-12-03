const fetch = require('node-fetch');

const BIBLE_JSON_URL = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json';

async function inspectBible() {
    try {
        console.log('Fetching Bible JSON...');
        const response = await fetch(BIBLE_JSON_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        console.log('Bible fetched successfully.');
        console.log('Total books:', data.length);

        console.log('\n--- Book List ---');
        data.forEach(book => {
            console.log(`Name: "${book.name}", Abbrev: "${book.abbrev}"`);
        });

        // Check first chapter of Genesis to see structure
        if (data.length > 0) {
            console.log('\n--- Structure Check (Genesis Chapter 1) ---');
            console.log('Chapters type:', Array.isArray(data[0].chapters) ? 'Array' : typeof data[0].chapters);
            console.log('First chapter type:', Array.isArray(data[0].chapters[0]) ? 'Array' : typeof data[0].chapters[0]);
            console.log('First verse:', data[0].chapters[0][0]);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

inspectBible();
