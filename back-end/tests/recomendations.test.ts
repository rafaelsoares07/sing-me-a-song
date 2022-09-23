import { faker } from '@faker-js/faker';

import {prisma} from "../src/database"
import supertest from "supertest"
import app from "../src/app"

import _linkYoutubeGenerator from "./factorys/linkYoutubeGenerator"
import _bodyRecomendationFail from "./factorys/bodyRecomendationFail"

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
})

describe("Testando rota POST /recommendations", ()=>{

    it("Deve retornar 201 para cadastro feito com sucesso", async()=>{

        const recommendation = {
            name:faker.name.fullName(),
            youtubeLink:_linkYoutubeGenerator()
        }

        const result = await supertest(app).post("/recommendations").send(recommendation)

        const createRecommendation = await prisma.recommendation.findUnique({
            where:{name:recommendation.name}
        })

        expect(createRecommendation).not.toBeNull()

        expect(result.status).toEqual(201)
    });

    it("Deve retornar 422 para cadastro com body no formato errado ou informações", async()=>{

       const recommendation1 = _bodyRecomendationFail(1)
       const recommendation2= _bodyRecomendationFail(2)
       const recommendation3 = _bodyRecomendationFail(3)
       const recommendation4 = _bodyRecomendationFail(4)

        const caso1 = await supertest(app).post("/recommendations").send(recommendation1)
        const caso2 = await supertest(app).post("/recommendations").send(recommendation2)
        const caso3 = await supertest(app).post("/recommendations").send(recommendation3)
        const caso4 = await supertest(app).post("/recommendations").send(recommendation4)
        
        expect(caso1.status).toEqual(422)
        expect(caso2.status).toEqual(422)
        expect(caso3.status).toEqual(422)
        expect(caso4.status).toEqual(422)
    
    });

    
});


describe("Testando rota POST /recommendations/:id/upvote", ()=>{

    it("Deve retornar 200 para voto feito com sucesso", async()=>{

        const recommendation = {
            name:faker.name.fullName(),
            youtubeLink:_linkYoutubeGenerator()
        }

        const resultCreate = await supertest(app).post("/recommendations").send(recommendation)
        const idCreate = resultCreate.body.id
        const statusCreate = resultCreate.status

        const resultUpVote = await supertest(app).post(`/recommendations/${idCreate}/upvote`).send() 
        const statusUpVote = resultUpVote.status


        expect(statusCreate).toEqual(201)
        expect(statusUpVote).toEqual(200)
        expect(resultCreate.body).toBeInstanceOf(Object)
    });

    it("Deve retornar 404 quando o id informado não existir no banco de dados", async()=>{
        
        const resultUpVote = await supertest(app).post(`/recommendations/1/upvote`).send() 
        const statusUpVote = resultUpVote.status

        expect(statusUpVote).toEqual(404)

    })

});


describe("Testando rota POST /recommendations/:id/downvote", ()=>{

    it("Deve retorna 200 para down voto feito com sucesso", async()=>{
        const recommendation = {
            name:faker.name.fullName(),
            youtubeLink:_linkYoutubeGenerator()
        }

        const resultCreate = await supertest(app).post("/recommendations").send(recommendation)
        const idCreate = resultCreate.body.id
        const statusCreate = resultCreate.status

        const resultUpVote = await supertest(app).post(`/recommendations/${idCreate}/downvote`).send() 
        const statusUpVote = resultUpVote.status


        expect(statusCreate).toEqual(201)
        expect(statusUpVote).toEqual(200)
        expect(resultCreate.body).toBeInstanceOf(Object)
    })

    it("Deve excluir item com score menor que -5 ", async () =>{
        const recommendation = {
            name:faker.name.fullName(),
            youtubeLink:_linkYoutubeGenerator()
        }

        const resultCreate = await supertest(app).post("/recommendations").send(recommendation)
        const idCreate = resultCreate.body.id
        const statusCreate = resultCreate.status

        let arrCodes = []
        for(let i=0; i<6;i++){
            const resultUpVote = await supertest(app).post(`/recommendations/${idCreate}/downvote`).send() 
            arrCodes.push(resultUpVote.status)
        }

        const downVotesSucess = arrCodes.every(el=>el===200)

        const recommendationExist = await supertest(app).get(`/recommendations/${idCreate}`)

        expect(recommendationExist.status).toEqual(404)       
        expect(downVotesSucess).toEqual(true)
    })

    it("Deve retornar 404 quando id informado não existir", async()=>{
        const resultDownVote = await supertest(app).post(`/recommendations/1/downvote`).send() 
        const statusDownVote = resultDownVote.status

        expect(statusDownVote).toEqual(404)
    })

});


describe("Testando rota GET /recommendations/:id", ()=>{

})


afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
    await prisma.$disconnect()
})