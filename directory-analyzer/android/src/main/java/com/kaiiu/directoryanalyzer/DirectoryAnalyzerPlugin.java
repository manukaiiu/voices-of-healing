package com.kaiiu.directoryanalyzer;

import android.content.ContentResolver;
import android.net.Uri;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "DirectoryAnalyzer")
public class DirectoryAnalyzerPlugin extends Plugin {

  private DirectoryAnalyzer implementation = new DirectoryAnalyzer();

  @PluginMethod
  public void listFilesInDirectory(PluginCall call) {
    String fileUriStr = call.getString("fileUri");
    if (fileUriStr == null) {
      call.reject("File URI is required");
      return;
    }

    try {
      Uri fileUri = Uri.parse(fileUriStr);
      JSArray files = implementation.listFiles(fileUri, getContext());

      JSObject ret = new JSObject();
      ret.put("files", files);
      call.resolve(ret);
    } catch (Exception e) {
      call.reject("Error listing files in directory", e);
    }
  }

  // TODO remove (if hopefully not needed)
  // @PluginMethod
  // public void playAudio(PluginCall call) {
  //   String fileUriStr = call.getString("fileUri");
  //   if (fileUriStr == null) {
  //     call.reject("File URI is required");
  //     return;
  //   }

  //   Uri fileUri = Uri.parse(fileUriStr);
  //   ContentResolver contentResolver = getContext().getContentResolver();

  //   try {
  //     implementation.playAudio(fileUri, contentResolver);
  //     call.resolve();
  //   } catch (Exception e) {
  //     call.reject("Error playing audio", e);
  //   }
  // }
}
