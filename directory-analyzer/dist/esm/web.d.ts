import { WebPlugin } from '@capacitor/core';
import type { DirectoryAnalyzerPlugin, ListFilesInDirectoryOptions, ListFilesResult, SelectDirectoryResult } from './definitions';
export declare class DirectoryAnalyzerWeb extends WebPlugin implements DirectoryAnalyzerPlugin {
    constructor();
    listFilesInDirectory(options: ListFilesInDirectoryOptions): Promise<ListFilesResult>;
    selectDirectory(): Promise<SelectDirectoryResult>;
    loadAudio(options: {
        uri: string;
    }): Promise<void>;
    playAudio(): Promise<void>;
    pauseAudio(): Promise<void>;
    stopAudio(): Promise<void>;
    seekAudio(options: {
        position: number;
    }): Promise<void>;
    skipForward(options: {
        milliseconds?: number;
    }): Promise<void>;
    skipBackward(options: {
        milliseconds?: number;
    }): Promise<void>;
    getCurrentPosition(): Promise<{
        position: number;
    }>;
    getDuration(): Promise<{
        duration: number;
    }>;
}
