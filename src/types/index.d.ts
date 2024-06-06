import { ZodIssue } from "zod"

//this is a "discriminated union" if successful, it will return data of a certain type (T)
//if there's an error, return a different kind of property: an error, that will take the form string or  an array of ZodIssue. gives some structure for error handling in our actions. 
type ActionResult<T> = 
    {status: 'success', data: T} | {status: 'error', error: string | ZodIssue[]}
