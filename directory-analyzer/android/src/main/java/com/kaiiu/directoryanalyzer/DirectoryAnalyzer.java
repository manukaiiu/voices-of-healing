package com.kaiiu.directoryanalyzer;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.util.Log;
import android.content.Context;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;

public class DirectoryAnalyzer {
  private Context context;
  private static final String TAG = "DirectoryAnalyzer";

  public DirectoryAnalyzer(Context context) {
    this.context = context;
  }

  public JSArray listFilesInDirectory(Uri directoryUri) throws Exception {
    ContentResolver contentResolver = context.getContentResolver();
    String directoryDocumentId = DocumentsContract.getTreeDocumentId(directoryUri);

    Uri childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(
      directoryUri,
      directoryDocumentId
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
      if (cursor != null) {
        while (cursor.moveToNext()) {
          String documentId = cursor.getString(0);
          String displayName = cursor.getString(1);
          String mimeType = cursor.getString(2);
          long size = cursor.getLong(3);
          long lastModified = cursor.getLong(4);

          Uri childUri = DocumentsContract.buildDocumentUriUsingTree(
            directoryUri,
            documentId
          );

          JSObject fileObj = new JSObject();
          fileObj.put("uri", childUri.toString());
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
      throw e;
    }

    return fileList;
  }
}
