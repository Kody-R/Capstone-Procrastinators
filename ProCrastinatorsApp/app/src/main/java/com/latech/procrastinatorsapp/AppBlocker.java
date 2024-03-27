package com.latech.procrastinatorsapp;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;

import androidx.annotation.Nullable;

public class AppBlocker extends Service {

    private final Context appContext;

    public AppBlocker(Context appContext) {
        this.appContext = appContext;
    }

    // finishAndRemoveTask() will close the current activity and associated activities

//    public static void findForegroundActivity() {
//        // source: https://stackoverflow.com/questions/19852069/blocking-android-apps-programmatically
//        // need to modify this to not use deprecated functions
//        ActivityManager mActivityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
//        List<ActivityManager.RunningTaskInfo> RunningTask = mActivityManager.getRunningTasks(1);
//        ActivityManager.RunningTaskInfo ar = RunningTask.get(0);
//        activityOnTop=ar.topActivity.getClassName();
//    }

    public static void closeActivity() {

    }

    public void goToHomeScreen() {
        Intent startHomeScreen = new Intent(Intent.ACTION_MAIN);
        startHomeScreen.addCategory(Intent.CATEGORY_HOME);
        startHomeScreen.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        this.appContext.startActivity(startHomeScreen);
    }


    // App launches cannot be detected in Android directly, instead we have to loop over currently running apps
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
