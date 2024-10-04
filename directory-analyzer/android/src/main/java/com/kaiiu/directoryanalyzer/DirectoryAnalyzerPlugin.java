package com.kaiiu.directoryanalyzer;

import android.app.Activity;
import android.content.Intent;
import android.content.Context;
import android.content.ContentResolver;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.provider.DocumentsContract;
import android.util.Log;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.JSObject;
import com.getcapacitor.JSArray;

@CapacitorPlugin(name = "DirectoryAnalyzer")
public class DirectoryAnalyzerPlugin extends Plugin {

  private DirectoryAnalyzer implementation;
  private AudioPlayer audioPlayer;
  private Handler handler = new Handler(Looper.getMainLooper());

  @Override
  public void load() {
    super.load();
    implementation = new DirectoryAnalyzer(getContext());
    audioPlayer = new AudioPlayer(getContext());
  }

  @PluginMethod
  public void selectDirectory(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
    intent.addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

    startActivityForResult(call, intent, "handleDirectorySelected");
  }

  @ActivityCallback
  private void handleDirectorySelected(PluginCall call, ActivityResult result) {
    if (result.getResultCode() == Activity.RESULT_OK) {
      Uri directoryUri = result.getData().getData();

      final int takeFlags = result.getData().getFlags()
        & (Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);

      getContext().getContentResolver().takePersistableUriPermission(directoryUri, takeFlags);

      JSObject ret = new JSObject();
      ret.put("directoryUri", directoryUri.toString());
      call.resolve(ret);
    } else {
      call.reject("Directory selection canceled");
    }
  }

  @PluginMethod
  public void listFilesInDirectory(PluginCall call) {
    String directoryUriStr = call.getString("directoryUri");
    if (directoryUriStr == null) {
      call.reject("Directory URI is required");
      return;
    }

    Uri directoryUri = Uri.parse(directoryUriStr);
    try {
      JSArray files = implementation.listFilesInDirectory(directoryUri);

      JSObject ret = new JSObject();
      ret.put("files", files);
      call.resolve(ret);
    } catch (Exception e) {
      call.reject("Error listing files in directory", e);
    }
  }

  @PluginMethod
  public void loadAudio(PluginCall call) {
      String uriStr = call.getString("uri");
      if (uriStr == null) {
          call.reject("URI is required");
          return;
      }

      Uri audioUri = Uri.parse(uriStr);
      try {
          audioPlayer.load(audioUri);
          call.resolve();
      } catch (Exception e) {
          call.reject("Error loading audio", e);
      }
  }

  @PluginMethod
  public void playAudio(PluginCall call) {
      audioPlayer.play();
      call.resolve();
  }

  @PluginMethod
  public void pauseAudio(PluginCall call) {
      audioPlayer.pause();
      call.resolve();
  }

  @PluginMethod
  public void stopAudio(PluginCall call) {
      audioPlayer.stop();
      call.resolve();
  }

  @PluginMethod
  public void seekAudio(PluginCall call) {
      int milliseconds = call.getInt("position", 0);
      audioPlayer.seekTo(milliseconds);
      call.resolve();
  }

  @PluginMethod
  public void skipForward(PluginCall call) {
      int milliseconds = call.getInt("milliseconds", 5000);
      audioPlayer.skipForward(milliseconds);
      call.resolve();
  }

  @PluginMethod
  public void skipBackward(PluginCall call) {
      int milliseconds = call.getInt("milliseconds", 5000);
      audioPlayer.skipBackward(milliseconds);
      call.resolve();
  }

  @PluginMethod
  public void getCurrentPosition(PluginCall call) {
      int position = audioPlayer.getCurrentPosition();
      JSObject ret = new JSObject();
      ret.put("position", position);
      call.resolve(ret);
  }

  @PluginMethod
  public void getDuration(PluginCall call) {
      int duration = audioPlayer.getDuration();
      JSObject ret = new JSObject();
      ret.put("duration", duration);
      call.resolve(ret);
  }
}
