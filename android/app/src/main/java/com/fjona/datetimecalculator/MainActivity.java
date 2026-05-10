package com.fjona.datetimecalculator;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final long SPLASH_MIN_DURATION_MS = 700L;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // installSplashScreen() must be called before super.onCreate(). It
        // takes over the launch theme and gives us programmatic dismissal,
        // replacing the brief blank flash with a branded splash on Android 12+.
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);

        // Hold the splash for a short minimum so it doesn't flash on fast devices.
        final boolean[] ready = { false };
        splashScreen.setKeepOnScreenCondition(() -> !ready[0]);
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> ready[0] = true,
            SPLASH_MIN_DURATION_MS
        );

        super.onCreate(savedInstanceState);
    }
}
