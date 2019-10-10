Cypress.env('RETRIES', 1)
/// <reference types="cypress" />

import { visitCChat, 
  cleanUpXHR, 
  createGroup, 
  visitCChatDirect, 
  timestamp, 
  sendMessage, 
  findMember, 
  visitCChatDirect_user, 
  findIndividual, 
  messageContain, 
  replyIndividualLastestChat, 
  createGroupMultiple, 
  findGroup, 
  findMemberBroadcast, 
  logout, 
  makeid, 
  createBroadcast, 
  findIndividual_New} from "../../support/commands";





describe("Find Send Recieved", function() {
  var nameTwo = makeid(); 
  

	beforeEach(() => {
  
    //visitCChatDirect_user('main');
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

   afterEach(() => {
    //logout();
   });
    
    //Individual Chat Conversation start .....
    it("Send Individual Chat from - USER 01", () => {
      visitCChatDirect_user('a');
      cy.fixture('data').then(data => {
      findIndividual(data.userb)
      cy.wait(2000)
      sendMessage('auto_test 01 '+ timestamp());
    })
    });

    it("Recieve an REPLY Individual Chat from - USER 02", () => {
    
      visitCChatDirect_user('b');
      findIndividual(this.data.usera)
      //messageContain('test')
      replyIndividualLastestChat('REPLY auto_test 02 '+ timestamp());
    });
   
    it("MULTIPLE Send Chat from - USER 01", () => {
      visitCChatDirect_user('a');
      cy.fixture('data').then(data => {
      findIndividual(data.userb)
      messageContain('REPLY auto_test 02 ')
      replyIndividualLastestChat('REPLY auto_test 03 '+ timestamp());
      sendMessage('auto_test 04 '+ makeid());
      sendMessage('auto_test 05 '+ makeid());
      sendMessage('auto_test 06 '+ makeid());
      sendMessage('auto_test 07 '+ makeid());
      
    })
    });
    
    
    it("MULTIPLE REPLY Chat from - USER 02", () => {
      visitCChatDirect_user('b');
      cy.fixture('data').then(data => {
      findIndividual(data.usera)
      cy.get('.messages-controller__message-container:last-child .desktop-message-context-menu .button').click()     
      cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();        
      sendMessage('reply');
     //04
     cy.get('.messages-controller__message-container:nth-last-child(2) .desktop-message-context-menu .button').click();
     cy.wait(1000)
     cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
     sendMessage('reply');


     cy.get('.messages-controller__message-container:nth-last-child(3) .desktop-message-context-menu .button').click();
     cy.wait(1000)
     cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
     sendMessage('reply');

     //05
     cy.get('.messages-controller__message-container:nth-last-child(5) .desktop-message-context-menu .button').click();
     cy.wait(1000)
     cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
     sendMessage('reply');

     //06
     cy.get('.messages-controller__message-container:nth-last-child(7) .desktop-message-context-menu .button').click();
     cy.wait(1000)
     cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
     sendMessage('reply');


    })
    });
   


    it("Reply your own messages", () => {
      visitCChatDirect_user('a');
      cy.fixture('data').then(data => {
      findIndividual_New(data.userc)
      var staticmessage =  makeid(); 
      sendMessage('auto_test '+ staticmessage);   
      cy.wait(1000)
      cy.get('.messages-controller__message-container:last-child .desktop-message-context-menu .button').click();
      cy.wait(1000)
      cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
      sendMessage('REPLY');
       })
    });


     //Group Chat Conversation start .....

    it("Send groupChat from - USER 01", () => {
       visitCChatDirect_user('a');
       var groupa = createGroup()
       cy.log(groupa);
       findMember(groupa);
       cy.wait(4000);
       sendMessage('auto_reply');
     
       // Logout
     
       logout();
       visitCChatDirect_user('b'); 
       findMember(groupa);
       cy.wait(4000)
       messageContain('auto_reply')
       sendMessage('reply');



    
    });


      //Broadcast Chat Conversation start .....
    it("Send BroadCast from - USER 01", () => {
        visitCChatDirect_user('a');
      
        var broad = createBroadcast()
        cy.log(broad);
        cy.wait(3000);
       findMemberBroadcast(broad)
      });
   

     //Historic Chat
   

});
 



       
   







  

  

