import { fsExtra } from '../libs';
import { ITask } from './interfaces/ITask';

/**
 * Classe responsável por trocar o ícone da aplicação nos arquivos nativos.
 * @param dirDst - Recebe o caminho de destino do app.
 * @param iconsPath - Recebe o caminho da pasta de ícones do app
 */
export class SetAppIcon implements ITask {
    private readonly _dirDst: string;
    private readonly _iconsPath: string;
    constructor(dirDst: string, iconsPath: string) {
        this._dirDst = dirDst
        this._iconsPath = iconsPath
    }
    /**
     * @method Execute - Realiza a mudança do icone nos arquivos nativos.
     */
    Execute(): void {
        console.log(`Copy ${this._iconsPath} /ios/`);
        console.log(`  to ${this._dirDst} /ios/whitelabel / Images.xcassets / AppIcon.appiconset / `);
        fsExtra.copySync(`${this._iconsPath} /ios/`, `${this._dirDst} /ios/whitelabel / Images.xcassets / AppIcon.appiconset / `, { overwrite: true });

        console.log(`Copy ${this._iconsPath} /android/`);
        console.log(`  to ${this._dirDst} /android/app / src / main / res / `);
        fsExtra.copySync(`${this._iconsPath} /android/mipmap - hdpi / `, `${this._dirDst} /android/app / src / main / res / mipmap - hdpi / `, { overwrite: true });
        fsExtra.copySync(`${this._iconsPath} /android/mipmap - mdpi / `, `${this._dirDst} /android/app / src / main / res / mipmap - mdpi / `, { overwrite: true });
        fsExtra.copySync(`${this._iconsPath} /android/mipmap - xhdpi / `, `${this._dirDst} /android/app / src / main / res / mipmap - xhdpi / `, { overwrite: true });
        fsExtra.copySync(`${this._iconsPath} /android/mipmap - xxhdpi / `, `${this._dirDst} /android/app / src / main / res / mipmap - xxhdpi / `, { overwrite: true });
        fsExtra.copySync(`${this._iconsPath} /android/mipmap - xxxhdpi / `, `${this._dirDst} /android/app / src / main / res / mipmap - xxxhdpi / `, { overwrite: true });
    }

};