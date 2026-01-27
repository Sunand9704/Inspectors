
async function fetchCareers() {
    try {
        const response = await fetch('http://localhost:8021/api/careers');
        const json = await response.json();
        const careers = json.data;
        const ndt = careers.find(c => c.title.includes('NDT'));
        if (ndt) {
            console.log('NDT Career Description:', JSON.stringify(ndt.description, null, 2));
            console.log('NDT Career Description Type:', typeof ndt.description);
            console.log('Is Array?', Array.isArray(ndt.description));
        } else {
            console.log('NDT not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchCareers();
