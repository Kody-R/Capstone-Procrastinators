let timerInterval; // Define a variable to hold the interval
import { session } from './sessionCreation.js';

// Function to update the timer display
function updateTimerDisplay(timerValue) {
    document.getElementById('timerDisplay').textContent = timerValue;
}

// Function to update the goal display
function updateGoalDisplay(goalValue) {
    document.getElementById('endGoalTime').textContent = goalValue;
}

const sessionTime = sessionStorage.getItem('timerLength');

// Function to start the timer
function startTimer() {
    console.log("Timer Started");
        console.log(sessionTime);
        if (sessionTime !== null) {
            // Assuming sessionTime is in seconds
            const totalSeconds = sessionTime / 1000;
            const endGoalH = Math.floor(totalSeconds / 3600);
            const endGoalM = Math.floor((totalSeconds % 3600) / 60);
            const endGoalS = totalSeconds % 60;

            const endGoalValue = `${endGoalH.toString().padStart(2, '0')}:${endGoalM.toString().padStart(2, '0')}:${endGoalS.toString().padStart(2, '0')}`;
            console.log(endGoalValue);
            updateGoalDisplay(endGoalValue);

            let seconds = sessionTime / 1000;
            clearInterval(timerInterval); // Clear any existing interval
            timerInterval = setInterval(() => {
                seconds--;
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const formattedSeconds = seconds % 60;
                const timerValue = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
                updateTimerDisplay(timerValue);
            }, 1000); // Update the timer every second
 // Update the timer every second
        } else {
            console.error("Timer Value is null!")  
    }
}

startTimer();

setTimeout(() => {
    clearInterval(timerInterval);
    console.log("Interval cleared");
    session.website = [];
    session.time = null;
}, sessionTime);
