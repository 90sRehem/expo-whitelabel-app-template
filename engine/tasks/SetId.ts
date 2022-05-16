import fs from 'fs-extra';
import { ReplaceStringInFile } from '../utils/ReplaceStringInFile';
/**
 * Funcão que altera o identificador do aplicativo nas pastas de arquivos nativos.
 * @param dirDst - Recebe a string para o caminho para o diretório de destino.
 * @param newAppId - Recebe a string com o novo identificador.
 */
export function SetId(dirDst: string, newAppId: string) {
    const idOld = 'com.whitelabel';
    const packagePathOld = idOld.replace(/\./g, '/');
    const packagePathNew = newAppId.replace(/\./g, '/');
    const packageRootOld = packagePathOld.split('/')[0];

    ReplaceStringInFile(`${dirDst}/android/app/BUCK`, idOld, newAppId);
    ReplaceStringInFile(`${dirDst}/android/app/build.gradle`, idOld, newAppId);
    ReplaceStringInFile(`${dirDst}/android/app/src/main/AndroidManifest.xml`, idOld, newAppId);
    ReplaceStringInFile(`${dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`, idOld, newAppId);
    ReplaceStringInFile(`${dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`, idOld, newAppId);
    ReplaceStringInFile(`${dirDst}/ios/whitelabel.xcodeproj/project.pbxproj`, idOld, newAppId);

    console.log(`Move ${`${dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`}`);
    console.log(`  to ${`${dirDst}/android/app/src/main/java/${packagePathNew}/MainActivity.java`}`);
    fs.moveSync(
        `${dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`,
        `${dirDst}/android/app/src/main/java/${packagePathNew}/MainActivity.java`,
    );

    console.log(`Move ${`${dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`}`);
    console.log(`  to ${`${dirDst}/android/app/src/main/java/${packagePathNew}/MainApplication.java`}`);
    fs.moveSync(
        `${dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`,
        `${dirDst}/android/app/src/main/java/${packagePathNew}/MainApplication.java`,
    );

    console.log(`Remove ${dirDst}/android/app/src/main/java/${packageRootOld}`);
    fs.removeSync(`${dirDst}/android/app/src/main/java/${packageRootOld}`);
};