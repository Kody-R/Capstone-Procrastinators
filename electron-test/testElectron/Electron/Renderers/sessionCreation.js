const session = {
    'time': null,
    'website': null
}

const timeSelect = document.getElementById('timeSelect')

timeSelect.onchange = () => {
    session.time = timeSelect.value * 60000
    console.log(session) 
}

const websiteSelect = document.getElementById('webSelect')

websiteSelect.addEventListener("input", getInputValue)

function getInputValue(e) {
    session.website = e.target.value
    console.log(session)
}

const SendSessionData = async () => {
    await window.versions.SendSessionData(session)
}

const sendSession = document.getElementById("sendSession")
sendSession.addEventListener('click', SendSessionData)