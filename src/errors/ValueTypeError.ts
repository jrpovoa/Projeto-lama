import { BaseError } from "./BaseError";

export class ValueTypeError extends BaseError{
    constructor(message: string){
        super(message, 401)
    }
}