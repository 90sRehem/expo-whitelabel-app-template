import { ReplaceStringInFile } from '../utils/ReplaceStringInFile';
import { ITask } from './interfaces';
/**
 * Classe responsável por substituir o nome do app dentro dos arquivos nativos.
 * @param dirDst - Recebe uma string com o caminho para o diretório de destino.
 * @param newAppName - Recebe uma string com o novo nome do app.
 */
export class SetAppName implements ITask {
    private readonly _dirDst: string;
    private readonly _newAppName: string;
    constructor(dirDst: string, newAppName: string) {
        this._dirDst = dirDst;
        this._newAppName = newAppName;
    }
    /**
     * @method Execute - Realiza a troca do no do app nos arquivos nativos.
     */
    Execute(): void {
        const oldAppName = 'expo-white-label-app';
        ReplaceStringInFile(`${this._dirDst}/android/app/src/main/res/values/strings.xml`, oldAppName, this._newAppName);
        ReplaceStringInFile(`${this._dirDst}/ios/${oldAppName}/Info.plist`, oldAppName, this._newAppName);
    }




};