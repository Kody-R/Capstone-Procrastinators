const inputValue = async (event) => {
    const input = parseInt(event.data, 10);
    await window.versions.inputValue(input)
} 

document.querySelectorAll('.code-input').forEach(input => {
    input.addEventListener('input', (event) => inputValue(event))
})
