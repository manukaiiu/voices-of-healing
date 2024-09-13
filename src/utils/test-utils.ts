import { Directory, Filesystem } from "@capacitor/filesystem";

export class TestUtils {
  static async selectTest(testPath: string) {
    try {
      console.log(`>!> selecting Directory.Data`);
      const data = await Filesystem.readdir({
        directory: Directory.Data,
        path: testPath,
      });
      console.log(`>!> data content: ${JSON.stringify(data.files.map(file => file.name), null, 2)}`);
    } catch(e) {}

    try {
      console.log(`>!> selecting Directory.Documents`);
      const documents = await Filesystem.readdir({
        directory: Directory.Documents,
        path: testPath,
      });
      console.log(`>!> documents content: ${JSON.stringify(documents.files.map(file => file.name), null, 2)}`);
    } catch(e) {}

    try {
      console.log(`>!> selecting Directory.External`);
      const external = await Filesystem.readdir({
        directory: Directory.External,
        path: testPath,
      });
      console.log(`>!> external content: ${JSON.stringify(external.files.map(file => file.name), null, 2)}`);
    } catch(e) {}

    try {
      console.log(`>!> selecting Directory.Library`);
      const lirbrary = await Filesystem.readdir({
        directory: Directory.Library,
        path: testPath,
      });
      console.log(`>!> lirbrary content: ${JSON.stringify(lirbrary.files.map(file => file.name), null, 2)}`);
    } catch(e) {}

    try {
      console.log(`>!> selecting Directory.ExternalStorage`);
      const externalStorageContent = await Filesystem.readdir({
        directory: Directory.ExternalStorage,
        path: testPath,
      });
      console.log(`>!> external storage content: ${JSON.stringify(externalStorageContent.files.map(file => file.name), null, 2)}`);
    } catch(e) {}
  };
}