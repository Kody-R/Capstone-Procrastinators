const session = {
    'time': null,
    'website': null
}

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
            return { partialDomain, fullDomain }; // Return an object with both partial and full domains
        } else {
            throw new Error(`No results found for the partial domain: ${partialDomain}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Rethrow the error for consistent error handling
    }
}

// Example usage:
const partialDomainsString = websiteSelect;
const partialDomains = partialDomainsString.split(',').map(domain => domain.trim());

(async () => {
    try {
        const results = await Promise.all(partialDomains.map(completeDomain));
        results.forEach(result => {
            console.log(`Full domain for ${result.partialDomain}: ${result.fullDomain}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
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

localStorage.setItem('settings', JSON.stringify(sessionLis));
console.log('Settings saved!');



const goToSessionStarted = async () => {
    await window.versions.goToSessionStarted()
}

const sessionCreated = document.getElementById("sendSession");
createSession.addEventListener('click', goToSessionStarted());




function isValidFullDomain(input) {
    // Regular expression to match the correct format: https://example.com
    const domainPattern = /^https:\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    return domainPattern.test(input);
}
function checkValidity() {
    const inputElement = document.getElementById("webSelect");
    const inputValue = inputElement.value;
    const isValid = isValidFullDomain(inputValue);
    if (isValid) {
        console.log('Valid full domain format.');
    } else {
        alert("Invalid full domain format. E.X. https://www.example.com");
    }
}