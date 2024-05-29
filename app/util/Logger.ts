export default class Logger {
  private readonly namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  public success(...optionalParams: any[]): void {
    console.log(
      consoleColors.fg.green,
      `${this.namespace}: `,
      ...optionalParams
    );
  }

  public debug(...optionalParams: any[]): void {
    console.debug(
      consoleColors.fg.white,
      `${this.namespace}: `,
      ...optionalParams
    );
  }

  public info(...optionalParams: any[]): void {
    console.info(
      consoleColors.fg.blue,
      `${this.namespace}: `,
      ...optionalParams
    );
  }

  public warn(...optionalParams: any[]): void {
    console.warn(
      consoleColors.fg.yellow,
      `${this.namespace}: `,
      ...optionalParams
    );
  }

  public error(...optionalParams: any[]): void {
    console.error(
      consoleColors.fg.red,
      `${this.namespace}: `,
      ...optionalParams
    );
  }
}

export const consoleColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[39m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    reset: "\x1b[49m",
  },
};
