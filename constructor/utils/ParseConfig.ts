import fs from 'fs-extra';
import path from 'path';
import { IConfig } from '../types/IConfig';

function validateConfig(config: IConfig) {
    const validateField = (fieldName: string, field: string | string[]) => {
        if (!field) {
            console.error(`missing field '${fieldName}' in config`);
            process.exit(0);
        }
    };
    validateField('id', config.id);
    validateField('name', config.name);
    validateField('theme', config.theme);
    validateField('baseUrl', config.baseUrl);
    validateField('modules', config.modules);
    validateField('iconsPath', config.iconsPath);
};

const patchConfigIconsPath = (config: IConfig, configPath: string) => ({
    ...config,
    iconsPath: `${path.dirname(configPath)}/${config.iconsPath}`,
});

export function parseConfig(configPath: string) {
    const configJson = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configJson);
    const configPatched = patchConfigIconsPath(config, configPath);
    validateConfig(configPatched);
    return configPatched;
};