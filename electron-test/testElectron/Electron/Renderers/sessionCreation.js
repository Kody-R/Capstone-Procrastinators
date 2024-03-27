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

var fs = require('fs');

fs.writeFile('C:\\mySaveFile.txt', sessionList, function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 