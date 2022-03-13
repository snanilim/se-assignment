import * as color from 'colors';

export interface LoggerInterface {
    log(message: any, context?: string);
    error(message: any, context?: string);
}

let prevTime = Number(new Date());
let isLogCall = false;
export class Logger implements LoggerInterface{
    private static logger?: typeof Logger | LoggerInterface = Logger;
     prevTime: number;
     isLogCall = false;

    constructor(
        private readonly context: string,
    ) {

     }

    log(message: any, context?: string){
        const { logger } = Logger;
        logger && logger.log.call(logger, message, context || this.context);
    }

    error(message: any, context?: string) {
        const { logger } = Logger;
        logger && logger.error.call(logger, message, context || this.context);
    }

    static log(message: any, context?: string): void{
        this.printmessage('log', message, context);
    }

    static error(message: any, context?: string): void{
        this.printmessage('error', message, context);
    }

    private static timeCalculation(){
        if (!isLogCall){
            isLogCall = true;
            prevTime = Number(new Date());
        }
        const timeNow = Number(new Date());
        return timeNow - prevTime;
    }

    private static printmessage(title: string, message: any, context?: string): void{
        let msgColor = color.white;
        let titleColor = color.green;

        if (context === undefined) context = '---';
        if (title === 'error') msgColor = color.red, titleColor = color.red;

        const timeMS = `+${this.timeCalculation()}ms`;

        process.stdout.write(`${titleColor(title)}: `);
        process.stdout.write(`${color.magenta(context)} `);
        process.stdout.write(`${color.gray(new Date(Date.now()).toLocaleTimeString())} `);
        process.stdout.write(`${msgColor(message)}  `);
        process.stdout.write(`${color.magenta(timeMS)}  `);
        process.stdout.write('\n');
    }
}
