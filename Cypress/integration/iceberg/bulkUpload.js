//Cypress.env('RETRIES', 1)
/// <reference types="cypress" />
var randomEmail = require('random-email');

import { openImportContacts, 
  cleanUpXHR, 
  visitCChat,
  updateFixture,
  createGroup, 
  visitCChatDirect, 
  sendMessage, 
  visitCChatDirect_user1, 
  visitCChatDirect_user, 
  findIndividual, 
  forward, 
  replyIndividualLastestChat, 
  createGroupMultiple, 
  findGroup, 
  scroller, 
  findMember, 
  findMemberNoMessage, 
  makeid, 
  logout} from "../../support/commands";
  import { getToken } from "../../services/user-service";



  before(function () {
    // visitCChatDirect();
  
  
      // var visitChainable =  visitCChat('Seachat_user2@clarksons-test-user.com', 'Clarksons2019')
      // var concatToken =  ('clarksons-cloud-token '+ visitChainable);
      // var botToken =  visitCChat('testbot@bot.sea.live', 'Testbot19!')
      // var senderToken =  visitCChat('cchat_user2@clarksons-test-user.com', 'User2CChat')
     
      // cy.log(concatToken)
      // cy.log(botToken)
      // cy.log(senderToken)
      // cy.updateFixture("auth_token", concatToken).then(id =>{
      // cy.updateFixture("bot_token", botToken)
      // cy.updateFixture("senderUserToken", senderToken)
  
      cy.fixture('data').then(d => {
        this.data = d
      })
  
      cy.fixture('constants').then(c => {
        this.constants = c
      })
  })
 // })
  
  
  
  
  after(() => {
   // cleanUpXHR();
    });
    




describe("Bulk Upload", function() {
 

    it("Bulk Upload Endpoint", function() {
      for ( let i = 1; i < 10 ; i ++) { 
        
          let randomId = makeid();
          let email = randomEmail({ domain: 'sea.live' });
          let concatemail = (randomId +'-'+ email);
          let realemail = false;
                    switch (i) {
                      case 19:
                         concatemail = environment;
                         realemail = true;
                        break;
                      case 49:
                           concatemail = 'bulk06@rmailcloud.com';
                           realemail = true;
                          break;
                      case 89:
                           concatemail = 'bulk07@rmailcloud.com';
                           realemail = true;
                           break;
                      case 99:
                           concatemail = 'bulk08@rmailcloud.com';
                           realemail = true;
                        break;
                    }
            cy.server();
            cy.request({
                method: 'GET',
                url: ('https://cchat-test.clarksons.com/api/invite?emailAddress='+ concatemail) ,
                failOnStatusCode: false,
                headers: {
                  'Authorization': this.data.auth_token,
                  'Content-Type': 'application/json',
                  
                },
            
              }).then(response => {
                let target = (response.body)
                let responseCode = response.status
                let responseDuration = response.duration
                //cy.writeFile('info.log', [{i, concatemail, realemail, responseCode, responseDuration, target}],  { flag: 'a+', encoding: "ascii" })
              
                cy.writeFile('cypress/fixtures/info.csv', concatemail + ' ',  { flag: 'a+', encoding: "ascii"})
              
              })
            
         }
        })

 

     it("Bulk Upload FILE Upload Entry", function() {
    
 
      visitCChatDirect_user('c');
      openImportContacts();  
      cy.get('.invite-user-dialog .wizard .wizard-step .invite-user-selection button:last-child').click();
      cy.get('.invite-user-dialog .wizard .wizard-buttons').contains('Next').click();
      cy.get('.invite-user-dialog .wizard ux-dialog-body .invite-user-dialog__input-page .invite-user-by-file button').should('be.visible').click();

      cy.fixture('info.csv', 'base64').then(cyPng => {
        const files = [
          { fileName: 'info.csv', fileContent: cyPng, mimeType: 'csv/*' }    
        ];
      
    
      cy.get('.invite-user-dialog .wizard ux-dialog-body .invite-user-dialog__input-page .invite-user-by-file input').upload(files, {subjectType: 'input', force: true }).sync();
    
     });      
    })


    
    it("Bulk Upload MANUAL Entry", function() {
      visitCChatDirect_user('c');
      openImportContacts();  



     
     //Manual
     cy.get('.invite-user-dialog .wizard .wizard-buttons').contains('Next').click();

      var i = 0;
      for (i = 0; i < 3 ; i++) { 

        let email = randomEmail({ domain: 'sea.live' });
        cy.get('.invite-user-dialog .wizard ux-dialog-body textarea').type(email + ' ');
        cy.wait(2000)
      }
      cy.get('.invite-user-dialog .wizard-buttons button-with-loader').click();
      cy.get('.invite-user-dialog .invite-user-sending-invites').should('be.visible').should('contain', '3 Invitations');
      cy.get('.invite-user-dialog .wizard-buttons').contains('Close').click();
    
  
           
    })




      it("Bulk Upload csv", function() {
        var i = 0;
        for (i = 0; i < 10 ; i++) { 
          let email = randomEmail({ domain: 'sea.live' });
          cy.writeFile('info.csv', [{email}],  { flag: 'a+', encoding: "ascii"})
    
 
        
        }
        })

});
 



       
   







  

  

