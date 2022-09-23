import { Router } from "express";
import {e2eController} from "../controllers/e2eController.js"

const e2eRouter = Router()

e2eRouter.post("/resetDB", e2eController.resetDB)


export default e2eRouter