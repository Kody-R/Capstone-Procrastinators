const { contextBridge, ipcRenderer } = require('electron')

//Allows for call backs between the main process and render process
contextBridge.exposeInMainWorld('versions', {
    node: () => process.version.node,
    chrome: () => process.version.chrome,
    electron: () => process.version.electron,
    toMobile: () => ipcRenderer.invoke('to-mobile'),
    toHasMobileDevice: () => ipcRenderer.invoke('has-mobile-device'),
    toNoMobileDevice: () => ipcRenderer.invoke('no-mobile-device'),
    inputValue: (input) => ipcRenderer.invoke('input-value', input),
    installExtension: () => ipcRenderer.invoke('extension-install')
})