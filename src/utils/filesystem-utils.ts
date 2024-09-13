import { EConfigState } from "@/stores/audio.store";

export class FilesystemUtils {

  static async scanAndProcessAudios(): Promise<EConfigState> {


    return EConfigState.SETUP;
  }
}