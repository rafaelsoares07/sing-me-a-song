import { faker } from '@faker-js/faker';

describe('Testa a rota randomica, só deve conter uma indicação ', () => {

  beforeEach(()=>{
    cy.request("POST","http://localhost:5000/e2eRouter/resetDB")
    cy.request("POST","http://localhost:5000/e2eRouter/topList")
  })

  it("Verifica se a ordem das recommendações está correta", async() => {

    
    cy.visit('http://localhost:3000/random')


    cy.get("article")
    cy.get("article").eq(1).should("not.exist")
  
    
  })
})