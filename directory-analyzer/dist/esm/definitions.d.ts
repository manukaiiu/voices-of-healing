export interface DirectoryAnalyzerPlugin {
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
export interface ListFilesInDirectoryOptions {
    directoryUri: string;
}
export interface SelectDirectoryResult {
    directoryUri: string;
}
export interface ListFilesResult {
    files: FileInfo[];
}
export interface FileInfo {
    uri: string;
    name: string;
    mimeType: string;
    size: number;
    modifiedAt: number;
}
