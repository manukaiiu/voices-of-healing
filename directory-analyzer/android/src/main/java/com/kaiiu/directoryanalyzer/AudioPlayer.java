package com.kaiiu.directoryanalyzer;

import android.net.Uri;
import android.util.Log;
import android.content.Context;
import android.media.MediaPlayer;
import java.io.IOException;

public class AudioPlayer {
  private Context context;
  private MediaPlayer mediaPlayer;
  private static final String TAG = "AudioPlayer";

  public AudioPlayer(Context context) {
    this.context = context;
  }

  public void load(Uri audioUri) throws IOException {
    release();
    mediaPlayer = new MediaPlayer();
    mediaPlayer.setDataSource(context, audioUri);
    mediaPlayer.prepare();
    mediaPlayer.seekTo(0);
  }

  public void play() {
    if (mediaPlayer != null) {
      mediaPlayer.start();
    }
  }

  public void pause() {
    if (mediaPlayer != null && mediaPlayer.isPlaying()) {
      mediaPlayer.pause();
    }
  }

  public void stop() {
    if (mediaPlayer != null) {
      mediaPlayer.stop();
      try {
        mediaPlayer.prepare();
        mediaPlayer.seekTo(0);
      } catch (IOException e) {
        Log.e(TAG, "Error preparing MediaPlayer after stop", e);
      }
    }
  }

  public void seekTo(int milliseconds) {
    if (mediaPlayer != null) {
      mediaPlayer.seekTo(milliseconds);
    }
  }

  public int getCurrentPosition() {
    return mediaPlayer != null ? mediaPlayer.getCurrentPosition() : 0;
  }

  public int getDuration() {
    return mediaPlayer != null ? mediaPlayer.getDuration() : 0;
  }

  public void skipForward(int milliseconds) {
    if (mediaPlayer != null) {
      int newPosition = mediaPlayer.getCurrentPosition() + milliseconds;
      mediaPlayer.seekTo(Math.min(newPosition, mediaPlayer.getDuration()));
    }
  }

  public void skipBackward(int milliseconds) {
    if (mediaPlayer != null) {
      int newPosition = mediaPlayer.getCurrentPosition() - milliseconds;
      mediaPlayer.seekTo(Math.max(newPosition, 0));
    }
  }

  public void release() {
    if (mediaPlayer != null) {
      mediaPlayer.release();
      mediaPlayer = null;
    }
  }
}
