import Commander from 'commander';
import globby from 'globby';
import { Command, Task } from "./entities"
import { FsExtra } from './libs';
// import globby from 'globby';
import { Utils } from './utils';

const commander = new Commander.Command();
const tasks = new Task(FsExtra, globby);
const commands = new Command(tasks);

commander
  .command('build')
  .description('builda o app na pasta de destino.')
  .argument('<config>', 'arquivo de configuração do app a ser buildado.')
  .argument('<source>', 'diretório de origem.')
  .argument('<destination>', 'diretório de destino.')
  .option('-c, --config-path <config>', 'arquivo de configuração.')
  .option('-s, --source <source>', 'diretório de origem.')
  .option('-d, --destination <destination>', 'Ddiretório de destino')
  .action(({ configPath, source, destination }) => {
    console.log("output:", { configPath, source, destination });

    if (!configPath) {
      console.error('opção obrigatória ausente \'-c\'');
      return;
    }
    if (!source) {
      console.error('opção obrigatória ausente \'-s\'');
      return;
    }
    if (!destination) {
      console.error('opção obrigatória ausente \'-d\'');
      return;
    }
    const config = Utils.ParseConfig(configPath);
    commands.Build(config, source, destination)
  });

commander.parse(process.argv);
