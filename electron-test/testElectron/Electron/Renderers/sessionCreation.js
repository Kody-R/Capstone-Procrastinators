export const session = {
    'time': null,
    'website': []
};

document.addEventListener('DOMContentLoaded', function() {
    const timeSelect = document.getElementById('timeSelect');
    const websiteSelect = document.getElementById('webSelect');
    const sendSession = document.getElementById('sendSession');

    if (sendSession) {
        sendSession.addEventListener('click', async () => {
            if (checkValidity()) {
                await window.versions.SendSessionData(session);
            } else {
                document.getElementById('alertBox').classList.remove('hidden');
                document.getElementById('webSelect').value = null;
            }
        });
    }

    if (timeSelect) {
        timeSelect.addEventListener('input', function() {
            session.time = timeSelect.value * 60000;
            console.log(session);
            const sessionTime = session.time; // Declare sessionTime here
            console.log(sessionTime);
            sessionStorage.setItem('timerLength', sessionTime);
        });
    }

    if (websiteSelect) {
        websiteSelect.addEventListener('input', function() {
            session.website = websiteSelect.value;
            console.log(session);
        });
    }
});

function updateSessionList() {
    const sessionList = {
        'pSessionW': session.website,
        'pSessionT': session.time
    };
    console.log(sessionList);
    localStorage.setItem('settings', JSON.stringify(sessionList));
    console.log('Settings saved!');
}

function isValidFullDomain(input) {
    // Regular expression to match the correct format: https://www.example.com
    const domainPattern = /^https:\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    const partialDomains = input.split(',').map(domain => domain.trim());
    const results = partialDomains.map(domain => domainPattern.test(domain));
    return !results.includes(false);
}

function checkValidity() {
    const inputElement = document.getElementById('webSelect');
    const inputValue = inputElement.value;

    const isValid = isValidFullDomain(inputValue);
    if (isValid || inputValue == null) {
        console.log('Valid full domain format.');
        return true;
    } else {
        console.log('Invalid full domain format');
        return false;
    }
}
