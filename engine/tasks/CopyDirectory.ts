import fs from "fs-extra";
import glob from "globby";
import { ITask } from "./interfaces/ITask";

/**
 * Classe responsável por fazer a cópia dos arquivos do diretório de origem para o diretório de destino.
 * @property {string} dirSrc - Recebe uma string com o endereço que aponta para o diretório de origem.
 * @property {string} dirDst - Recebe uma string com o endereço que aponta para o diretório de destino.
 * @method Execute - Copia os arquivos do diretório de origem para o diretório de destino.
 */
export class CopyDirectory implements ITask {
    private readonly _dirSrc: string;
    private readonly _dirDst: string;

    constructor(dirSrc: string, dirDst: string) {
        this._dirSrc = dirSrc;
        this._dirDst = dirDst;
    }

    Execute() {
        console.log(`Copy ${this._dirSrc} to ${this._dirDst}`);
        fs.removeSync(this._dirDst);
        const files = glob.globbySync(`${this._dirSrc}/**/*`, {
            gitignore: true,
            dot: true,
        });
        files.forEach(file => fs.copySync(file, file.replace(this._dirSrc, this._dirDst)));
    }
}