const toMobile = async () => {
    await window.versions.toMobile()
}

//Used on index.html to find the 'toMobileSelect' button and assign callback
const toMobileSelect = document.getElementById('toMobileSelect')
toMobileSelect.addEventListener('click', toMobile)
