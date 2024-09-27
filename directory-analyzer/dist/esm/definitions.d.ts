export interface DirectoryAnalyzerPlugin {
    listFilesInDirectory(options: ListFilesInDirectoryOptions): Promise<ListFilesResult>;
}
export interface ListFilesInDirectoryOptions {
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
