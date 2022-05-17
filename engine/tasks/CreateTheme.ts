import { fsExtra } from '../libs';
import { ITask } from './interfaces/ITask';
/**
 * Classe responsável por criar o ponto de entrada para os temas do aplicativo.
 * @property dirDst - Recebe a string com o caminho para o diretório de destino.
 * @property theme - Recebe a string com o tema.
 */
export class CreateTheme implements ITask {
  private readonly _dirDst: string;
  private readonly _theme: string;
  constructor(dirDst: string, theme: string) {
    this._dirDst = dirDst;
    this._theme = theme;
  }
  /**
   * @method Execute - Cria o index dos temas no diretório de destino.
   */
  Execute(): void {
    console.log(`Write ${this._dirDst}/src/theme/index.ts`);
    const fileContent = `\
// AVISO: Esse arquivo foi gerado automaticamente pelo construtor de apps.
export { default } from './themes/${this._theme}';
`;
    fsExtra.writeFileSync(`${this._dirDst}/src/theme/index.ts`, fileContent);
  }

};