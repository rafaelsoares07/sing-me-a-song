import { faker } from '@faker-js/faker';

describe('Testando cadastro de uma recomendação', () => {

  beforeEach(()=>{
    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
  })

  it('passes', () => {

    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
    
    const recommendation = {
      name:faker.name.fullName(),
      urlYoutube:'https://www.youtube.com/watch?v=zh3P-VpyLPc'
    }

    cy.visit('http://localhost:3000')
    cy.get('[data-cy="input-name"]').type(recommendation.name)
    cy.get('[data-cy="input-url"]').type(recommendation.urlYoutube)

    cy.intercept("POST","http://localhost:5000/recommendations").as("createRecomendation")    
    cy.get('[data-cy="input-submit"]').click()
    cy.wait("@createRecomendation")
    cy.contains(recommendation.name)

  })

})



