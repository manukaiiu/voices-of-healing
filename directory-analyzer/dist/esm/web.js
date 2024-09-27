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
}
//# sourceMappingURL=web.js.map