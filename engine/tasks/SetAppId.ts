import { fsExtra } from '../libs';

import { ReplaceStringInFile } from '../utils/ReplaceStringInFile';
import { ITask } from './interfaces';
/**
 * Classe responsável por alterar o identificador do aplicativo nas pastas de arquivos nativos.
 * @param dirDst - Recebe a string para o caminho para o diretório de destino.
 * @param newAppId - Recebe a string com o novo identificador.
 */
export class SetAppId implements ITask {
    private readonly _dirDst: string;
    private readonly _newAppId: string;
    constructor(dirDst: string, newAppId: string) {
        this._dirDst = dirDst;
        this._newAppId = newAppId;
    }
    /**
     * @method Execute - Altera o id do app nos arquivos nativos.
     */
    Execute(): void {
        const idOld = 'com.whitelabel';
        const packagePathOld = idOld.replace(/\./g, '/');
        const packagePathNew = this._newAppId.replace(/\./g, '/');
        const packageRootOld = packagePathOld.split('/')[0];

        ReplaceStringInFile(`${this._dirDst}/android/app/BUCK`, idOld, this._newAppId);
        ReplaceStringInFile(`${this._dirDst}/android/app/build.gradle`, idOld, this._newAppId);
        ReplaceStringInFile(`${this._dirDst}/android/app/src/main/AndroidManifest.xml`, idOld, this._newAppId);
        ReplaceStringInFile(`${this._dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`, idOld, this._newAppId);
        ReplaceStringInFile(`${this._dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`, idOld, this._newAppId);
        ReplaceStringInFile(`${this._dirDst}/ios/whitelabel.xcodeproj/project.pbxproj`, idOld, this._newAppId);

        console.log(`Move ${`${this._dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`}`);
        console.log(`  to ${`${this._dirDst}/android/app/src/main/java/${packagePathNew}/MainActivity.java`}`);
        fsExtra.moveSync(
            `${this._dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`,
            `${this._dirDst}/android/app/src/main/java/${packagePathNew}/MainActivity.java`,
        );

        console.log(`Move ${`${this._dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`}`);
        console.log(`  to ${`${this._dirDst}/android/app/src/main/java/${packagePathNew}/MainApplication.java`}`);
        fsExtra.moveSync(
            `${this._dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`,
            `${this._dirDst}/android/app/src/main/java/${packagePathNew}/MainApplication.java`,
        );

        console.log(`Remove ${this._dirDst}/android/app/src/main/java/${packageRootOld}`);
        fsExtra.removeSync(`${this._dirDst}/android/app/src/main/java/${packageRootOld}`);
    }
};