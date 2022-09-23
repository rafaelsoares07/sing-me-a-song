import { faker } from "@faker-js/faker"
import _linkYoutubeGenerator from "./linkYoutubeGenerator"
import {prisma} from "../../src/database"

export async function _createNewRecommendation(){
    const recommendation ={
        name:faker.name.fullName(),
        youtubeLink:_linkYoutubeGenerator()
    }

    const result = await prisma.recommendation.create({data:recommendation})

    return result
}


export async function _createNewsRecommendationsWithDifferentScores() {
    
    let el = {}
    let arr = [] 
    let cont = 0
    for(let i=3; i>=0; i--){

        let recommendation ={
            name:faker.name.fullName(),
            youtubeLink:_linkYoutubeGenerator()
        }

        let rec = await prisma.recommendation.create({data:recommendation})
      

        for(let j=i;j>=0;j--){
            
            await prisma.recommendation.update({
                where:{name:rec.name},
                data:{
                    score:{
                        increment:1
                    }
                }
            })

        }
        arr[i] = await prisma.recommendation.findUnique({where:{name:rec.name}})
    }


 return arr

}