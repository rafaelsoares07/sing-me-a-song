import { Request, Response } from "express";

import { e2eService } from "../services/e2eService.js";

export async function resetDB(req:Request, res:Response) {
    
    const resul = await e2eService.resetDB()
 
    res.sendStatus(200)
}


export const e2eController = {
    resetDB
};