package com.latech.procrastinatorsapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.net.URI;
import java.net.URISyntaxException;

public class MainActivity extends AppCompatActivity {

    private TextView tvReceivedData;
    private EditText etServerName, etServerPort;
    private Button btnClientConnect;
    private String serverName;
    private int serverPort;

    private AppBlocker appBlocker;
    private Button btnGoHome;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // websocket
        tvReceivedData = findViewById(R.id.tvRecTxt);
        etServerName = findViewById(R.id.etServerName);
        etServerPort = findViewById(R.id.etServerPort);
        btnClientConnect = findViewById(R.id.btnClientConnect);

        // service
        btnGoHome = findViewById(R.id.btnGoHome);
        appBlocker = new AppBlocker(getApplicationContext());

    }

    public void onClickConnect(View view) {

        serverName = etServerName.getText().toString();
        serverPort = Integer.parseInt(etServerPort.getText().toString());

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URI uri = new URI("ws://" + serverName + ":" + serverPort);
                    WebSocketClient wsc = new WebSocketClient(uri) {
                        @Override
                        public void onMessage(String message) {
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    tvReceivedData.setText(message);
                                }
                            });
                        }

                        @Override
                        public void onOpen(ServerHandshake handshake) {
                            System.out.println("Opened connection");
                        }

                        @Override
                        public void onClose(int code, String reason, boolean remote) {
                            System.out.println("Closed connection.\nReason: " + reason);
                        }

                        @Override
                        public void onError(Exception e) {
                            e.printStackTrace();
                        }
                    };
                    wsc.connect();
                } catch (URISyntaxException e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }

    public void onClickGoHome(View view) {

        appBlocker.goToHomeScreen();

    }

}