const goToCreateSession = async () => {
    await window.versions.goToCreateSession()
}

const goToSessionSelecion = async () => {
    await window.versions.goToSessionSelection()
}

const startSession = document.getElementById("startSession")
startSession.addEventListener('click', goToSessionSelecion)

const createSession = document.getElementById("createSession")
createSession.addEventListener('click', goToCreateSession)