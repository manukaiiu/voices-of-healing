import { WebPlugin } from '@capacitor/core';
import type {
  DirectoryAnalyzerPlugin,
  ListFilesInDirectoryOptions,
  ListFilesResult,
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
}
