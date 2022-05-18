import { IConfig, ITasks } from "@/interfaces";

export class Command {
  private readonly _tasks: ITasks

  constructor(tasks: ITasks) {
    this._tasks = tasks;
  }
  Build(
    config: IConfig,
    dirSrc: string,
    dirDst: string
  ): void {
    this._tasks.CopyDirectory(dirSrc, dirDst);
    this._tasks.CreateModules(dirDst, config.modules);
    this._tasks.SetAppId(dirDst, config.id);
    this._tasks.SetAppName(dirDst, config.name);
    this._tasks.InstalAppDependencies(dirDst);
  }
}
