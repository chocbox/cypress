Cypress.env('RETRIES', 0)
/// <reference types="cypress" />

import { visitCChat,  
  cleanUpXHR, 
  createGroup, 
  visitCChatDirect, 
  sendMessage, 
  VerifyForwardedTag, 
  visitCChatDirect_user, 
  findIndividual, 
  forwardBot, 
  replyIndividualLastestChat, 
  createGroupMultiple, 
  findGroup, 
  scroller, 
  findMember, 
  findMemberNoMessage, 
  logout } from "../../support/commands";
import { getToken } from "../../services/user-service";




before(function () {
  // visitCChatDirect();


//   var visitChainable =  visitCChat('Seachat_user1@clarksons-test-user.com', 'Clarksons2019')
//     var concatToken =  ('clarksons-cloud-token '+ visitChainable);
//     var botToken =  visitCChat('testbot@bot.sea.live', 'Testbot19!')
//     var senderToken =  visitCChat('cchat_user2@clarksons-test-user.com', 'User2CChat')
   
//     cy.log(concatToken)
//     cy.log(botToken)
//     cy.log(senderToken)
//     cy.updateFixture("auth_token", concatToken).then(id =>{
//     cy.updateFixture("bot_token", botToken)
//     cy.updateFixture("senderUserToken", senderToken)

//     cy.fixture('data').then(d => {
//       this.data = d
//     })

//     cy.fixture('constants').then(c => {
//       this.constants = c
//     })
// })
})




after(() => {
  //cleanUpXHR();
  });
  
 





describe("Preferences", function() {

   
  
    it("Verify User Search Globally", function() {
      visitCChatDirect_user('c');
      cy.get('.channels-stage__header .channels-stage__header-actions > div:nth-child(2) button-triggered-context-menu .button').should('be.visible').click();
      cy.get('.context-menu__content button:first-child').click();
      cy.get('.global-preferences-dialog').should('be.visible');
      cy.get('.global-preferences-dialog global-preferences >section > div:last-child select > option:nth-child(1)').should('contain.text', 'By name and email')
      cy.get('.global-preferences-dialog global-preferences >section > div:last-child select').select('By name and email');

      cy.server()
      cy.route("POST", "/api/user/settings/searchablebyname?enabled=true").as("true")
      .then((fetch) => {
           expect(fetch.status).to.eq(200);
    });

      cy.get('.global-preferences-dialog global-preferences >section > div:last-child select').select('By email only');
      cy.route("POST", "/api/user/settings/searchablebyname?enabled=false").as("false")
      .then((fetch) => {
          expect(fetch.status).to.eq(200);
    });
    cy.get('.global-preferences-dialog ux-dialog-footer button').click();


   cy.get('#channel-users__search-input').should('be.visible').type('1User')



   cy.route("POST", "/api/1/messages?messageTextQuery=1user&limit=10").as("list")
   .then((fetch) => {
        expect(fetch.status).to.eq(200);
    });
    })

         

   it.skip("Preference", function() {
    
    let username = Cypress.env("AdminUser");
    let password = Cypress.env("AdminPassword");
      let tokenTwo = getToken(username, password);
      var enc = encodeURI(tokenTwo);
      let encoded = 'V7/lCDy8vHUfMxaRHgbLOPaRs/qjNETc7LA/zcVbHL7RQPevuG3MXHstJXEbYIoX4bk62LosMc3uOZfqPgsz6W5rD2t29Gs2lUH/L9hL8XBBLk7Q0IaAbB3jLwRiXflC/4iBe/tTkqrJQlj0F3ydhg=='
      cy.log(tokenTwo)
      cy.log(encoded)
   
      visitCChatDirect_user('main');
      scroller(2);
      findMember('check01')
			cy.get('[slot="right"] > button-triggered-context-menu.au-target > .context-menu > .context-menu__trigger > .button').click();
			cy.get('.context-menu__button').click();
			
			cy.wait(5000);

			cy.get(".cchat-form__control .toggle-switch")
				.eq(0)
        .click("right");
        
          cy.server();
          cy.request({
              method: 'GET',
              //url: 'https://cchat-test.clarksons.com/api/channel/C.G1.9HGCPAITD9',
              url: 'https://cchat-test.clarksons.com/api/summarynotification/channel/C.G1.9HGCPAITD9',
              headers: {
                'Authorization': 'clarksons-cloud-token ' + encoded,
                'Content-Type': 'application/json'
              }
            }).then(response => {
              const target = (response.body.enabled)
              const targetFull = (response.body)
              cy.log(target)
              cy.log(targetFull)
              expect(response.status).to.eq(200);
              expect(target).to.be.true
      
            })
 
            cy.get(".cchat-form__control .toggle-switch")
            .eq(1)
            .click("right");
            // cy.get('ux-dialog-footer').contains('OK').click();
            // cy.get(".cchat-form__control .toggle-switch")
            // .eq(2)
            // .click("right");
            // cy.contains('OK').click();

            // cy.get(".cchat-form__control .toggle-switch")
            // .eq(0)
            // .click("left");

     });

});
 



       
   







  

  

