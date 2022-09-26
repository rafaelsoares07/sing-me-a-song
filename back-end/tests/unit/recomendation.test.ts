import { jest } from "@jest/globals"
import {prisma} from "../../src/database"

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { conflictError } from "../../src/utils/errorUtils";
import {recomendationSucess} from "../int/factorys/recommendationSucess"

import * as recommendationFactory from "./factories/recommendation";
import * as errors from "../../src/utils/errorUtils";



describe("Testes unitários das Recomendações",()=>{

    beforeEach(async()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    it("Testando criação feita com sucesso", async()=>{

        const newRecommendation = recomendationSucess()
        jest.spyOn(recommendationRepository,"create").mockImplementation(():any=>{})
        jest.spyOn(recommendationRepository,"findByName").mockImplementation(():any=>{})

        await recommendationService.insert(newRecommendation)

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();

    })

    it("Testando retorno de erro ao inserir nome duplicado",async()=>{
       
        const duplicateRecommendation = recomendationSucess()
        jest.spyOn(recommendationRepository,"findByName").mockResolvedValueOnce({id:34, score:0 ,...duplicateRecommendation})

        
        expect(async()=>{
            await recommendationService.insert(duplicateRecommendation)
        }).rejects.toEqual(conflictError("Recommendations names must be unique"));
    })

    it("Deveria fazer o upvote com sucesso, quando id existisse ", async()=>{

        const recommendation = {id:98, score:0, name:"Teste", youtubeLink:"https://www.youtube.com/watch?v=wiN28sYXfp8"}

        jest.spyOn(recommendationService, "getById").mockImplementationOnce((): any => {});

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => recommendation);

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {});  

        await recommendationService.upvote(recommendation.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
        
        
    })

    it("Deveria fazer o downvote com sucesso, quando id existe e score é maior que -5" ,async()=>{
        
        const recommendation = recommendationFactory.createRec()
        
        jest
        .spyOn(recommendationService, "getById")
        .mockImplementationOnce((): any => null);
  
      jest
        .spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => recommendation);
  
      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => recommendation);
  
      jest
        .spyOn(recommendationRepository, "remove")
        .mockImplementationOnce((): any => {});
  
      await recommendationService.downvote(recommendation.id);
  
      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
      expect(recommendationRepository.remove).not.toBeCalled();


    })

    it("Deveria fazer o downvote com sucesso, é apagar o item do banco de dados" ,async()=>{
        
        const recommendation = recommendationFactory.createRec()
        recommendation.score = -10
        
        jest.spyOn(recommendationService, "getById").mockImplementationOnce((): any => null);
  
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => recommendation);
  
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => recommendation);
  
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => null);
  
        await recommendationService.downvote(recommendation.id);
  
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();


    })

    it("Deveria retornar not_found quando o id passado para o downvote não existir no banco ", async() => {
        const  recommendation  = recommendationFactory.createRec()
    
        jest
          .spyOn(recommendationService, "getById")
          .mockImplementationOnce((): any => {});
    
        jest
          .spyOn(recommendationRepository, "find")
          .mockImplementationOnce((): any => {});
    
        jest
          .spyOn(recommendationRepository, "remove")
          .mockImplementationOnce((): any => {});
    
        const response = recommendationService.downvote(recommendation.id);
    
        expect(response).rejects.toEqual({ type: "not_found", message:""});
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });

    it("Deveria retornar todas as recomendações", async()=>{

        let arr = []
        const recomendation1 = recommendationFactory.createRec()
        const recomendation2 = recommendationFactory.createRec()
        arr.push(recomendation1)
        arr.push(recomendation2)

        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => arr);

        const result = await recommendationService.get()

        expect(recommendationRepository.findAll).toBeCalled();
    
    })

    it("Deveria retornar todas as recomendações ordenadas por score", async()=>{

        let arr = []
        const recomendation1 = recommendationFactory.createRec()
        const recomendation2 = recommendationFactory.createRec()
        arr.push(recomendation1)
        arr.push(recomendation2)

        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => arr);

        const result = await recommendationService.getTop(10)
        console.log(result)
        expect(recommendationRepository.getAmountByScore).toBeCalled();
        expect(result).toBeInstanceOf(Array)
    
    })

    it("Deveria retornar uma recomendação aleatória quando o índice randômico for menor 0.7", async()=>{

        let arr = []
        const recomendation1 = recommendationFactory.createRec()
        const recomendation2 = recommendationFactory.createRec()
        arr.push(recomendation1)
        arr.push(recomendation2)
    
        jest.spyOn(global.Math, "random").mockImplementationOnce(():any => 0.7)
        jest.spyOn(recommendationRepository,"findAll").mockImplementationOnce(():any => [recomendation1])
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => [recomendation1]);
        const result = await recommendationService.getRandom()
    
        expect(recommendationRepository.findAll).toBeCalled();
        expect(result).toBeInstanceOf(Object)
    
    })

    it("Deveria retornar uma recomendação aleatória quando o índice randômico for menor 0.7", async()=>{

        let arr = []
        const recomendation1 = recommendationFactory.createRec()
        const recomendation2 = recommendationFactory.createRec()
        arr.push(recomendation1)
        arr.push(recomendation2)
    
        jest.spyOn(global.Math, "random").mockImplementationOnce(():any => 0.5)
        jest.spyOn(recommendationRepository,"findAll").mockImplementationOnce(():any => [recomendation1])
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => [recomendation1]);
        
        const result = await recommendationService.getRandom()
    
        expect(recommendationRepository.findAll).toBeCalled();
        
    
    })    
   
})




afterAll(async () => {
    await prisma.$disconnect();
})