import { WebPlugin } from '@capacitor/core';
import type { DirectoryAnalyzerPlugin, ListFilesInDirectoryOptions, ListFilesResult } from './definitions';
export declare class DirectoryAnalyzerWeb extends WebPlugin implements DirectoryAnalyzerPlugin {
    constructor();
    listFilesInDirectory(options: ListFilesInDirectoryOptions): Promise<ListFilesResult>;
}
