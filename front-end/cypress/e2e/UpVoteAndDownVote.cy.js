import { faker } from '@faker-js/faker';

describe('Testa os botões de UpVote e DownVote e garante que a exclusão funciona ', () => {

  beforeEach(()=>{
    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
  })

  it('Testa botoẽs de votar e exclui o item com score < -5', () => {

    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
    
    const recommendation = {
      name:faker.name.fullName(),
      urlYoutube:'https://www.youtube.com/watch?v=wiN28sYXfp8'
    }

    cy.visit('http://localhost:3000')
    cy.get('[data-cy="input-name"]').type(recommendation.name)
    cy.get('[data-cy="input-url"]').type(recommendation.urlYoutube)

    cy.intercept("POST","http://localhost:5000/recommendations").as("createRecomendation")    
    cy.get('[data-cy="input-submit"]').click()
    cy.wait("@createRecomendation")
    cy.contains(recommendation.name)


    for(let i=0; i<1; i++){
      cy.get("article").find('[data-cy="arrowUp"]').click()
    }

    for(let i=0; i<8; i++){
      cy.get("article").find('[data-cy="arrowDown"]').click()
    }

    cy.get("article").should('not.exist')// verificar que elemento foi mesmo deletado da página
  
  })
})