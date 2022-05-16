import childProcess from 'child_process';
/**
 * Função responsável por instalar as dependecias do poacote recebido por parametro.
 * @param dirDst - Recebe a string com o caminho do diretório de destino.
 */
export function InstallDependencies(dirDst: string) {
    console.log(`Installing dependencies in ${dirDst}`);
    childProcess.execSync('yarn install', { cwd: dirDst });
};