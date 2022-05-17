import { Copydirectory } from "tasks";
import { IConfig } from "./interfaces/IConfig";

export class GenerateApp {
    private readonly _config: IConfig;
    private readonly _dirSrc: string;
    private readonly _dirDst: string;
    private readonly Copydirectory: typeof Copydirectory;
    private readonly CreateModules
    private readonly CreateTheme
    private readonly SetId
    private readonly SetName
    private readonly SetIcon
    private readonly InstallDependencies

    constructor(
        config: IConfig,
        dirSrc: string,
        dirDst: string
    ) {
        this._config = config;
        this._dirSrc = dirSrc;
        this._dirDst = dirDst;
    }


}