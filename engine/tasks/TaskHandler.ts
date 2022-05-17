import { CopyDirectory } from "./CopyDirectory";
import { CreateBaseUrl } from "./CreateBaseUrl";
import { CreateModules } from "./CreateModules";
import { CreateTheme } from "./CreateTheme";
import { InstallAppDependencies } from "./InstallAppDependencies";
import { ITasks } from "./interfaces";
import { SetAppIcon } from "./SetAppIcon";
import { SetAppId } from "./SetAppId";
import { SetAppName } from "./SetAppName";

export class TaskHandler implements ITasks {
    private readonly _copyDirectory: CopyDirectory;
    private readonly _createBaseUrl: CreateBaseUrl;
    private readonly _createModules: CreateModules;
    private readonly _createTheme: CreateTheme;
    private readonly _installAppDependencies: InstallAppDependencies;
    private readonly _setAppId: SetAppId;
    private readonly _setAppIcon: SetAppIcon;
    private readonly _setAppName: SetAppName
    constructor(
        dirSrc: string,
        dirDst: string,
        baseUrl: string,
        modules: string[],
        theme: string,
        newAppId: string,
        iconsPath: string,
        newAppName: string
    ) {
        this._copyDirectory = new CopyDirectory(dirSrc, dirDst);
        this._createBaseUrl = new CreateBaseUrl(dirSrc, dirDst);
        this._createModules = new CreateModules(dirDst, modules);
        this._createTheme = new CreateTheme(dirDst, theme);
        this._installAppDependencies = new InstallAppDependencies(dirDst);
        this._setAppId = new SetAppId(dirDst, newAppId);
        this._setAppIcon = new SetAppIcon(dirDst, iconsPath);
        this._setAppName = new SetAppName(dirDst, newAppName);
    }
    CopyDirectory(): void {
        return this._copyDirectory.Execute()
    }
    CreateBaseUrl(): void {
        return this._createBaseUrl.Execute()
    }
    CreateModules(): void {
        return this._createModules.Execute()
    }
    CreateTheme(): void {
        return this._createTheme.Execute()
    }
    InstalAppDependencies(): void {
        return this._installAppDependencies.Execute()
    }
    SetAppId(): void {
        return this._setAppId.Execute()
    }
    SetAppIcon(): void {
        return this._setAppIcon.Execute()
    }
    SetAppName(): void {
        return this._setAppName.Execute()
    }
}