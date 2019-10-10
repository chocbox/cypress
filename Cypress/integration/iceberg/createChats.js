Cypress.env('RETRIES', 1)
/// <reference types="cypress" />

import { visitCChat, 
    cleanUpXHR, 
    createGroup, 
    visitCChatDirect, 
    sendMessage, 
    visitCChatDirect_user, 
    makeid } from "../../support/commands";

    


describe("Create Chat", function() {

  var name = makeid();
 

	before(() => {
        cy.fixture('constants').then(c => {
            this.constants = c
          })
        cy.fixture('data').then(d => {
            this.data = d
          })
    
        visitCChatDirect_user('a');
	});

	after(() => {
		cleanUpXHR();
    });
    

    
	afterEach(() => {
      
    });

   
    //GroupChat
		
    it("clicking a searched for user will add a checkbox to it - verify checkbox is ticked", () => {
        openNewGroupChatPanel();
        var name = makeid();
                    cy.get(
                        "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
                    ).type(name+"_auto-test");
                    cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
                        .eq(0)
                        .click();
                    cy.wait(200);

                    cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type(this.data.mainuser);

                    cy.get(".new-channel-full-screen__user-search-results .title").click();
                
                    cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");
                    cy.get('ux-dialog-header > :nth-child(2)').click();
                   
                  
     });
    
    it("typing in the search box filters users by first name", () => {
        openNewGroupChatPanel();

        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");

        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");

        cy.wait(250);

        cy.get(".new-channel-full-screen__user-search-results .title").should("contain", "Roy");
        cy.get('ux-dialog-header > :nth-child(2)').click();
    });

    it("typing in the search box filters users by last name", () => {
        openNewGroupChatPanel();
        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("cockram");

        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");

        cy.wait(250);

        cy.get(".new-channel-full-screen__user-search-results .title").should("contain", "Cockram");
        cy.get('ux-dialog-header > :nth-child(2)').click();

     
    });

    it("typing in the search box filters users by full name", () => {
        openNewGroupChatPanel();
        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Roy cockram");

        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");

        cy.wait(250);

        cy.get(".new-channel-full-screen__user-search-results .title").should("contain", "Roy Cockram");
        cy.get('ux-dialog-header > :nth-child(2)').click();

    });

    it("clicking a searched for user will add it to the audience list", () => {
        openNewGroupChatPanel();

        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");

        cy.get(".new-channel-full-screen__user-search-results .title").click();

        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Roy Cockram");
        cy.get('ux-dialog-header > :nth-child(2)').click();
       
    });

    it("clicking a searched for multiple (3) user will add it to the audience list and Also Delete them", () => {
        openNewGroupChatPanel();

        //name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);
        //user 1
		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");
        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        //user 2
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("jason Peitli");
        cy.wait(2000);
        cy.get(".new-channel-full-screen__user-search-results .title").click();
        cy.wait(200);
        //user 3
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Lorin Kalemi");
        cy.wait(2000);
        cy.get(".new-channel-full-screen__user-search-results .title").click();

        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Roy Cockram");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Jason Peitli");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Lorin Kalemi");
        
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "andy");

        
        cy.get(".new-channel-full-screen__selected-users-container > div:nth-child(3) > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > span").eq(0).click();
        cy.get(".new-channel-full-screen__selected-users-container > div:nth-child(2) > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > span").eq(0).click();
        cy.get(".new-channel-full-screen__selected-users-container > div:nth-child(1) > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > span").eq(0).click();
        
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "Roy Cockram");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "Jason Peitli");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "Lorin Kalemi");
        cy.get('ux-dialog-header > :nth-child(2)').click();

       
    });


	it("clicking the create group chat button will save and create a new group chat", () => {
        createGroup();

	
    });

    // BroadCast //

	it("Broadcast Pannel - clicking a searched for user will add a checkbox to it - verify checkbox is ticked",  () => {
        openNewChatBroadcastPanel();
        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy cockram");

        cy.get(".new-channel-full-screen__user-search-results .title").click();
    
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");
        cy.get('ux-dialog-header > :nth-child(2)').click();
	
    });


    it("Broadcast Pannel - typing in the search box filters users by first name", () => {
        openNewChatBroadcastPanel();

        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");

        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");

        cy.wait(250);

        cy.get(".new-channel-full-screen__user-search-results .title").should("contain", "Roy");
        cy.get('ux-dialog-header > :nth-child(2)').click();
    });


    it("Broadcast Pannel - typing in the search box filters users by full name", () => {
        openNewChatBroadcastPanel();
        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Roy cockram");

        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > checkbox").eq(0).find(".au-target").should("be.visible");

        cy.wait(250);

        cy.get(".new-channel-full-screen__user-search-results .title").should("contain", "Roy Cockram");
        cy.get('ux-dialog-header > :nth-child(2)').click();

    });

    it("Broadcast Pannel - clicking a searched for user will add it to the audience list", () => {
        openNewChatBroadcastPanel();

        var name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);

		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");

        cy.get(".new-channel-full-screen__user-search-results .title").click();

        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Roy Cockram");
        cy.get('ux-dialog-header > :nth-child(2)').click();
       
    });


    it("Broadcast Pannel -  clicking a searched for multiple (3) user will add it to the audience list and Also Delete them", () => {
        openNewChatBroadcastPanel();

        //name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);
        //user 1
		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");
        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        //user 2
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("jason Peitli");
        cy.wait(2000);
        cy.get(".new-channel-full-screen__user-search-results .title").click();
        cy.wait(200);
        //user 3
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Lorin Kalemi");
        cy.wait(2000);
        cy.get(".new-channel-full-screen__user-search-results .title").click();

        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Roy Cockram");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Jason Peitli");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Lorin Kalemi");
        
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "andy");

        
        cy.get(".new-channel-full-screen__selected-users-container > div:nth-child(3) > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > span").eq(0).click();
        cy.get(".new-channel-full-screen__selected-users-container > div:nth-child(2) > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > span").eq(0).click();
        cy.get(".new-channel-full-screen__selected-users-container > div:nth-child(1) > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__right.au-target > div > div > div > span").eq(0).click();
        
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "Roy Cockram");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "Jason Peitli");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("not.have.value", "Lorin Kalemi");
        cy.get('ux-dialog-header > :nth-child(2)').click();
        
       
    });


	it("clicking the create group chat button will save and create a new Broadcast", () => {
        openNewChatBroadcastPanel();

        //name = makeid();
        cy.get(
            "body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
        ).type(name+"_auto-test");
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
            .eq(0)
            .click();
        cy.wait(200);
        //user 1
		cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("roy");
        cy.get(".new-channel-full-screen__user-search-results .title").click();
     
        //user 2
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("jason Peitli");
        cy.wait(2000);
        cy.get(".new-channel-full-screen__user-search-results .title").click();
        cy.wait(200);
        //user 3
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Lorin Kalemi");
        cy.wait(2000);
        cy.get(".new-channel-full-screen__user-search-results .title").click();
      
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Roy Cockram");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Jason Peitli");
        cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "Lorin Kalemi");
        cy.contains('Create').click() 
    });

    //Individual Chat (One to One)
   
    it("Individual chat - validate the search feild - select and send message", () => {
        openNewIndividualChatPanel();
        cy.get(".new-channel-selection").should("be.visible");
        cy.get("#channel-sidebar > compose:nth-child(2) > div > div > div.new-channel__header > div.header__back-button.au-target > span").click();
        cy.wait(1000);
        cy.get(".new-channel-selection").should("not.be.visible");
      
        openNewIndividualChatPanel();

        cy.get("#channel-sidebar > compose:nth-child(2) > div > div > div.new-channel-full-screen__user-search-filter > div > input").type("Mondal");
        cy.get(".new-channel-full-screen__user-search-results > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__middle > div.content-block__top.font-large > div > div.title").should("contain", "Andy Mondal");
        cy.get(".new-channel-full-screen__user-search-results > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content").click();
        cy.wait(1000);
        sendMessage('test the test_01');
    });


    // Invite with Email ID and send a message
    it("Invite with Email address and send a message", () => {
        openNewInviteChatPanel();
        cy.get("#channel-sidebar > new-contact > div > div.new-contact__search-header > input").type("cchat_user1@clarksons-test-user.com");
        cy.get("#channel-sidebar > new-contact > div > div:nth-child(3) > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content").click();
        sendMessage('test individual chat 03');
    });







  

  








    
function openNewChatBroadcastPanel() {
	cy.get(".channels-stage__header-actions > :nth-child(1)", {
		force: true
	}).click();
	cy.get(".context-menu__content button").eq(2).click();
}

    
    function openNewGroupChatPanel() {
        cy.wait(900);
        cy.get(".channels-stage__header-actions > :nth-child(1)", {
            force: true
        }).click();
        cy.get(".context-menu__content button").eq(1).click();
        cy.wait(900);
    }

    function openNewIndividualChatPanel() {
        cy.wait(900);
        cy.get(".channels-stage__header-actions > :nth-child(1)", {
            force: true
        }).click();
        cy.get(".context-menu__content button").eq(0).click();
        cy.wait(900);
    }

    
    function openNewInviteChatPanel() {
        cy.wait(900);
        cy.get(".channels-stage__header-actions > :nth-child(1)", {
            force: true
        }).click();
        cy.get(".context-menu__content button").eq(3).click();
        cy.wait(900);
    }


 

    function opencheckno() {
    cy.get('ux-dialog-header > :nth-child(2) > .has-icon').then(($btn) => {
        if ($btn.hasClass('modal-dialog__header font-large')) {
        cy.log('YES')
        } else {
        cy.log('NO')
        }
      })
    }
  

});
