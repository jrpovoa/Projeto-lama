import { BaseError } from "./BaseError";

export class MissingFields extends BaseError{
    constructor(){
        super("All the input values should be passed!", 404)
    }
}