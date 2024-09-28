import { EConfigState, IAudioInfo } from "@/stores/audio.store";
import { DirectoryAnalyzer, FileInfo } from "directory-analyzer";

export interface ISetupInfos {
  configState: EConfigState,
  audioInfos: IAudioInfo[];
}

export class SetupUtils {

  static async selectDirectoryAndProcessAudios(): Promise<ISetupInfos> {
    const directoryUri = await this.selectDirectory();
    if(!directoryUri) return { configState: EConfigState.INITIAL, audioInfos: [] };

    let configState = EConfigState.SETUP;
    const audioInfos = await this.listFilesInDirectory(directoryUri);

    configState = EConfigState.READY;
    return { configState, audioInfos };
  }

  static async selectDirectory(): Promise<string> {
    try {
      const result = await DirectoryAnalyzer.selectDirectory();
      return result.directoryUri;
    } catch(err) {
      console.error('Error selecting directory:', err);
    }
    return '';
  }

  static async listFilesInDirectory(directoryUri: string): Promise<IAudioInfo[]> {
    try {
      const result = await DirectoryAnalyzer.listFilesInDirectory({ directoryUri });
      const files = result.files as FileInfo[];
      console.log('Files in directory:', files);

      const mp3Files = files.filter(file => file.mimeType === 'audio/mpeg');
      console.log('Found mp3 count:', mp3Files.length);

      return mp3Files.map(mp3File => ({
        name: mp3File.name,
        fileUri: mp3File.uri,
      }))
    } catch(err) {
      console.error('Error listing files in directory:', err);
    }

    return [];
  }
}