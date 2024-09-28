import { WebPlugin } from '@capacitor/core';
export class DirectoryAnalyzerWeb extends WebPlugin {
    constructor() {
        super({
            name: 'DirectoryAnalyzer',
            platforms: ['web'],
        });
    }
    async listFilesInDirectory(options) {
        console.warn(`listFilesInDirectory is not implemented on web with options: `, options);
        return { files: [] };
    }
    async selectDirectory() {
        console.warn(`selectDirectory is not implemented on web`);
        return { directoryUri: '' };
    }
    async loadAudio(options) {
        console.warn(`loadAudio not implemented `, options);
        return;
    }
    async playAudio() {
        console.warn(`playAudio not implemented`);
        return;
    }
    async pauseAudio() {
        console.warn(`pauseAudio not implemented`);
        return;
    }
    async stopAudio() {
        console.warn(`stopAudio not implemented`);
        return;
    }
    async seekAudio(options) {
        console.warn(`seekAudio not implemented `, options);
        return;
    }
    async skipForward(options) {
        console.warn(`skipForward not implemented `, options);
        return;
    }
    async skipBackward(options) {
        console.warn(`skipBackward not implemented `, options);
        return;
    }
    async getCurrentPosition() {
        console.warn(`getCurrentPosition not implemented`);
        return { position: 0 };
    }
    async getDuration() {
        console.warn(`getDuration not implemented`);
        return { duration: 0 };
    }
}
//# sourceMappingURL=web.js.map