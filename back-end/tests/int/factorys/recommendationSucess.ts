import { faker } from '@faker-js/faker';
import _linkYoutubeGenerator from "./linkYoutubeGenerator"



export function recomendationSucess(){
    const recommendation = {
        name:faker.name.fullName(),
        youtubeLink:_linkYoutubeGenerator()
    }

    return recommendation
}