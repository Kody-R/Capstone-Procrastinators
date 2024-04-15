const session = {
    'time': null,
    'website': null
};

const timeSelect = document.getElementById('timeSelect');
const websiteSelect = document.getElementById('webSelect');
const sendSession = document.getElementById('sendSession');

timeSelect.addEventListener('input', getInputTimeValue);
websiteSelect.addEventListener('input', getInputValue);
sendSession.addEventListener('click', SendSessionData);

function getInputTimeValue(e) {
    session.time = e.target.value * 60000; // Assuming time is represented in minutes
    console.log(session);
    updateSessionList();
}

function getInputValue(e) {
    session.website = e.target.value;
    console.log(session);
    updateSessionList();
}

const fetch = require('node-fetch');

async function completeDomain(partialDomain) {
    const apiUrl = `https://api.domainsdb.info/search?query=${partialDomain}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.domains && data.domains.length > 0) {
            const fullDomain = data.domains[0].domain;
            return fullDomain;
        } else {
            throw new Error('No results found for the provided partial domain.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}
var partialDomainsString = websiteSelect;
const partialDomains = partialDomainsString.split(',').map(domain => domain.trim()); // Convert string to array and trim whitespace
completeDomain(partialDomains)
    .then(results => {
        if (results) {
            results.forEach(result => {
                console.log(`Full domain for ${result.partialDomain}: ${result.fullDomain}`);
            });
        } else {
            console.log('Domains not found.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

function updateSessionList() {
    const sessionList = {
        'pSessionW': session.website,
        'pSessionT': session.time
    };
    console.log(sessionList);
}

async function SendSessionData() {
    await window.versions.SendSessionData(session);
}

localStorage.setItem('settings', JSON.stringify(sessionList));
console.log('Settings saved!');

const goToSessionStarted = async () => {
    await window.versions.goToSessionStarted()
}

const sessionCreated = document.getElementById("sendSession")
createSession.addEventListener('click', goToSessionStarted())