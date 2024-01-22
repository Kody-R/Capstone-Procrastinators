const installExtension = async () => {
    await window.versions.installExtension()
}

const installButton = document.getElementById('install-button')
installButton.addEventListener('click', installExtension)