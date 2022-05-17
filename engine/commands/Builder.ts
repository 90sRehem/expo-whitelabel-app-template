import { TaskHandler } from "tasks";
import { IConfig } from "./interfaces";

export class Builder {
    private readonly _taskHandler: TaskHandler;
    constructor(config: IConfig, dirSrc: string, dirDst: string) {
        this._taskHandler = new TaskHandler(
            dirSrc,
            dirDst,
            config.baseUrl,
            config.modules,
            config.theme,
            config.id,
            config.iconsPath,
            config.name)
    }
    Build() {
        this._taskHandler.CopyDirectory();
        this._taskHandler.CreateModules();
        this._taskHandler.CreateTheme();
        this._taskHandler.SetAppId();
        this._taskHandler.SetAppName();
        this._taskHandler.SetAppIcon();
        this._taskHandler.InstalAppDependencies();
    }
}