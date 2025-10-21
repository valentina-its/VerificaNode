require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/tv';
const JWT_TOKEN = 'mySuperSecretKey123!@#456'; 
const headers = {
    Authorization: `Bearer ${JWT_TOKEN}`,
};

// Funzione per stampare solo info principali
function printTVList(path, data) {
    console.log(`\n=== ${path} ===`);
    if (!data.results || data.results.length === 0) {
        console.log('No results found');
        return;
    }
    data.results.forEach(tv => {
        console.log(`ID: ${tv.id} | Name: ${tv.name || tv.original_name} | Vote: ${tv.vote_average}`);
    });
}

// Funzione per testare un singolo endpoint
async function testEndpoint(path) {
    try {
        const res = await axios.get(`${BASE_URL}${path}`, { headers });
        printTVList(path, res.data);
    } catch (err) {
        if (err.response) {
            console.log(`\n❌ ${path} - Status: ${err.response.status}`);
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }
    }
}

// Funzione principale per eseguire tutti i test
async function runTests() {
    await testEndpoint('/popular?page=1');
    await testEndpoint('/trending?page=1');
    await testEndpoint('/on-the-air?page=1');
    await testEndpoint('/top-rated?page=1');
    await testEndpoint('/airing-today?page=1');
    await testEndpoint('/1399'); // Game of Thrones ID esempio
    await testEndpoint('/search?query=breaking+bad');
}

// Esegui i test
runTests();

