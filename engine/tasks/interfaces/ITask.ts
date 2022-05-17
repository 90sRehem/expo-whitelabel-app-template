export interface ITask {
    // CopyDirectory(dirSrc: string, dirDst: string): void;
    // CreateBaseUrl(dirDst: string, baseUrl: string): void;
    // CreateModules(dirDst: string, modules: string[]): void;
    // CreateTheme(dirDst: string, theme: string): void;
    // InstalAppDependencies(dirDst: string): void;
    // SetAppId(dirDst: string, newAppId: string): void;
    // SetAppIcon(dirDst: string, iconsPath: string): void;
    // SetAppName(dirDst: string, newAppName: string): void;
    Execute(): void;
}