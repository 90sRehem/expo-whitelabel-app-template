import fs from 'fs-extra';
/**
 * Função que cria a váriavel que vai conter a baseUrl do aplicativo alvo
 * @param {string} dirDst - Recebe uma string com o endereço que aponta para o diretório de destino.
 * @param {string} baseUrl - Recebe uma string com a URL do aplicativo alvo.
 */
export function CreateBaseUrl(dirDst: string, baseUrl: string) {
    console.log(`Write ${dirDst}/src/api/server.js`);
    const fileContent = `\
// AVISO: This file is auto-generated by wl-engine.
export const baseUrl = '${baseUrl}';
`;
    fs.writeFileSync(`${dirDst}/src/baseUrl.js`, fileContent);
};

