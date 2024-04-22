const session = {
    'time': null,
    'website': null,
    'apps': null
};

const applicationOptions = [
    { value: 'steam.exe', label: 'Steam' },
    { value: 'discord.exe', label: 'Discord' },
    { value: 'origin.exe', label: 'Origin' },
    { value: 'youtube.exe', label: 'YouTube' },
    { value: 'hulu.exe', label: 'Hulu' },
    { value: 'minecraft.exe', label: 'Minecraft' },
    { value: 'vlc.exe', label: 'VLC' },
    { value: 'disneyplus.exe', label: 'Disney Plus' },
    { value: 'hbomax.exe', label: 'HBO Max' },
    { value: 'peacock.exe', label: 'Peacock' },
    { value: 'roblox.exe', label: 'Roblox' },
    { value: 'spotify.exe', label: 'Spotify' }
    // Add more application options as needed
];

let selectedApplications = ['msedge.exe','firefox.exe','opera.exe'];

const timeSelect = document.getElementById('timeSelect');
const websiteSelect = document.getElementById('webSelect');
const sendSession = document.getElementById('sendSession');
const fileDialog = document.getElementById('openFileDialog');

timeSelect.addEventListener('input', getInputTimeValue);
websiteSelect.addEventListener('input', getInputValue);
sendSession.addEventListener('click', SendSessionData);
fileDialog.addEventListener('click', getFilePaths);
generateApplicationOptions();


function GetAppsToBlock(){
    const checkboxes = document.querySelectorAll('input[name="applicationOption"]');
    const selectedOptions = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Check if any checkboxes are selected
    if (selectedOptions.length === 0) {
        // If none are selected, add all options to selectedApplications
        selectedApplications = ['msedge.exe','firefox.exe','opera.exe'];
        applicationOptions.forEach(option => {
        if (!selectedApplications.includes(option.value)) {
            selectedApplications.push(option.value);
        }
    });

    } else {
        // Otherwise, append selected options to selectedApplications list
        selectedApplications = ['msedge.exe','firefox.exe','opera.exe'];
        selectedOptions.forEach(option => {
            if (!selectedApplications.includes(option)) {
                selectedApplications.push(option);
            }
        });
    }

    // Log selected applications
    let appsToBlock = ""
    for(i = 0; i < selectedApplications.length; i ++){
        appsToBlock += selectedApplications[i] + " "
    }
    console.log(appsToBlock)
    session.apps = appsToBlock;
}

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
    GetAppsToBlock();
    if(session.time == null){
        session.time = 1800000;
    }
    await window.versions.SendSessionData(session);
}

var fs = require('fs');

fs.writeFile('C:\mySaveFile.txt', sessionList, function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 


async function getFilePaths() {
    await window.versions.getFilePaths();
}

// Function to dynamically generate checkboxes for application options
function generateApplicationOptions() {
    const applicationOptionsDiv = document.getElementById('applicationOptions');

    // Generate checkboxes for application options
    applicationOptions.forEach(option => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'applicationOption';
        checkbox.value = option.value;
        applicationOptionsDiv.appendChild(checkbox);

        const label = document.createElement('label');
        label.textContent = option.label;
        applicationOptionsDiv.appendChild(label);

        applicationOptionsDiv.appendChild(document.createElement('br'));
    });

    // Add 'ALL' checkbox
    const allCheckbox = document.createElement('input');
    allCheckbox.type = 'checkbox';
    allCheckbox.name = 'selectAll';
    allCheckbox.value = 'ALL';
    allCheckbox.id = 'selectAllCheckbox';
    allCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('input[name="applicationOption"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    const allLabel = document.createElement('label');
    allLabel.textContent = 'ALL';
    allLabel.setAttribute('for', 'selectAllCheckbox');

    applicationOptionsDiv.appendChild(allCheckbox);
    applicationOptionsDiv.appendChild(allLabel);
    applicationOptionsDiv.appendChild(document.createElement('br'));
}

// Call the function to generate checkboxes when the page loads

// List to store selected applications

// Function to handle saving selected options

