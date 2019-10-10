Cypress.env('RETRIES', 1)
/// <reference types="cypress" />


import {cleanUpXHR, 
   sendMessage,
   visitCChat,
   visitCChatDirect_user,  
   findIndividual_New,
   findIndividual,
   getCurrentChannelID } from "../../support/commands";

describe.skip(" Add -Change - Remove  Group Image New Chat ", function() {

  
  
	before(() => {
    var visitChainable =  visitCChat('Seachat_user1@clarksons-test-user.com', 'Clarksons2019')
    var concatToken =  ('clarksons-cloud-token '+ visitChainable);
    var botToken =  visitCChat('testbot@bot.sea.live', 'Testbot19!')
    var senderToken =  visitCChat('cchat_user2@clarksons-test-user.com', 'User2CChat')
   
    cy.log(concatToken)
    cy.log(botToken)
    cy.log(senderToken)
    cy.updateFixture("auth_token", concatToken).then(id =>{
    cy.updateFixture("bot_token", botToken)
    cy.updateFixture("senderUserToken", senderToken)

    cy.fixture('data').then(d => {
      this.data = d
    })

    cy.fixture('constants').then(c => {
      this.constants = c
    })
  })

  });
  

 
  after(() => {
		//cleanUpXHR();
    });

     

it("Delete User", () => {
  
  cy.server();
  cy.request({
      method: 'DELETE',
      url: 'https://cchat-test.clarksons.com/api/test/users/20005',
      headers: {
        'Authorization': this.data.auth_token,
        'Content-Type': 'application/json'
       
      },

    }).then(response => {
      expect(response.status).to.eq(200);
    })

     visitCChatDirect_user('c');

     findIndividual_New('Seachat_user1@clarksons-test-user.com')
     findIndividual_New('Seachat_user2@clarksons-test-user.com')
     findIndividual_New('Seachat_user3@clarksons-test-user.com')
     findIndividual_New('cchat_user2@clarksons-test-user.com')



  })


});








  

  

