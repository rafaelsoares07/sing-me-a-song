import {e2eRepository} from "../repositories/e2eRepository.js"


async function resetDB() {
    const resul = await e2eRepository.resetDB()
    return resul

}
  
export const e2eService={
    resetDB
} 