import { registerPlugin } from '@capacitor/core';
const DirectoryAnalyzer = registerPlugin('DirectoryAnalyzer', {
    web: () => import('./web').then(m => new m.DirectoryAnalyzerWeb()),
});
export * from './definitions';
export { DirectoryAnalyzer };
//# sourceMappingURL=index.js.map