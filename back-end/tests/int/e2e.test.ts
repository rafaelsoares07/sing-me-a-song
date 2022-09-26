import {prisma} from "../../src/database"
import supertest from "supertest"
import app from "../../src/app"


beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
})

describe("Testando rota POST /resetDB", ()=>{

    it("Deve retornar 200 para reset do banco feito com sucesso", async()=>{
        
        const result = await supertest(app).post("/e2eRouter/resetDB").send({})

        expect(result.status).toEqual(200)

    })

    it("Deve retornar 200 para topList cadastrada com sucesso", async()=>{
        
        const result = await supertest(app).post("/e2eRouter/topList").send({})

        expect(result.status).toEqual(200)

    })    
});

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
    await prisma.$disconnect()
})