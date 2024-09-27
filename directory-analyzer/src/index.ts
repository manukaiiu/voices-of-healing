import { registerPlugin } from '@capacitor/core';

import type { DirectoryAnalyzerPlugin } from './definitions';

const DirectoryAnalyzer = registerPlugin<DirectoryAnalyzerPlugin>('DirectoryAnalyzer', {
  web: () => import('./web').then(m => new m.DirectoryAnalyzerWeb()),
});

export * from './definitions';
export { DirectoryAnalyzer };
