//Cypress.env('RETRIES', 1)
/// <reference types="cypress" />

import {cleanUpXHR, 
  sendMessage, 
  logout, 
  visitCChatDirect_user, 
  findIndividual, 
  messageContain, 
  replyIndividualLastestChat, 
  createGroup,modifyChatName, 
  updateFixture, 
  createBroadcast,
  createGroupMultiple, 
  findGroup, 
  SearchPanel, 
  findMember, 
  findMemberLatestMessage, 
  visitCChat, 
  addIndividualMember, 
  removeIndividualMember, 
  makeid, 
  findMemberBroadcast, 
  findMemberNoMessage, 
  imageUpload } from "../../support/commands";




describe(" Group Message ", function() {
 
  

	before(() => {
    visitCChatDirect_user('b');
     var groupb = createGroup()
     cy.updateFixture("groupb", groupb);
 


    cy.fixture('constants').then(c => {
      this.constants = c
    })

    cy.fixture('data').then(d => {
      this.data = d
    })



  });
  



  after(() => {
		cleanUpXHR();
    });




  
   
it("--ADD memeber--", () => {
  findMemberNoMessage(this.data.groupb)
      addIndividualMember('Jason.Peitli@sea.live');
      addIndividualMember('Andy.Mondal@sea.live');
      addIndividualMember('Lorin.Kalemi@sea.live');
      addIndividualMember(this.constants.users.cchatJames);
      addIndividualMember('Christopher.Powell@sea.live');
      addIndividualMember('Seachat_user1@clarksons-test-user.com');
      
  });


 
     
it("Remove one memeber and assert the member is removed in messgae Box", () => {
      findMember(this.data.groupb)
     removeIndividualMember('Jason')
    
});



     

it("Add one new memeber again", () => {
  
  findMemberNoMessage(this.data.groupb)
  
  
  addIndividualMember('Seachat_user3@clarksons-test-user.com');
 
});

it("--ADD one memeber as group Admin- And validate that admin can remove other user-", () => {
 
findMemberNoMessage(this.data.groupb)
cy.groupadmin('add', 'CChat3 3User')
logout();
visitCChatDirect_user('c');
findMemberNoMessage(this.data.groupb)
let member = 'James';
cy.get('.au-target.channel-member__details > div.channel-member__details-name > span').then(($elm) => {
 cy.wrap($elm).should('contain', member)
 removeIndividualMember(member)
})



});



it("--Edit Group Name and validate system message", () => {
  
  var modifyName =  makeid()
  findMemberNoMessage(this.data.groupb)
  modifyChatName(modifyName)
  cy.sync().get('.text-notification').should('contain', 'You changed the group name from');
	cy.get('.text-notification').should('contain', modifyName);
  updateFixture('groupb', modifyName)
});



it("--Edit Broradcast Name and validate system message", () => {

  var broad = createBroadcast()
  modifyChatName(broad + '_edit')
  findMemberBroadcast(broad + '_edit')
  sendMessage('Test Broadcasr name changed')
  
});


});
 



       
   







  

  

