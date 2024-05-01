//const dialog = require('node-file-dialog')

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
    for(let i = 0; i < selectedApplications.length; i++){
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

document.addEventListener('DOMContentLoaded', function() {
    const timeSelect = document.getElementById('timeSelect');
    const websiteSelect = document.getElementById('webSelect');
    const sendSession = document.getElementById('sendSession');
    generateApplicationOptions();
    if (sendSession) {
        sendSession.addEventListener('click', async () => {
            GetAppsToBlock();
            if (checkValidity()) {
                localStorage.setItem('prevApps', session.apps);
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
            console.log(session.time);
            sessionStorage.setItem('timerLength', session.time);
            localStorage.setItem('prevTimer', session.time);
        });
    }

    if (websiteSelect) {
        websiteSelect.addEventListener('input', function() {
            session.website = websiteSelect.value;
            console.log(session.website);
            sessionStorage.setItem('websiteList', session.website);
            localStorage.setItem('prevWebsiteList', session.website);
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

function getFilePaths() {
    const config = {
        type: 'directory',
        filetypes: { 
            'Executable': '*.exe',
            'All files': '*.*',
        }
    };
    var dirs;
    dialog(config).then(dir => dirs = dir).catch(err => console.log(err));
    console.log(dirs);
    return dirs;
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
