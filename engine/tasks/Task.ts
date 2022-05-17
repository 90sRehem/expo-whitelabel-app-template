import { ITask } from "./interfaces/ITask";

export class Tasks implements ITask {
    CopyDirectory(dirSrc: string, dirDst: string): void {
        throw new Error("Method not implemented.");
    }
    CreateBaseUrl(dirDst: string, baseUrl: string): void {
        throw new Error("Method not implemented.");
    }
    CreateModules(dirDst: string, modules: string[]): void {
        throw new Error("Method not implemented.");
    }
    CreateTheme(dirDst: string, theme: string): void {
        throw new Error("Method not implemented.");
    }
    InstalAppDependencies(dirDst: string): void {
        throw new Error("Method not implemented.");
    }
    SetAppId(dirDst: string, newAppId: string): void {
        throw new Error("Method not implemented.");
    }
    SetAppIcon(dirDst: string, iconsPath: string): void {
        throw new Error("Method not implemented.");
    }
    SetAppName(dirDst: string, newAppName: string): void {
        throw new Error("Method not implemented.");
    }

}