const session = {
    'time': null,
    'website': null,
    'apps': null
};

document.addEventListener('DOMContentLoaded', function() {
    const timeSelect = document.getElementById('prevTime');
    const websiteSelect = document.getElementById('prevWebSelect');
    const sendSession = document.getElementById('sendPrevSession');
    const prevApps = document.getElementById('prevApps');
    if (sendSession) {
        sendSession.addEventListener('click', async () => {
            if (checkValidity()) {
                sessionStorage.setItem('websiteList', session.website);
                sessionStorage.setItem('timerLength', session.time);
                await window.versions.SendSessionData(session);
            }
        });
    }

    // Retrieve prevTimer from localStorage
    const prevTimer = localStorage.getItem('prevTimer');
    session.time = prevTimer;
    const prevTime = ((prevTimer / 1000) % 3600) / 60
    timeSelect.textContent = prevTime == 1 ? prevTime + " minute" : prevTime + " minutes";

    // Retrieve prevWebsiteList from localStorage
    const prevWebsites = localStorage.getItem('prevWebsiteList');
    session.website = prevWebsites;
    websiteSelect.textContent = prevWebsites;
    console.log(prevWebsites);

    const prevApplications = localStorage.getItem('prevApps');
    session.apps = prevApplications;
    prevApps.textContent = prevApplications;
});

function isValidFullDomain(input) {
    // Regular expression to match the correct format: https://www.example.com
    const domainPattern = /^https:\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    const partialDomains = input.split(',').map(domain => domain.trim());
    const beginning = "https://www."
    const end = ".com"
    for(let i = 0; i < partialDomains.length; i++){
        partialDomains[i] = beginning + partialDomains[i] + end;
    }
    const results = partialDomains.map(domain => domainPattern.test(domain));
    return !results.includes(false);
}

function checkValidity() {
    const inputValue = localStorage.getItem('prevWebsiteList');

    const isValid = isValidFullDomain(inputValue);
    if (isValid || inputValue == null) {
        console.log('Valid full domain format.');
        return true;
    } else {
        console.log('Invalid full domain format');
        return false;
    }
}