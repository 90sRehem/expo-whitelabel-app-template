import { ITasks } from '@/interfaces';
import { FsExtra } from '@/libs';
import Globby from 'globby';
import { Utils } from '@/utils';
import childProcess from 'child_process';

export class Task implements ITasks {
  private readonly _fsExtra: typeof FsExtra;
  private readonly _globby: typeof Globby;
  private readonly _replaceStringInFile: typeof Utils.ReplaceStringInFile;

  constructor(fsExtra: typeof FsExtra, globby: typeof Globby) {
    this._fsExtra = fsExtra;
    this._globby = globby;
    this._replaceStringInFile = Utils.ReplaceStringInFile;
  }

  /**
  * @method CopyDirectory - Responsável por fazer a cópia dos arquivos do diretório de origem para o diretório de destino.
  * @property {string} dirSrc - Recebe uma string com o endereço que aponta para o diretório de origem.
  * @property {string} dirDst - Recebe uma string com o endereço que aponta para o diretório de destino.
  */
  CopyDirectory(dirSrc: string, dirDst: string): void {
    console.log(`CopyDirectory ${dirSrc} to ${dirDst}`);
    this._fsExtra.removeSync(dirDst);
    const files = this._globby.sync(`${dirSrc}/**/*`, {
      // gitignore: true,
      // dot: true,
    });

    files.forEach(file => this._fsExtra.copySync(file, file.replace(dirSrc, dirDst)));
  }

  /**
  * @method CreateBaseUrl - Responsável pot criar a váriavel que vai conter a baseUrl do app no diretórtio de destino.
  * @property {string} dirDst - Recebe uma string com o endereço que aponta para o diretório de destino.
  * @property {string} baseUrl - Recebe uma string com a URL do aplicativo alvo.
  */
  CreateBaseUrl(dirDst: string, baseUrl: string): void {
    console.log(`Write ${dirDst}/src/api/server.js`);
    const fileContent = `\
        // AVISO: This file is auto-generated by wl-engine.
        export const baseUrl = '${baseUrl}';
        `;
    this._fsExtra.writeFileSync(`${dirDst}/src/baseUrl.js`, fileContent);
  }

  /**
  * @method CreateModules - Responsável por criar o arquivo de ponto de entrada da pasta modules.
  * @property {string} dirDst - Recebe uma string com o endereço que aponta para o diretório de destino.
  * @property {string} modules - Recebe um array de strings contendo o nome dos módulos.
  */
  CreateModules(dirDst: string, modules: string[]): void {
    throw "Method not implemented."
    // if (!modules.length) {
    //   return
    // }
    // console.log(`Write ${dirDst}/src/modules/index.ts`);
    // const fileContent = `\
    //     // AVISO: This file is auto-generated by wl-engine.
    //     ${modules.map((module: string) => `import ${module} from './${module}';`).join('\n')}

    //     export default [${modules.join(', ')}];
    //     `;
    // this._fsExtra.writeFileSync(`${dirDst}/src/modules/index.ts`, fileContent);
  }

  /**
   * @method CreateTheme - Responsável por criar o ponto de entrada para os temas do aplicativo.
   * @property dirDst - Recebe a string com o caminho para o diretório de destino.
   * @property theme - Recebe a string com o tema.
   */
  CreateTheme(dirDst: string, theme: string): void {
    throw "Method not implemented."
    // console.log(`Write ${dirDst}/src/theme/index.ts`);
    // const fileContent = `\
    //     // AVISO: Esse arquivo foi gerado automaticamente pelo construtor de apps.
    //     export { default } from './themes/${theme}';
    //     `;
    // this._fsExtra.writeFileSync(`${dirDst}/src/theme/index.ts`, fileContent);
  }

  /**
   * @method InstalAppDependencies - Responsável por instalar as dependecias do diretório recebido por parametro.
   * @property {string} dirDst - Recebe a string com o caminho do diretório.
   */
  InstalAppDependencies(dirDst: string): void {
    console.log(`Installing dependencies in ${dirDst} `);
    childProcess.execSync('yarn install', { cwd: dirDst });
  }

