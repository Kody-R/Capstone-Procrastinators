import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class AppKiller {

    private static List<String> bannedProcesses = new ArrayList<>();
    
    public static void main(String[] args) {
        // Add banned processes to the list
        bannedProcesses.add("Spotify.exe");
        bannedProcesses.add("CalculatorApp.exe");
		bannedProcesses.add("msedge.exe");
        
        // Create a timer to check for running processes periodically
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                checkAndTerminateProcesses();
            }
        }, 0, 3000); // Check every 5 seconds (you can adjust this interval)
    }
    
    private static void checkAndTerminateProcesses() {
        try {
            ProcessBuilder builder = new ProcessBuilder("tasklist");
            Process process = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                for (String bannedProcess : bannedProcesses) {
                    if (line.toLowerCase().contains(bannedProcess.toLowerCase())) {
                        terminateProcess(getPID(line));
                        break;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private static int getPID(String tasklistOutput) {
        String[] parts = tasklistOutput.trim().split("\\s+");
        return Integer.parseInt(parts[1]);
    }
    
   private static void terminateProcess(int pid) {
    try {
        ProcessBuilder builder = new ProcessBuilder("taskkill", "/F", "/PID", String.valueOf(pid));
        Process process = builder.start();
        process.waitFor();
    } catch (IOException | InterruptedException e) {
        e.printStackTrace();
    }
	System.out.println("Terminated a process");
}

}
