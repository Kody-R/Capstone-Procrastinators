const session = {
    'time': null,
    'website': null
};

document.addEventListener('DOMContentLoaded', function() {
    const timeSelect = document.getElementById('prevTime');
    const websiteSelect = document.getElementById('prevWebSelect');
    const sendSession = document.getElementById('sendPrevSession');

    if (sendSession) {
        sendSession.addEventListener('click', async () => {
            sessionStorage.setItem('websiteList', session.website);
            sessionStorage.setItem('timerLength', session.time);
            await window.versions.SendSessionData(session);
        });
    }

    // Retrieve prevTimer from localStorage
    const prevTimer = localStorage.getItem('prevTimer');
    session.time = prevTimer;
    timeSelect.textContent = ((prevTimer / 1000) % 3600) / 60 + " minutes";

    // Retrieve prevWebsiteList from localStorage
    const prevWebsites = localStorage.getItem('prevWebsiteList');
    session.website = prevWebsites;
    websiteSelect.textContent = prevWebsites;
    console.log(prevWebsites);
});
