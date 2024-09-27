import { Directory, Filesystem } from "@capacitor/filesystem";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { DirectoryAnalyzer, FileInfo } from 'directory-analyzer';

export class TestUtils {
  static async selectTestAllUsingFileSystem(testPath: string = '') {
    await this.selectTest(Directory.Data, testPath);
    await this.selectTest(Directory.Documents, testPath);
    await this.selectTest(Directory.Library, testPath);
    await this.selectTest(Directory.External, testPath);
    await this.selectTest(Directory.ExternalStorage, testPath);
  }

  static async selectTest(directoryToRead: Directory, testPath: string = '') {
    try {
      console.log(`>!> selecting "${directoryToRead}"`);
      const data = await Filesystem.readdir({
        directory: directoryToRead,
        path: testPath,
      });
      console.log(`>!> "${directoryToRead}" content: ${JSON.stringify(data.files.map(file => file.name), null, 2)}`);
    } catch(e) {
      console.log(`>!> error reading "${directoryToRead}": ${JSON.stringify(e, null, 2)}`, e)
    }
  };

  static async selectDirectoryUsingFilePicker(): Promise<void> {
    try {
      const result = await FilePicker.pickFiles({ readData: false });
      console.log(`>!> result: ${JSON.stringify(result, null, 2)} `, result);

      if(result.files[0].path) {
        await this.listFilesInSameDirectory(result.files[0].path)
      }
    } catch(err) {
      console.error('Error picking directory:', err);
    }
  }


  static async listFilesInSameDirectory(fileUri: string): Promise<void> {
    try {
      const result = await DirectoryAnalyzer.listFilesInDirectory({ fileUri });
      const files = result.files as FileInfo[];
      console.log(`Files in directory - result: ${JSON.stringify(result)} `, files);

      // Filter for MP3 files
      const mp3Files = files.filter(file => file.mimeType === 'audio/mpeg');
      console.log(`Found mp3 count: `, mp3Files.length);

      // Store or process the mp3Files as needed
    } catch(err) {
      console.error('Error listing files in directory:', err);
    }
  };

}