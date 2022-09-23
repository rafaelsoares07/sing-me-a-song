import { prisma } from "../database.js";


export async function resetDB() {
    return await prisma.$executeRaw`TRUNCATE TABLE recommendations`
}

export const e2eRepository ={
    resetDB
}