import fs from 'fs-extra';

export function ReplaceStringInFile(
    filename: fs.PathOrFileDescriptor,
    strOld: string | RegExp,
    strNew: string) {
    console.log(`Replace '${strOld}' with '${strNew}' in ${filename}`);
    const fileOld = fs.readFileSync(filename, 'utf8');
    const fileNew = fileOld.replace(new RegExp(strOld, 'g'), strNew);
    fs.writeFileSync(filename, fileNew);
};

