import { Copydirectory } from "tasks/CopyDirectory";
import { CreateModules } from "tasks/CreateModules";
import { CreateTheme } from "tasks/CreateTheme";
import { InstallDependencies } from "tasks/InstallDependencies";
import { SetIcon } from "tasks/SetIcon";
import { SetId } from "tasks/SetId";
import { SetName } from "tasks/SetName";
import { IConfig } from "./interfaces/IConfig";

export function Build(config: IConfig, dirSrc: string, dirDst: string) {
    Copydirectory(dirSrc, dirDst);
    CreateModules(dirDst, config.modules);
    CreateTheme(dirDst, config.theme);
    SetId(dirDst, config.id);
    SetName(dirDst, config.name);
    SetIcon(dirDst, config.iconsPath);
    InstallDependencies(dirDst);
}