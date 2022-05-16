import { ReplaceStringInFile } from '../utils/ReplaceStringInFile';
/**
 * Função para substituir o nome do app dentro dos arquivos nativos.
 * @param dirDst - Recebe uma string com o caminho para o diretório de destino.
 * @param newAppName - Recebe uma string com o novo nome do app.
 */
export function SetName(dirDst: string, newAppName: string) {
    const oldAppName = 'expo-white-label-app';
    ReplaceStringInFile(`${dirDst}/android/app/src/main/res/values/strings.xml`, oldAppName, newAppName);
    ReplaceStringInFile(`${dirDst}/ios/${oldAppName}/Info.plist`, oldAppName, newAppName);
};