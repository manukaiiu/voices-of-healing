import { WebPlugin } from '@capacitor/core';
import type {
  DirectoryAnalyzerPlugin,
  ListFilesInDirectoryOptions,
  ListFilesResult,
  SelectDirectoryResult,
} from './definitions';

export class DirectoryAnalyzerWeb extends WebPlugin implements DirectoryAnalyzerPlugin {
  constructor() {
    super({
      name: 'DirectoryAnalyzer',
      platforms: ['web'],
    });
  }

  async listFilesInDirectory(options: ListFilesInDirectoryOptions): Promise<ListFilesResult> {
    console.warn(`listFilesInDirectory is not implemented on web with options: `, options);
    return { files: [] };
  }

  async selectDirectory(): Promise<SelectDirectoryResult> {
    console.warn(`selectDirectory is not implemented on web`);
    return { directoryUri: '' };
  }

  async loadAudio(options: { uri: string }): Promise<void>{
    console.warn(`loadAudio not implemented `, options);
    return;
  }

  async playAudio(): Promise<void>{
    console.warn(`playAudio not implemented`);
    return;
  }

  async pauseAudio(): Promise<void>{
    console.warn(`pauseAudio not implemented`);
    return;
  }

  async stopAudio(): Promise<void>{
    console.warn(`stopAudio not implemented`);
    return;
  }

  async seekAudio(options: { position: number }): Promise<void>{
    console.warn(`seekAudio not implemented `, options);
    return;
  }

  async skipForward(options: { milliseconds?: number }): Promise<void>{
    console.warn(`skipForward not implemented `, options);
    return;
  }

  async skipBackward(options: { milliseconds?: number }): Promise<void>{
    console.warn(`skipBackward not implemented `, options);
    return;
  }

  async getCurrentPosition(): Promise<{ position: number }>{
    console.warn(`getCurrentPosition not implemented`);
    return { position: 0 };
  }

  async getDuration(): Promise<{ duration: number }>{
    console.warn(`getDuration not implemented`);
    return { duration: 0 };
  }
}
