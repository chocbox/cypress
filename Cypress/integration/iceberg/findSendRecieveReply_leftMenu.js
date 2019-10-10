Cypress.env('RETRIES', 1)
/// <reference types="cypress" />

import { createBroadcast, 
  cleanUpXHR, 
  createGroup, 
  findMemberNoMessage, 
  sendMessage, 
  findMemberLatestMessage, 
  visitCChatDirect_user, 
  findIndividual, 
  findIndividual_New,
  messageContain, 
  replyIndividualLastestChat, 
  createGroupMultiple, 
  findGroup,
  findMember, 
  scroller, 
  findMemberBroadcast, 
  SearchPanel, 
  makeid, 
  timestamp, 
  logout, 
  assertContains, 
  findMemberAssertTop } from "../../support/commands";



 

describe("Find Send Recieved Left side Pannel", function() {
 
	before(() => {
    visitCChatDirect_user('b');
    cy.fixture('constants').then(c => {
      this.constants = c
    })

    cy.fixture('data').then(d => {
      this.data = d
    })

  
   
    
	});

  after(() => {
		//cleanUpXHR();
    });
    


    it("Find Send Individual Chat from - USER 01 to USER 03", () => {
      cy.fixture('data').then(data => {
      findIndividual_New(data.usera)
      sendMessage('auto_test userb '+ timestamp());
      logout()
      visitCChatDirect_user('b');
      cy.sync().findMemberAssertTop('CChat1 1User');
    
    })
    });

    it("Send Individual Chat from - USER 01 to USER 02", () => {
     
      cy.fixture('data').then(data => {
      findIndividual_New(data.userAndy)
      sendMessage('auto_test Andy '+ timestamp());
      logout()
      visitCChatDirect_user('b');
      cy.sync().findMemberAssertTop('Andy Mondal');
     
    })
    });


    it("Existing Group chat on TOP", () => {
        var groupa = createGroup()
        findMember(groupa)
        sendMessage('auto_test Andy '+ timestamp());
        logout()
        visitCChatDirect_user('b');
        cy.sync().findMemberAssertTop(groupa);
    
    });

   

    it("Check the Latest message in bRoadcast highlight on TOP", () => {
     

      cy.get('#channels-stage__broadcast-tab').click();                
      
       var broad = createBroadcast() 
       findMemberBroadcast(broad);
       cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div').eq(1)
       .get('content-block-with-icon > content-block > div > div.au-target.content-block__content > div.content-block__middle > div.au-target.content-block__top.font-large > div > div.title')
       .should('contain',(broad));

        cy.get('#channels-stage__chats-tab').click();
    

      });
    




    it("Chat from another member and verify the reciever get in top", () => {
        
      
        logout()
        visitCChatDirect_user('b');
        findIndividual_New(this.data.userc)
        sendMessage('-Testing---Testing---Testing---Testing--');
        
        
        
        logout();
        visitCChatDirect_user('c');      
        cy.sync().findMemberAssertTop('CChat2');
      
        
        })
  


    it("Search - Find keywords in chat", () => {
      logout();
      visitCChatDirect_user('b');
      sendMessage('Testing'+ timestamp());

      SearchPanel('Testing'); 
      cy.get("collapsable-row").eq(0).click();
      cy.get("collapsable-row:nth-child(1) > div > div > div > message-search > div:nth-child(2)").click().get('div.au-target.message-search.selected > div > div > a').click()
        .wait(1000).sendMessage('---Keyword-----')
        cy.get(".icon__wrap--arrow-back").click();
       
   
   
    
      });




      it("Search - 10 member in search list", () => {
     
        cy.get("#channel-users__search-input").should('be.visible')
        cy.get('#channel-users__search-input').type('a');
      
        cy.server()
           cy.get('.channels-stage__search .channel-user-search:last-child collapsable-row:last-child .collapsable-row__content .user-search').should('be.visible');
      
           cy.route("/#/unicomms/messaging/channel/**").as("userload")
           cy.location('href').should('contain', 'channel')
  
           cy.get(".channels-stage__search .channel-user-search:last-child collapsable-row:last-child .collapsable-row__content user-search").children().should('have.length', 10+2)
      
        });


    });

  

 



       
   







  

  

