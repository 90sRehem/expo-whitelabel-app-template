import Commander from 'commander';
import { Command, Task } from "entities"
import { parseConfig } from './utils';
import { FsExtra, Globby } from 'libs';

const commander = new Commander.Command();
const tasks = new Task(FsExtra, Globby);
const commands = new Command(tasks);

commander
    .command('build')
    .description('Builda a app na pasta de destino.')
    .argument('<config>', 'arquivo de configuração do app a ser buildado.')
    .argument('<source>', 'diretório de origem.')
    .argument('<destination>', 'diretório de destino.')
    .option('-c, --config-path <config>', 'Configuration file')
    .option('-s, --source <source>', 'Source directory')
    .option('-d, --destination <destination>', 'Destination directory')
    .action((options) => {
        const { configPath, source, destination } = options;
        if (!configPath) {
            console.error('missing mandatory option \'-c\'');
            return;
        }
        if (!source) {
            console.error('missing mandatory option \'-s\'');
            return;
        }
        if (!destination) {
            console.error('missing mandatory option \'-d\'');
            return;
        }
        const config = parseConfig(configPath);
        commands.Build(config, source, destination)
    });

commander.parse(process.argv);