import childProcess from 'child_process';
import { ITask } from './interfaces';
/**
 * Classe responsável por instalar as dependecias do diretório recebido por parametro.
 * @property {string} dirDst - Recebe a string com o caminho do diretório.
 */
export class InstallAppDependencies implements ITask {
    private readonly _dirDst: string;
    constructor(dirDst: string) {
        this._dirDst = dirDst;
    }
    /**
     * @method Execute - Instala as depêndencias.
     */
    Execute(): void {
        console.log(`Installing dependencies in ${this._dirDst} `);
        childProcess.execSync('yarn install', { cwd: this._dirDst });
    }
};