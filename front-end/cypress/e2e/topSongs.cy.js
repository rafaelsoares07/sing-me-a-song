import { faker } from '@faker-js/faker';

describe('Testa a rota de recomendações ordenadas pelo score de forama crescente ', () => {

  beforeEach(()=>{
    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
  })

  it("Verifica se a ordem das recommendações está correta", async() => {

    cy.request("POST","http://localhost:5000/e2eRouter/topList")
    cy.visit('http://localhost:3000/top')

    for(let i=0; i<6;i++){
      cy.get("article").eq(i).contains(`${i+1}_rec`)
    }

    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
  
  })
})