  /**
   * @method SetAppId - Responsável por alterar o identificador do aplicativo nas pastas de arquivos nativos.
   * @param dirDst - Recebe a string para o caminho para o diretório de destino.
   * @param newAppId - Recebe a string com o novo identificador.
   */
  SetAppId(dirDst: string, newAppId: string): void {
    const idOld = "com.expowhitelabelapp";
    const packagePathOld = idOld.replace(/\./g, '/');
    const packagePathNew = newAppId.replace(/\./g, '/');
    const packageRootOld = packagePathOld.split('/')[0];

    this._replaceStringInFile(`${dirDst}/android/app/BUCK`, idOld, newAppId);
    this._replaceStringInFile(`${dirDst}/android/app/build.gradle`, idOld, newAppId);
    this._replaceStringInFile(`${dirDst}/android/app/src/main/AndroidManifest.xml`, idOld, newAppId);
    this._replaceStringInFile(`${dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`, idOld, newAppId);
    this._replaceStringInFile(`${dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`, idOld, newAppId);
    this._replaceStringInFile(`${dirDst}/ios/expowhitelabelapp.xcodeproj/project.pbxproj`, idOld, newAppId);

    console.log(`Move ${`${dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`}`);
    console.log(`  to ${`${dirDst}/android/app/src/main/java/${packagePathNew}/MainActivity.java`}`);
    this._fsExtra.moveSync(
      `${dirDst}/android/app/src/main/java/${packagePathOld}/MainActivity.java`,
      `${dirDst}/android/app/src/main/java/${packagePathNew}/MainActivity.java`,
    );

    console.log(`Move ${`${dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`}`);
    console.log(`  to ${`${dirDst}/android/app/src/main/java/${packagePathNew}/MainApplication.java`}`);
    this._fsExtra.moveSync(
      `${dirDst}/android/app/src/main/java/${packagePathOld}/MainApplication.java`,
      `${dirDst}/android/app/src/main/java/${packagePathNew}/MainApplication.java`,
    );

    console.log(`Remove ${dirDst}/android/app/src/main/java/${packageRootOld}`);
    this._fsExtra.removeSync(`${dirDst}/android/app/src/main/java/${packageRootOld}`);
  }

  /**
   * @method SetAppIcon -  Responsável por trocar o ícone da aplicação nos arquivos nativos.
   * @param dirDst - Recebe o caminho de destino do app.
   * @param iconsPath - Recebe o caminho da pasta de ícones do app
   */
  SetAppIcon(dirDst: string, iconsPath: string): void {
    console.log(`Copy ${iconsPath} /ios/`);
    console.log(`  to ${dirDst} /ios/whitelabel / Images.xcassets / AppIcon.appiconset / `);

    this._fsExtra.copySync(`${iconsPath} /ios/`, `${dirDst} /ios/whitelabel / Images.xcassets / AppIcon.appiconset / `, { overwrite: true });

    console.log(`Copy ${iconsPath} /android/`);
    console.log(`  to ${dirDst} /android/app / src / main / res / `);

    this._fsExtra.copySync(`${iconsPath} /android/mipmap - hdpi / `, `${dirDst} /android/app / src / main / res / mipmap - hdpi / `, { overwrite: true });
    this._fsExtra.copySync(`${iconsPath} /android/mipmap - mdpi / `, `${dirDst} /android/app / src / main / res / mipmap - mdpi / `, { overwrite: true });
    this._fsExtra.copySync(`${iconsPath} /android/mipmap - xhdpi / `, `${dirDst} /android/app / src / main / res / mipmap - xhdpi / `, { overwrite: true });
    this._fsExtra.copySync(`${iconsPath} /android/mipmap - xxhdpi / `, `${dirDst} /android/app / src / main / res / mipmap - xxhdpi / `, { overwrite: true });
    this._fsExtra.copySync(`${iconsPath} /android/mipmap - xxxhdpi / `, `${dirDst} /android/app / src / main / res / mipmap - xxxhdpi / `, { overwrite: true });
  }

  /**
   * @method SetAppName - Responsável por substituir o nome do app dentro dos arquivos nativos.
   * @param dirDst - Recebe uma string com o caminho para o diretório de destino.
   * @param newAppName - Recebe uma string com o novo nome do app.
   */
  SetAppName(dirDst: string, newAppName: string): void {
    const oldAndroidAppName = 'expo-white-label-app';
    const oldIosAppName = 'expowhitelabelapp';
    this._replaceStringInFile(`${dirDst}/android/app/src/main/res/values/strings.xml`, oldAndroidAppName, newAppName);
    this._replaceStringInFile(`${dirDst}/ios/${oldIosAppName}/Info.plist`, oldIosAppName, newAppName);
  }
}
