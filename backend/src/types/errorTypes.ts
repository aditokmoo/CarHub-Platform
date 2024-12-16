export interface ErrorTypes {
    statusCode: number,
    status: string,
    message: string,
    stack: string,
    name: string,
    path: string,
    value: string,
    isOperational: boolean,
    errors: ErrorTypes
}