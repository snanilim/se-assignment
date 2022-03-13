import { xterm, green, red, yellow, magenta } from 'cli-color';
import { isObject } from '../utils/shared.utils';
import { from } from 'rxjs';

declare const process;

export interface LoggerService {
  log(message: any, context?: string);
  error(message: any, trace?: string, context?: string);
  warn(message: any, context?: string);
  debug(message: any, context?: string);
}

export class Logger implements LoggerService {
  private static logger?: typeof Logger | LoggerService = Logger;
  private static readonly yellow = xterm(3);

  constructor(private readonly context: string) { }

  log(message: any, context?: string) {
    const { logger } = Logger;
    if (logger === this) {
      Logger.log(message, context || this.context);
      return;
    }
    logger && logger.log.call(logger, message, context || this.context);
  }

  error(message: any, trace?: string, context?: string) {
    const { logger } = Logger;
    if (logger === this) {
      Logger.error(message, trace, context || this.context);
      return;
    }
    logger &&
      logger.error.call(logger, message, trace, context || this.context);
  }

  warn(message: any, context?: string) {
    const { logger } = Logger;
    if (logger === this) {
      Logger.warn(message, context || this.context);
      return;
    }
    logger && logger.warn.call(logger, message, context || this.context);
  }

  debug(message: any, context?: string) {
    const { logger } = Logger;
    if (logger === this) {
      Logger.debug(message, context || this.context);
      return;
    }
    logger && logger.debug.call(logger, message, context || this.context);
  }

  static overrideLogger(logger: LoggerService | boolean) {
    this.logger = logger ? (logger as LoggerService) : undefined;
  }

  static log(message: any, context: string = ''): void {
    this.printMessage(message, green, context);
  }

  static error(message: any, trace: string = '', context: string = ''): void {
    this.printMessage(message, red, context);
    this.printStackTrace(trace);
  }

  static warn(message: any, context: string = '') {
    this.printMessage(message, yellow, context);
  }

  static debug(message: any, context: string = '') {
    this.printMessage(message, magenta, context);
  }

  private static printMessage(
    message: any,
    color: (message: string) => string,
    context: string = '',
  ): void {
    const output = isObject(message)
      ? JSON.stringify(message, null, 2)
      : message;
    process.stdout.write(color(`[App] ${process.pid}   - `));
    process.stdout.write(`${new Date(Date.now()).toLocaleString()}   `);

    context && process.stdout.write(this.yellow(`[${context}] `));
    process.stdout.write(color(output));

    process.stdout.write(`\n`);
  }

  private static printStackTrace(trace: string): void {
    process.stdout.write(trace);
    process.stdout.write(`\n`);
  }
}

import { Logger, LoggerService } from '../logger/logger';

export class OverRideLog implements LoggerService{
    log(message: any, context?: string) {
        console.log(message, context);
    }
    warn(message: any, context?: string) {
    }
    debug(message: any, context?: string) {
    }
    error(message: any, trace?: string, context?: string) {

    }
}

// implements or call
Logger.overrideLogger(new OverRideLog());
