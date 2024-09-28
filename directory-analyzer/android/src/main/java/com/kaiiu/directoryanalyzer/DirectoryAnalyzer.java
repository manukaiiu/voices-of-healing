package com.kaiiu.directoryanalyzer;

import android.content.ContentResolver;
import android.database.Cursor;
import android.media.MediaPlayer;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.util.Log;
import android.content.Context;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;

public class DirectoryAnalyzer {
  private static final String TAG = "DirectoryAnalyzer";

  // Method to list files in a directory
  public JSArray listFiles(Uri fileUri, Context context) throws Exception {

    Uri directoryUri = getParentDirectoryUri(fileUri);
    Log.d(TAG, "Calculated directoryUri: " + directoryUri.toString());

    ContentResolver contentResolver = context.getContentResolver();

    Uri childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(
      directoryUri,
      DocumentsContract.getTreeDocumentId(directoryUri)
    );
    Log.d(TAG, "Children URI: " + childrenUri.toString());

    JSArray fileList = new JSArray();

    try (Cursor cursor = contentResolver.query(
      childrenUri,
      new String[]{
        DocumentsContract.Document.COLUMN_DOCUMENT_ID,
        DocumentsContract.Document.COLUMN_DISPLAY_NAME,
        DocumentsContract.Document.COLUMN_MIME_TYPE,
        DocumentsContract.Document.COLUMN_SIZE,
        DocumentsContract.Document.COLUMN_LAST_MODIFIED
      },
      null,
      null,
      null
    )) {
      if (cursor != null) {
        while (cursor.moveToNext()) {
          String documentId = cursor.getString(0);
          String displayName = cursor.getString(1);
          String mimeType = cursor.getString(2);
          long size = cursor.getLong(3);
          long lastModified = cursor.getLong(4);

          Uri singleFileUri = DocumentsContract.buildDocumentUriUsingTree(
            directoryUri,
            documentId
          );

          JSObject fileObj = new JSObject();
          fileObj.put("uri", singleFileUri.toString());
          fileObj.put("name", displayName);
          fileObj.put("mimeType", mimeType);
          fileObj.put("size", size);
          fileObj.put("modifiedAt", lastModified);

          fileList.put(fileObj);
        }

      } else {
        Log.e(TAG, "Cursor is null. Could not query children URIs.");
      }
    } catch (Exception e) {
      Log.e(TAG, "Error querying directory", e);
      throw e;
    }

    Log.e(TAG, "All done, returning fileList");
    return fileList;
  }

  // TODO fix and make get Parent Dir code right
  private Uri getParentDirectoryUri(Uri fileUri) {
    Log.d(TAG, "Getting parent directory for fileUri: " + fileUri.toString());
    String documentId = DocumentsContract.getDocumentId(fileUri);
    Log.d(TAG, "Document ID: " + documentId);

    String[] parts = documentId.split(":");
    String path = parts.length > 1 ? parts[1] : "";
    Log.d(TAG, "Path: " + path);
    int lastSlash = path.lastIndexOf('/');

    String parentDocumentId;
    if (lastSlash != -1) {
        String parentPath = path.substring(0, lastSlash);
        parentDocumentId = parts[0] + ":" + parentPath;
        Log.d(TAG, "Parent Document ID: " + parentDocumentId);
    } else {
        // Root directory
        parentDocumentId = parts[0] + ":";
        Log.d(TAG, "Root Document ID (storage root): " + parentDocumentId);
    }

    Uri parentUri = DocumentsContract.buildTreeDocumentUri(
        fileUri.getAuthority(),
        parentDocumentId
    );
    Log.d(TAG, "Parent Tree URI: " + parentUri.toString());

    return parentUri;

    // if (lastSlash != -1) {
    //   String parentPath = path.substring(0, lastSlash);
    //   String parentDocumentId = parts[0] + ":" + parentPath;
    //   Log.d(TAG, "Parent Document ID: " + parentDocumentId);

    //   return DocumentsContract.buildDocumentUriUsingTree(fileUri, parentDocumentId);
    // } else {
    //   // Root directory
    //   Log.d(TAG, "Run DocumentsContract.buildTreeDocumentUri to finde root directory.");
    //   return DocumentsContract.buildTreeDocumentUri(fileUri.getAuthority(), parts[0] + ":");
    // }
  }
}


