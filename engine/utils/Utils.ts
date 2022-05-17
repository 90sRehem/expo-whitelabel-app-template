import path from "path";
import { IConfig } from "interfaces";
import { FsExtra } from "libs";

export class Utils {
    private static _fsExtra = FsExtra;
    public static ValidateField(fieldName: string, field: string | string[]) {
        if (!field) {
            console.error(`missing field '${fieldName}' in config`);
            process.exit(0);
        }
    };

    public static PatchConfigIconsPath(config: IConfig, configPath: string) {
        return {
            ...config,
            iconsPath: `${path.dirname(configPath)}/${config.iconsPath}`
        }
    };

    public static ValidateConfig(config: IConfig): void {
        this.ValidateField('id', config.id);
        this.ValidateField('name', config.name);
        this.ValidateField('theme', config.theme);
        this.ValidateField('baseUrl', config.baseUrl);
        this.ValidateField('modules', config.modules);
        this.ValidateField('iconsPath', config.iconsPath);
    }

    public static ParseConfig(configPath: string) {
        const configJson = this._fsExtra.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configJson);
        const configPatched = this.PatchConfigIconsPath(config, configPath);
        this.ValidateConfig(configPatched);
        return configPatched;
    };

    public static ReplaceStringInFile(
        filename: FsExtra.PathOrFileDescriptor,
        strOld: string | RegExp,
        strNew: string
    ) {
        console.log(`Replace '${strOld}' with '${strNew}' in ${filename}`);
        const fileOld = this._fsExtra.readFileSync(filename, 'utf8');
        const fileNew = fileOld.replace(new RegExp(strOld, 'g'), strNew);
        this._fsExtra.writeFileSync(filename, fileNew);
    }
}