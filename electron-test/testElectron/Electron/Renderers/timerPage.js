// Function to update the timer display
var timerValue = document.getElementById('timeSelect');
function updateTimerDisplay(timerValue) {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = timerValue; // Update the content of the element with the timer value
}
function startTimer() {
    let seconds = timerValue;
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const formattedSeconds = seconds % 60;
        const timerValue = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
        updateTimerDisplay(timerValue);
    }, 1000); // Update the timer every second
}
startTimer(); // Call the function to update the timer display
