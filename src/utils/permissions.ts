import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';

export async function checkStoragePermissions(): Promise<boolean> {
  if(Capacitor.getPlatform() === 'android') {
    try {
      const permissionStatus = await Filesystem.checkPermissions();
      console.log(`>!> permissions status: ${JSON.stringify(permissionStatus, null, 2)}`);

      if(permissionStatus.publicStorage !== 'granted') {
        const result = await Filesystem.requestPermissions();
        if(result.publicStorage === 'granted') {
          console.log("Storage permission granted");
          return true;
        } else {
          console.log("Storage permission denied");
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