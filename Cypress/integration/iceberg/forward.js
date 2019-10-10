//Cypress.env('RETRIES', 1)
/// <reference types="cypress" />
const cyView = require("cy-view");

import {  
  createBroadcast, 
  createGroup, 
  timestamp, 
  sendMessage, 
  findMemberBroadcast, 
  visitCChatDirect_user, 
  findIndividual, 
  forward, 
  findGroup,
  logout, 
  forwardLast} from "../../support/commands";





describe("Forwarding", function() {
 
  

	beforeEach(() => {
    cy.fixture('element').then(e => {
      this.element = e
    })
  
    cy.fixture('constants').then(c => {
      this.constants = c
    })

    cy.fixture('data').then(d => {
      this.data = d
    })
	});

	after(() => {
	//	cleanUpXHR();
    });

 
 

    it.skip("Chain FORWARD Chat Individual", () => {
    
    visitCChatDirect_user('a');
    cy.fixture('data').then(data => {
    findIndividual(data.userb)
    cy.wait(2000)
    sendMessage('auto_test 01 '+ timestamp());

     logout()
     visitCChatDirect_user('b');
     findIndividual(data.usera)
     sendMessage('-------')
     cy.reload(false)
     forwardLast(data.userc, "3User");

    
    logout()
    visitCChatDirect_user('c');
    findIndividual(data.userb)
    sendMessage('-------')
    cy.reload(false)
    cy.get(' .messages-controller__message-container:nth-last-child(2) .message-content-container .message-content-container__meta').should('be.visible').should('contain', 'Forwarded')
    
   })
    });

  
   

    it.skip("Group FORWARD Chat from - USER 02", () => {
     
      visitCChatDirect_user('b');
    
      var groupa = createGroup()
      sendMessage('FORWARDING -- '+ timestamp());
      logout()
      
      visitCChatDirect_user('a');
      cy.reload(false);
      forward(this.data.mainuser, groupa)
      cy.reload(false);
      sendMessage('----')
      cy.reload(false)
      cy.get('.messages-controller__message-container:nth-last-child(2) .message-content-container .message-content-container__meta').should('be.visible').should('contain', 'Forwarded')
    });



    it.skip("Broadcast FORWARD Chat from - USER 02", () => {
     
      visitCChatDirect_user('b');
      var broad = createBroadcast();
      var groupa = createGroup()
      cy.get('#channels-stage__broadcast-tab').click();     
      cy.fixture('data').then(data => {
      findMemberBroadcast(broad)
      sendMessage('FORWARDING -- '+ timestamp());
    
      cy.reload(false)
      cy.get('.messages-controller__message-container:last-child .desktop-message-context-menu .button').click()        
      cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
      cy.get('#member-selection-search-filter').type(groupa)
      cy.wait(3000);
      cy.contains(groupa).click();
      cy.get('button-with-loader > button').click()
      cy.wait(2000)
          
      logout()
      visitCChatDirect_user('a');
      findGroup(groupa)
      cy.reload(false)
      cy.get('.messages-controller__message-container:last-child .message-content-container').should('contain', 'Forwarded')

    })
    });

});
 



       
   







  

  

