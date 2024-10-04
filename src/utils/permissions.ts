import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';

export async function checkStoragePermissions(): Promise<boolean> {
  if(Capacitor.getPlatform() === 'android') {
    try {
      const permissionStatus = await Filesystem.checkPermissions();

      if(permissionStatus.publicStorage !== 'granted') {
        const result = await Filesystem.requestPermissions();
        if(result.publicStorage === 'granted') {
          return true;
        } else {
          return false;
        }
      }
    } catch(error) {
      console.error('Error checking/requesting permissions:', error);
      return false;
    }
  }
  return true;
}
