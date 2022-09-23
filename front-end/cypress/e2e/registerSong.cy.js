import { faker } from '@faker-js/faker';

describe('empty spec', () => {
  it('passes', () => {
    
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="input-name"]').type(faker.name.fullName())
    cy.get('[data-cy="input-url"]').type('https://www.youtube.com/watch?v=zh3P-VpyLPc')
    cy.get('[data-cy="input-submit"]').click()

    for(let i=0; i<10;i++){
      if(i>=5){
        cy.get('[data-cy="arrowDown"]').click({ multiple: true })
      }else{
        cy.get('[data-cy="arrowUp"]').click({ multiple: true })
      }
    }
    

  })
})