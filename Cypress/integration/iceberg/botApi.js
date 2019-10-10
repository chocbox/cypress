Cypress.env('RETRIES', 1)
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
})




after(() => {
  cleanUpXHR();
  });
  
 




describe.skip("BOT", function() {

   
    it("Bot user send message", function() {

 
        cy.server();
        cy.request({
            method: 'POST',
            url: 'https://cchat-test.clarksons.com/api/test/servicebus/thirdpartymessages',
            headers: {
              'Authorization': this.data.auth_token,
              'Content-Type': 'application/json'
             
            },
            body: {
                "senderUserToken": this.data.bot_token,
                "recipientUserId": 20006,
                "messageText": "Laws of science or scientific laws are statements that describe or predict a range of natural phenomena."
   
            }
          }).then(response => {
            const target = (response.body)
            console.log(target);
            visitCChatDirect_user('c');
            cy.get('.channels-stage__channels .channel-virtual-repeat .item-container:first-child .content-block').should('contain', 'Test Bot');    
          })
    })

    it("Bot message with Name Tag and forward", function() {

   
          cy.server();
          cy.request({
              method: 'POST',
              url:'https://cchat-test.clarksons.com/api/test/servicebus/thirdpartymessages',
              headers: {
                'Authorization': this.data.auth_token,
                'Content-Type': 'application/json',
              },
              body: {
                  "senderUserToken": this.data.bot_token,
                  "recipientUserId": 20006,
                  "messageText": "Laws of science or scientific laws are statements that describe or predict a range of natural phenomena. Sent by {{userId:19935}} happy to share details with {{userId:66}}  also include {{userId:17151}}"
     
              }
            }).then(response => {
              const target = (response.body)
              console.log(target);
            
              visitCChatDirect_user('c');
              //cy.get('.channels-stage__channels .channel-virtual-repeat .item-container:first-child .content-block').should('be.visible').click();
               findMemberNoMessage('Test Bot');
  
              cy.sync().get('.messages-controller__message-container:last-child .message-renderer').should('contain', 'member');
              cy.get('.messages-controller__message-container:last-child .message-renderer').should('contain', 'member');
         

                 
        
              var groupa = createGroup()
              //logout()
              //visitCChatDirect_user('c');
              forwardBot('Test Bot', groupa);
              VerifyForwardedTag(groupa);
            })
    })

         
  

  //  it("Preference", function() {
    
  //   let username = Cypress.env("AdminUser");
  //   let password = Cypress.env("AdminPassword");
  //     let tokenTwo = getToken(username, password);
  //     var enc = encodeURI(tokenTwo);
  //     let encoded = 'V7/lCDy8vHUfMxaRHgbLOPaRs/qjNETc7LA/zcVbHL7RQPevuG3MXHstJXEbYIoX4bk62LosMc3uOZfqPgsz6W5rD2t29Gs2lUH/L9hL8XBBLk7Q0IaAbB3jLwRiXflC/4iBe/tTkqrJQlj0F3ydhg=='
  //     cy.log(tokenTwo)
  //     cy.log(encoded)
   
  //     visitCChatDirect_user('main');
  //     scroller(2);
  //     findMember('check01')
	// 		cy.get('[slot="right"] > button-triggered-context-menu.au-target > .context-menu > .context-menu__trigger > .button').click();
	// 		cy.get('.context-menu__button').click();
			
	// 		cy.wait(5000);

	// 		cy.get(".cchat-form__control .toggle-switch")
	// 			.eq(0)
  //       .click("right");
        
  //         cy.server();
  //         cy.request({
  //             method: 'GET',
  //             //url: 'https://cchat-test.clarksons.com/api/channel/C.G1.9HGCPAITD9',
  //             url: 'https://cchat-test.clarksons.com/api/summarynotification/channel/C.G1.9HGCPAITD9',
  //             headers: {
  //               'Authorization': 'clarksons-cloud-token ' + encoded,
  //               'Content-Type': 'application/json'
  //             }
  //           }).then(response => {
  //             const target = (response.body.enabled)
  //             const targetFull = (response.body)
  //             cy.log(target)
  //             cy.log(targetFull)
  //             expect(response.status).to.eq(200);
  //             expect(target).to.be.true
      
  //           })
 
  //           cy.get(".cchat-form__control .toggle-switch")
  //           .eq(1)
  //           .click("right");
  //           // cy.get('ux-dialog-footer').contains('OK').click();
  //           // cy.get(".cchat-form__control .toggle-switch")
  //           // .eq(2)
  //           // .click("right");
  //           // cy.contains('OK').click();

  //           // cy.get(".cchat-form__control .toggle-switch")
  //           // .eq(0)
  //           // .click("left");

  //    });
});
 



       
   







  

  

