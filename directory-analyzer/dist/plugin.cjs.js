'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const DirectoryAnalyzer = core.registerPlugin('DirectoryAnalyzer', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.DirectoryAnalyzerWeb()),
});

class DirectoryAnalyzerWeb extends core.WebPlugin {
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DirectoryAnalyzerWeb: DirectoryAnalyzerWeb
});

exports.DirectoryAnalyzer = DirectoryAnalyzer;
//# sourceMappingURL=plugin.cjs.js.map
