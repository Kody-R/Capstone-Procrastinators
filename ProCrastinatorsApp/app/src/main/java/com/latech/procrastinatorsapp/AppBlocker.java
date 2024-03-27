package com.latech.procrastinatorsapp;

import android.app.ActivityManager;
import android.app.Service;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import java.util.List;

public class AppBlocker extends Service {

    private final Context appContext;

    public AppBlocker(Context appContext) {
        this.appContext = appContext;
    }


    public void detectForegroundActivity() {
//        UsageStatsManager usageStatsManager = new UsageStatsManager();
    }

    public static void closeActivity() {
        // finishAndRemoveTask() will close the current activity and associated activities
    }

    public void goToHomeScreen() {
        detectForegroundActivity(); // quick button test for detect foreground
        Intent startHomeScreen = new Intent(Intent.ACTION_MAIN);
        startHomeScreen.addCategory(Intent.CATEGORY_HOME);
        startHomeScreen.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        this.appContext.startActivity(startHomeScreen);
    }


    // App launches cannot be detected in Android directly, instead we have to loop over currently running apps to periodically check.
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    // required for services. Using default.
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
