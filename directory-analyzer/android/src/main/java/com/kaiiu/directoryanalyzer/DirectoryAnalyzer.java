package com.kaiiu.directoryanalyzer;

import android.content.ContentResolver;
import android.database.Cursor;
import android.media.MediaPlayer;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;

public class DirectoryAnalyzer {

  // Method to list files in a directory
  public JSArray listFiles(Uri fileUri) throws Exception {

    Uri parentUri = getParentDirectoryUri(fileUri);
    ContentResolver contentResolver = getContext().getContentResolver();

    Uri childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(
      directoryUri,
      DocumentsContract.getTreeDocumentId(directoryUri)
    );

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
      while (cursor != null && cursor.moveToNext()) {
        String documentId = cursor.getString(0);
        String displayName = cursor.getString(1);
        String mimeType = cursor.getString(2);
        long size = cursor.getLong(3);
        long lastModified = cursor.getLong(4);

        Uri fileUri = DocumentsContract.buildDocumentUriUsingTree(
          directoryUri,
          documentId
        );

        JSObject fileObj = new JSObject();
        fileObj.put("uri", fileUri.toString());
        fileObj.put("name", displayName);
        fileObj.put("mimeType", mimeType);
        fileObj.put("size", size);
        fileObj.put("modifiedAt", lastModified);

        fileList.put(fileObj);
      }
    }

    return fileList;
  }

  private Uri getParentDirectoryUri(Uri fileUri) {
    String documentId = DocumentsContract.getDocumentId(fileUri);
    String[] parts = documentId.split(":");
    String path = parts.length > 1 ? parts[1] : "";
    int lastSlash = path.lastIndexOf('/');
    if (lastSlash != -1) {
      String parentPath = path.substring(0, lastSlash);
      String parentDocumentId = parts[0] + ":" + parentPath;
      return DocumentsContract.buildDocumentUriUsingTree(fileUri, parentDocumentId);
    } else {
      // Root directory
      return DocumentsContract.buildTreeDocumentUri(fileUri.getAuthority(), parts[0] + ":");
    }
  }
}


