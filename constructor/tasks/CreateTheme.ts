import fs from 'fs-extra';
/**
 * Funcão que cria o ponto de entrada para os temas do aplicativo.
 * @param dirDst - Recebe a string com o caminho para o diretório de destino.
 * @param theme - Recebe a string com o tema.
 */
export function CreateTheme(dirDst: string, theme: string) {
  console.log(`Write ${dirDst}/src/theme/index.ts`);
  const fileContent = `\
// AVISO: Esse arquivo foi gerado automaticamente pelo construtor de apps.
export { default } from './themes/${theme}';
`;
  fs.writeFileSync(`${dirDst}/src/theme/index.ts`, fileContent);
};