Cypress.env('RETRIES', 1)
/// <reference types="cypress" />


import {cleanUpXHR, 
   sendMessage,
   visitCChatDirect_user,  
   createBroadcast,
   createGroupMultiple, 
   findMember, 
   findMemberBroadcast,
  } from "../../support/commands";

describe(" Add -Change - Remove  Group Image New Chat ", function() {

  
  
	before(() => {
    visitCChatDirect_user('b');
 
   var newChatId =  createGroupMultiple(1);
   cy.updateFixture("groupa", newChatId).then(id =>{
  

      cy.fixture('constants').then(c => {
        this.constants = c
      })
      
      cy.fixture('data').then(d => {
        this.data = d
      })
    });
  

  });
  

 
  after(() => {
		//cleanUpXHR();
    });

     

it("Add image in empty chat", () => {

cy.log(this.data.groupa)  
findMember(this.data.groupa)
cy.fixture('image.jpg', 'base64').then(cyPng => {
  const files = [
    { fileName: 'image.jpg', fileContent: cyPng, mimeType: 'image/*' }    
  ];



cy.log(files)

cy.get('.editable-chat-details.can-edit').should('be.visible');
cy.get('.editable-chat-details.can-edit').click();
cy.window().then(win => {
 win.confirm();
})
cy.get('.editable-chat-details.can-edit input[ref="fileInputElement"]').upload(files, {subjectType: 'input', force: true }).sync();

cy.get('.cr-slider-wrap .cr-slider')
  .invoke('val', 0.7009)
  .trigger('change')


cy.get('button-with-loader.au-target', {timeout: 9000}).click();
cy.server();
cy.route("POST", "/api/directoryentity/*/file").as("load");
cy.wait("@load").then((xhr) => {
  expect(xhr.status).to.eq(200);
  cy.get('image-editor').should('not.be.visible');
  cy.get('.text-notification:last-of-type').should('contain', 'changed');
});

});
})

it("Change image existing chat", () => {

  findMember(this.data.groupa)

  cy.fixture('image_b.jpg', 'base64').then(cyPng => {
    const files = [
      { fileName: 'image_b.jpg', fileContent: cyPng, mimeType: 'image/*' }    
    ];


  cy.get('.editable-chat-details.can-edit',{timeout: 9000}).click().should('be.visible');;
  cy.get('body > div.au-target.context-menu__content.tether-element.tether-element-attached-top.tether-element-attached-left.tether-target-attached-middle.tether-target-attached-center.tether-enabled > div > button:nth-child(1)').click();
  cy.window().then(win => {
    win.confirm();
   })


   cy.get('.editable-chat-details.can-edit input[ref="fileInputElement"]').upload(files, {subjectType: 'input', force: true }).sync();

   
   cy.get('.cr-slider-wrap .cr-slider')
   .invoke('val', 0.7009)
   .trigger('change')

  
   cy.get('button-with-loader.au-target').click();

   cy.server();
   cy.route("POST", "/api/directoryentity/*/file").as("load");
   cy.wait("@load").then((xhr) => {
   expect(xhr.status).to.eq(200);
   cy.get('image-editor').should('not.be.visible');
   cy.get('.text-notification:last-of-type').should('contain', 'changed');
  });
  });


  cy.getCurrentChannelID().then(id =>{
  cy.log(id.runtimechannelID)
 
})

})


it("Remove image existing chat", () => {
  findMember(this.data.groupa)
  cy.get('.editable-chat-details.can-edit',{timeout: 9000}).click().should('be.visible');
  cy.get('body > div.au-target.context-menu__content.tether-element.tether-element-attached-top.tether-element-attached-left.tether-target-attached-middle.tether-target-attached-center.tether-enabled > div > button:nth-child(2)').click(); 


})


});


 


describe(" BROADCAST Add -Change Remove Goup Image ", function() {
  
	before(() => {
    visitCChatDirect_user('b');
  
    var broadId = createBroadcast()
    cy.updateFixture("broadcasta", broadId).then(id =>{
      cy.fixture('constants').then(c => {
        this.constants = c
      })
      
      cy.fixture('data').then(d => {
        this.data = d
      })
  });
});



  after(() => {
		//cleanUpXHR();
    });

     

it("Add image in empty chat", () => {

cy.log(this.data.broadcasta)  
cy.get('#channels-stage__broadcast-tab > span').click();
cy.sync().findMemberBroadcast(this.data.broadcasta)
cy.fixture('image_c.jpg', 'base64').then(cyPng => {
  const files = [
    { fileName: 'image_c.jpg', fileContent: cyPng, mimeType: 'image/*' }    
  ];



cy.log(files)

cy.get('.editable-chat-details.can-edit').should('be.visible');
cy.get('.editable-chat-details.can-edit').click();
cy.window().then(win => {
 win.confirm();
})
cy.get('.editable-chat-details.can-edit input[ref="fileInputElement"]').upload(files, {subjectType: 'input', force: true }).sync();



cy.get('button-with-loader.au-target', {timeout: 9000}).click();
cy.server();
cy.route("POST", "https://synapse-uat.clarksons.com/api/directoryentity/*/file").as("load");
cy.wait("@load").then((xhr) => {
  expect(xhr.status).to.eq(200);
  cy.get('image-editor').should('not.be.visible');
  sendMessage('--ADDED--')
});

});
})

it("Change image existing chat", () => {

  findMemberBroadcast(this.data.broadcasta)
  cy.fixture('image_b.jpg', 'base64').then(cyPng => {
    const files = [
      { fileName: 'image_b.jpg', fileContent: cyPng, mimeType: 'image/*' }    
    ];

  cy.get('.editable-chat-details.can-edit',{timeout: 9000}).click().should('be.visible');;
  cy.get('body > div.au-target.context-menu__content.tether-element.tether-element-attached-top.tether-element-attached-left.tether-target-attached-middle.tether-target-attached-center.tether-enabled > div > button:nth-child(1)').click();
  cy.window().then(win => {
    win.confirm();
   })


   cy.get('.editable-chat-details.can-edit input[ref="fileInputElement"]').upload(files, {subjectType: 'input', force: true }).sync();
  
   cy.get('button-with-loader.au-target').click();

   cy.server();
   cy.route("POST", "/api/directoryentity/*/file").as("load");
   cy.wait("@load").then((xhr) => {
   expect(xhr.status).to.eq(200);
   cy.get('image-editor').should('not.be.visible');
   sendMessage('--REPLACED--')
  });
  });


  cy.getCurrentChannelID().then(id =>{
  cy.log(id.runtimechannelID)
 
})

})


it("Remove image existing chat", () => {
  findMemberBroadcast(this.data.broadcasta)
  cy.get('.editable-chat-details.can-edit',{timeout: 9000}).click();
  cy.get('body > div.au-target.context-menu__content.tether-element.tether-element-attached-top.tether-element-attached-left.tether-target-attached-middle.tether-target-attached-center.tether-enabled > div > button:nth-child(2)').click(); 
  sendMessage('-REMOVED-');
})
       
});







  

  

