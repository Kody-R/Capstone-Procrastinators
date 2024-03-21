package com.latech.procrastinatorsapp;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.view.View;

public class AppBlocker {

    // finishAndRemoveTask() will close the current activity and associated activities

    public static void findForegroundActivity() {
        // source: https://stackoverflow.com/questions/19852069/blocking-android-apps-programmatically
        // need to modify this to not use deprecated functions 
        ActivityManager mActivityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> RunningTask = mActivityManager.getRunningTasks(1);
        ActivityManager.RunningTaskInfo ar = RunningTask.get(0);
        activityOnTop=ar.topActivity.getClassName();
    }

    public static void closeActivity() {

    }

    public void goToHomeScreen() {
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Context mContext = View.getContext();
        mContext.startActivity(startMain);
    }

}
