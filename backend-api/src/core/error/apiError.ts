class ErrorExtend extends Error {
    error?: any;
    status: number;
    isPublic: boolean;
    constructor({
        message, error, status, isPublic, stack,
    }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.error = error;
        this.status = status;
        this.isPublic = isPublic;
        this.stack = stack;
    }
}

export class APIError extends ErrorExtend {
    constructor({
        message,
        error = undefined,
        status,
        isPublic = false,
        stack = undefined,
    }) {
        super({
            message, error, status, isPublic, stack,
        });
    }
}
