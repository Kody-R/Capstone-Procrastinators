const hasMobile = async () => {
    await window.versions.toHasMobileDevice()
}

const noMobile = async () => {
    await window.versions.toNoMobileDevice()
}


//Used on mobileDeviceSelect to find the 'hasMobile' button and assign callback
const hasMobileButton = document.getElementById('hasMobile')
hasMobileButton.addEventListener('click', hasMobile) //goes to line 1

const noMobileDevice = document.getElementById('noMobile')
noMobileDevice.addEventListener('click', noMobile)
