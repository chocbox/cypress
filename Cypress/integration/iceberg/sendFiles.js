Cypress.env('RETRIES', 1)
/// <reference types="cypress" />

import { visitCChat, 
  cleanUpXHR, 
  createGroup, 
  visitCChatDirect, 
  sendMessage, 
  visitCChatDirect_user1, 
  visitCChatDirect_user, 
  findIndividual, 
  messageContain, 
  replyIndividualLastestChat, 
  createGroupMultiple, 
  findIndividual_New,
  findGroup } from "../../support/commands";


 





describe("Add An attachement to a  message", function() {
 
  beforeEach(() => {
    cy.fixture('data').then(d => {
      this.data = d
    })
  });
  
  after(() => {
    //cleanUpXHR();
    });

 

    it("Drag and Drop file UI", function() {
      visitCChatDirect_user('b');
   
      findIndividual_New('Seachat_user1@clarksons-test-user.com')
        cy.fixture('image.jpg', 'base64').then(cyPng => {
          const files = [
            { fileName: 'image_b.jpg', fileContent: cyPng, mimeType: 'image/jpg' }    
          ];
        sendMessage('PFA - drag drop first start');
        cy.get('.messaging-stage__messages').upload(files, { subjectType: 'drag-n-drop' });   
        sendMessage('PFA -  drag drop first end');

        
        sendMessage('PFA -  drag drop start Second');
        cy.get('.messaging-stage__messages').upload(files, { subjectType: 'drag-n-drop' });   
        cy.get('.messaging-stage__input-container message-input message-input-files .message-input-files__file button').click();
        sendMessage('PFA -  drag drop end Second');
        
        sendMessage('PFA -  drag drop start Third');
        cy.get('.messaging-stage__messages').upload(files, { subjectType: 'drag-n-drop' });   
        cy.get('#send-message-button').click();
        sendMessage('PFA -  drag drop end Third');
        });

  

       })


 
    it("Input attached file UI", function() {
      visitCChatDirect_user('c');
      findIndividual_New('Seachat_user1@clarksons-test-user.com')
      sendMessage('Ne Attachment Test -Input')
      cy.fixture('image_c.jpg', 'base64').then(cyPng => {
        const files = [
          { fileName: 'image_c.jpg', fileContent: cyPng, mimeType: 'image/jpg' }    
        ];
      sendMessage('PFA -- Sending Input attache');

      
      cy.get('#file-upload-button').click();
      cy.get('.messaging-stage__input-container .attachment-type-selector input').upload(files, {subjectType: 'input', force: true }).sync();
      sendMessage('PFA -- Sent ');
      });

     
     })
  
    


     
    
  
});
 



       
   







  

  

