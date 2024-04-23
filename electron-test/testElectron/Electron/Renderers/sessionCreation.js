const session = {
    'time': null,
    'website': []
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

function updateSessionList() {
    const sessionList = {
        'pSessionW': session.website,
        'pSessionT': session.time
    };
    console.log(sessionList);
}

async function SendSessionData() {
    check = await checkValidity();
        if (check) {
            await window.versions.SendSessionData(session);
        } else {
            document.getElementById('alertBox').classList.remove('hidden');
            document.getElementById("webSelect").value = null;
        }
}

localStorage.setItem('settings', JSON.stringify(sessionList));
console.log('Settings saved!');

const goToSessionStarted = async () => {
    await window.versions.goToSessionStarted()
}

const sessionCreated = document.getElementById("sendSession");
createSession.addEventListener('click', goToSessionStarted());

function isValidFullDomain(input) {
    // Regular expression to match the correct format: https://www.example.com
    const domainPattern = /^https:\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    return domainPattern.test(input);
}
async function checkValidity() {
    const inputElement = document.getElementById("webSelect");
    const inputValue = inputElement.value;
    const isValid = isValidFullDomain(inputValue);
    if (isValid) {
        console.log('Valid full domain format.');
        return true;
    } else {
        console.log("Invalid full domain format")
        return false;
    }
}