import fs from "fs-extra";
import glob from "globby";

/**
 * Função para fazer a cópia dos arquivos da pasta original
 * para a pasta do whitelabel de destino.
 * @param {string} dirSrc - Recebe uma string com o endereço que aponta para o diretório de origem.
 * @param {string} dirDst - Recebe uma string com o endereço que aponta para o diretório de destino.
 */
export function Copydirectory(dirSrc: string, dirDst: string): void {
    console.log(`Copy ${dirSrc} to ${dirDst}`);
    fs.removeSync(dirDst);
    const files = glob.globbySync(`${dirSrc}/**/*`, {
        gitignore: true,
        dot: true,
    });
    files.forEach(file => fs.copySync(file, file.replace(dirSrc, dirDst)));
}