/// <reference types="cypress" />
import 'cypress-file-upload';
import { getToken } from "../services/user-service";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add("makeid", makeid);
Cypress.Commands.add("visitCChat", visitCChat);
Cypress.Commands.add("visitCtradePlugin", visitCtradePlugin);
Cypress.Commands.add("cleanUpXHR", cleanUpXHR);
Cypress.Commands.add("groupadmin", groupadmin);
Cypress.Commands.add("updateFixture", updateFixture);
Cypress.Commands.add("sendMessage", sendMessage);
Cypress.Commands.add("findMemberNoMessage", findMemberNoMessage);
Cypress.Commands.add("getCurrentChannelID", getCurrentChannelID);
Cypress.Commands.add("XHRimageUpload", XHRimageUpload);
Cypress.Commands.add("findMemberAssertTop", findMemberAssertTop);
Cypress.Commands.add("findMemberBroadcast", findMemberBroadcast);

























export function makeid() {
	var text = "";
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

export function visitCChat(username, password) {
	username = username || Cypress.env("AdminUser");
	password = password || Cypress.env("AdminPassword");

	// var visitChainable = cy.visit(
	// 	"?disablenavigation=1&token=" + getToken(username, password),
	var visitChainable = getToken(username, password)
	
	// 	{
	// 		failOnStatusCode: false,
	// 		onBeforeLoad: win => {
	// 			// switch off fetch for all tests so that the browser uses the fallback XHR
	// 			win.fetch = null;
	// 			win.onerror = null;
	// 		}
	// 	}
	// );
	if (window.Cypress) {
		window.appReady = true;
	}
	while (window.appReady !== true) {
		sleep(5000);
	}
	return visitChainable;
}


export function visitCChatDirect(username, password) {
	username = username || Cypress.env("AdminUser");
	password = password || Cypress.env("AdminPassword");
	
	//test
	var visitChainable = cy.visit('https://cchat-test.clarksons.com/');
	//staging
	//var visitChainable = cy.visit('https://cchat-staging.clarksons.com/');
	//hotfix
	//var visitChainable = cy.visit('https://asset21420.clarksons.co.uk:3001/src/desktop/');
	cy.get('#login > form > div:nth-child(1) > input').type(username)
	cy.get('#login > form > div:nth-child(2) > input').type(password);
	cy.get('#login > form > div.button-holder > button').click();


}


export function visitCChatDirect_user(usr) {


	switch(usr) {
		case "main":
				var username =  Cypress.env("AdminUser");
				var password =  Cypress.env("AdminPassword");				 
		  break;
		case "a":
				var username = Cypress.env("AdminUser01");
				var password = Cypress.env("AdminPassword01");
			
		  break;
		  case "b":
				var username = Cypress.env("AdminUser02");
				var password = Cypress.env("AdminPassword02");
		  break;
		  case "c":
				var username = Cypress.env("AdminUser03");
				var password = Cypress.env("AdminPassword03");
          break;
		  case "andy":
				var username = Cypress.env("AdminUser02");
				var password = Cypress.env("AdminPassword02");

				case "incorrect":
				var username = Cypress.env("AdminUser03");
				var password = Cypress.env("AdminPassword03");

		default:
		  // code block
	  }
  
    //test
	 var visitChainable = cy.visit('https://cchat-test.clarksons.com/');
	//staging
	//var visitChainable = cy.visit('https://cchat-staging.clarksons.com/');

	//hotfix
	//var visitChainable = cy.visit('https://asset21420.clarksons.co.uk:3001/src/desktop/');
	cy.get('#email').should('be.visible').type(username)
	cy.get('#continueButton').should('be.visible').click();
	cy.get('#password').should('be.visible').type(password);
	cy.get('#loginButton').should('be.visible').click();
	
	
	  


	cy.server();
	cy.route("GET", "/config/config.json").as("getConfig.json");
	cy.wait("@getConfig.json")

	cy.route("GET", "/API/1_4/Security/GetCurrentUser").as("getCurrentUser");
	cy.wait("@getCurrentUser")

	cy.hash('#/unicomms/messaging/channel/**').as ('newURL')
	//cy.wait('@newURL')
	
  


}


export function visitCtradePlugin(username, password) {
	username = username || Cypress.env("AdminUser");
	password = password || Cypress.env("AdminPassword");

	var visitChainable = cy.visit(
		"https://cchat-test.clarksons.com/#/unicomms/messaging/channel/C.D1.SVCT2X3FZ4?disableleftsidebar=1&disablenavigation=1&disablerightsidebar=1&externalcss=https://ckncdnlive.azureedge.net/Data/CTrade/chat.css&token=" +
		getToken(username, password),
		{
			failOnStatusCode: false,
			onBeforeLoad: win => {
				// switch off fetch for all tests so that the browser uses the fallback XHR
				win.fetch = null;
				win.onerror = null;
			}
		}
	);

	return visitChainable;
}

export function cleanUpXHR() {
	cy.visit("/404", {
		failOnStatusCode: false
	});
}



export function createGroup() {

	

	cy.get(".channels-stage__header-actions > :nth-child(1)", {
		force: true
	}).click();
	cy.get(".context-menu__content button").eq(1).click();

	var name = makeid();
	cy.get(
		"body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
	).type(name);

	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
		.eq(0)
		.should('be.visible')
		.click();
	


	
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type('Seachat_user1@clarksons-test-user.com');
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__middle > div.content-block__bottom > div > div")
	.eq(0).should('be.visible')
	.click();
	cy.contains('Create').click().sync();
	return name;
}

export function createGroupMultiple(index) {
	cy.get(".channels-stage__header-actions > :nth-child(1)", {
		force: true
	}).click();
	cy.get(".context-menu__content button").eq(index).click();
	var name = makeid();
	cy.get(
		"body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
	).type(name+"_auto-test");
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
		.eq(0)
		.click();
	    cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("andy.mondal@sea.live");
        cy.get(".new-channel-full-screen__user-search-results .title").should('contain', 'Andy Mondal').click();
     
        //user 2
        cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("cchat_user2@clarksons-test-user.com");
        cy.get(".new-channel-full-screen__user-search-results .title").should('contain', '2CChat 0User').click();
	   
		//user 3
       // cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Lorin.Kalemi@sea.live");
	   //cy.get(".new-channel-full-screen__user-search-results .title").should('contain', 'Lorin').click();

		 //user 4
		 cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Seachat_user1@clarksons-test-user.com");
		 cy.get(".new-channel-full-screen__user-search-results .title").should('contain', 'CChat1 1User').click();

	     //user 5
		 cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Seachat_user2@clarksons-test-user.com");
		 cy.get(".new-channel-full-screen__user-search-results .title").should('contain', 'CChat2 2User').click();
		
	cy.contains('Create').click();
	cy.contains('Create', { timeout: 7000 }).should('not.be.visible');
	return name;
}


export function createIndividualChat() {
	cy.get(".channels-stage__header-actions .icon--plus", {
		force: true
	}).click();
	cy.wait(900);
	cy.get(".context-menu__content button").eq(1).click();
	cy.wait(900);
	var name = makeid();
	cy.get(
		//"#new-group-chat .new-channel-full-screen__user-search-filter input"
		"body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
	).type(name+"_auto-test");
	cy.wait(500);
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
		.eq(0)
		.click();
	cy.wait(2000);
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type(
		"Andy"
		);
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-results.custom-scrollbars > user-search > div > contact-summary-block > content-block-with-icon > content-block > div > div.content-block__content > div.content-block__middle > div.content-block__bottom > div > div")
	.eq(0).wait(5000)
	.click();
	cy.wait(9000);
	//cy.get(".icon--more-vert")
	cy.contains('Create').click() 
	return name;
}
export function createBroadcast() {
	cy.get(".channels-stage__header-actions > :nth-child(1)", {
		force: true
	}).click();
	cy.get(".context-menu__content button").contains('New Broadcast').should('be.visible').click();

	var nameO = makeid();
	cy.get(
		"body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(1) > div > div > div.name-step__input-box.font-large > input"
	).type(nameO);
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-footer > div > button:nth-child(3)")
		.eq(0)
		.click();
	cy.wait(200);
	//user 1
	cy.get("body > ux-dialog-container > div > div > ux-dialog > wizard > div > ux-dialog-body > wizard-step:nth-child(2) > div > div > div.add-members-step__container__select > div > div.new-channel-full-screen__user-search-filter > div > input").type("Seachat_user1@clarksons-test-user.com");
	cy.get(".new-channel-full-screen__user-search-results .title").click();
 
	
	cy.get(".new-channel-full-screen__selected-users-container .title").should("contain", "1User");
	cy.contains('Create').click() 
	return nameO;
}


export function sendMessage(customeText){
    cy.get('.ql-editor').should('be.visible');
	cy.get('.ql-editor').should('have.attr', 'contenteditable', 'true')
	cy.get('.ql-editor').type(customeText);	
	cy.get('#send-message-button > span').should('be.visible').click().sync();

}


export function findIndividual(user){

	cy.get("#channel-users__search-input").should('be.visible')
	cy.get('#channel-users__search-input').type(user);
	cy.wait(4000);
	cy.get('.channels-stage__search');
	cy.get('.collapsable-row').eq(2).should('be.visible');
	

	cy.get(".channels-stage__search .collapsable-row").eq(2)
	.each(($elm, index) => {
		cy.wrap($elm).invoke('show').then((text) => {
		cy.log(text); 
		cy.log($elm); 
			  if (text.hasClass('is-open')) {
				cy.log('OPEN');  
				cy.get('.collapsable-row.is-open').should('be.visible');
				cy.get(".collapsable-row").eq(2).click();
				
		      return;
			  } 
			  else{
				cy.log('CLOSE');
				cy.get('.channels-stage__search').get(".collapsable-row").eq(2).click();
				cy.get('.collapsable-row.is-open');
				cy.get(".collapsable-row").eq(2).click().sync();
		}    
	  })
	  })   


	//cy.get(".collapsable-row").eq(2).click().should('contain', '1User');

}



export function findIndividual_New(user){

	cy.get("#channel-users__search-input").should('be.visible')
	cy.get('#channel-users__search-input').type(user);

	cy.server()
		 cy.get('.channels-stage__search .channel-user-search:last-child collapsable-row:last-child .collapsable-row__content .user-search').should('be.visible').click();

		 cy.route("/#/unicomms/messaging/channel/**").as("userload")
			 cy.location('href').should('contain', 'channel')
	
}


export function addIndividualMember(memeber){
	cy.get('#add-new-members').click();
	cy.get('.modal-dialog__column__header > input.au-target').clear().type(memeber);
	
	

	cy.get('body > ux-dialog-container > div > div > ux-dialog > ux-dialog-body > div > div.modal-dialog__column.modal-dialog__column--search > div.modal-dialog__column__content > div')
	.then(function(any){
		if(any.hasClass('disabled')) {
		}else{
			cy.get(any).click();
		}
	}
	
	);
	
	
			cy.get('button-with-loader.au-target').then((elem) => {
			cy.wrap(elem).invoke('text').then((text) => {
		    cy.log(elem.text());
			if (text.includes('(0)')){
			cy.get('.button--clear').click();
			return;
			}
			else {
			cy.get('button-with-loader.au-target').click();
			}
		
		});
	})   
}

export function removeIndividualMember(member){
cy.get('.au-target.channel-member__details > div.channel-member__details-name > span')
.each(($elm, index) => {
  cy.wrap($elm).invoke('text').then((text) => {
  cy.log(index); 
  cy.log(text); 
		if (text.includes(member)) {
  cy.get('chat-member.au-target > .channel-member > .channel-member__details > .channel-member__details-name').eq(index).get('.action >  chat-member-context-menu > button-triggered-context-menu > div > div > button').eq(index).click({ force: true })
  cy.get('body > div > div > button:nth-child(2)').click();
  cy.sync().get('.text-notification').should('contain', 'You removed '+member);
  return;
		} 
		else{
  cy.log(member+'  Not Found')
  cy.log(text); 
  }    
})
})   
}


//Cypress.Commands.add('groupadmin', ({state, member}) => {
//Cypress.Commands.add('groupadmin',{prevSubject: true},  (state, member) => {
export function groupadmin(state, member){


	switch(state) {
		case "add":
				var item =  'Set as Group Admin'; 
		  break;
		case "remove":
				var item = 'Remove as Group Admin';
		  break;
		default:
	}



cy.get('.au-target.channel-member__details > div.channel-member__details-name > span').should('be.visible')
.each(($elm, index) => {
  cy.wrap($elm).invoke('text').then((text) => {
  cy.log(index); 
  cy.log(text); 
  if (text.includes(member)) {
  cy.get('chat-member.au-target > .channel-member > .channel-member__details > .channel-member__details-name').should('be.visible')
  .eq(index).get('.action >  chat-member-context-menu > button-triggered-context-menu > div > div > button').eq(index).click({ force: true })
  cy.contains(item).click();
  cy.wait(2000)
  } 
  else{
  cy.log(index)
  cy.log(text); 
  }    

})
})
}









export function findGroup(user){
	cy.get('#channel-users__search-input').type(user);
	cy.wait(2000);
	cy.get('.channels-stage__content.custom-scrollbars.au-target > div > global-search > div:nth-child(2)').click().get('collapsable-row:nth-child(2)').click();

}
export function replyIndividualLastestChat(reply){
	  
	cy.get('.messages-controller__message-container:last-child .desktop-message-context-menu .button').click()                                                                       
    cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
    sendMessage(reply);
}

export function messageContain(msg){
	cy.wait(1000)
      cy.get('.messages-controller__message-container:last-child').should('be.visible');
}


export function findMember(member){
cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div')
.each(($elm) => {
  cy.wrap($elm).invoke('text').then((text) => {
			  if (text.includes(member)) {
			  cy.wrap($elm).should('be.visible').click();
			  //cy.get
			  sendMessage('Testing Testing == Test Testing  == Testing')
			  return;
			  } 
			  else{
				//   cy.log('NO MEMBER AVAILABLE')
				//   findIndividual(member)

			  }
})
})

}

export function findMemberNoMessage(member){
	cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div').should('be.visible')
	//cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div')
	.each(($elm, index) => {
	  cy.wrap($elm).invoke('text').then((text) => {
		cy.log(text); 
				  if (text.includes(member)) {
					cy.wrap($elm).should('be.visible').click();
				 return;
				  } 
				  else{
			
				  }
	})
	})
	
	}



	

	export function findMemberAssertTop(member){

	
		cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div').eq(0).should('be.visible')
	    cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div').eq(0)
		.each(($elm, index) => {
		  cy.wrap($elm).invoke('text').then((text) => {
			cy.log(text); 
			cy.wrap(text).should('contain', member);
		})
		})
		
		}
	
	
	



export function topTenMessageReady(){
    let i;
	for(i= 10; i<=4; i++){
 	let path =  "#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div:nth-child("+i+")"
    cy.get(path).click();  
  }
	}

export  function findMemberLatestMessage(member){
	cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div')
	.each(($elm) => {
	  cy.wrap($elm).invoke('text').then((text) => {
		cy.log(text); 
				  if (text.includes(member)) {
				  cy.log(text);
				  return;
				  } 
				  else{
					cy.log($elm)
				  }
	})
	})
	}

	
export function findMemberBroadcast(member){

	cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(2) > div > div > div')
	.each(($elm) => {
	  cy.wrap($elm).invoke('text').then((text) => {
		cy.log(text); 
				  if (text.includes(member)) {
				  cy.wrap($elm).should('be.visible').click();
				  //sendMessage('Testing ==  Testing  ==  Testing  == Testing')
				  return;
				  } 
				  else{
					cy.log($elm)
				  }
	})
	})
	
	}


export function findMemberBroadcastNoMessage(member){
		cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(2) > div > div > div')
		.each(($elm) => {
		  cy.wrap($elm).invoke('text').then((text) => {
			cy.log(text); 
					  if (text.includes(member)) {
					  cy.wrap($elm).click();
					  cy.wait(2000)
					  return;
					  } 
					  else{
						cy.log($elm)
					  }
		})
		})
		
		}
	




export function scroller(length){
try{


	var i;
	for(i= 0; i<length; i++){
	  cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div').scrollTo('bottom');
	  cy.wait(1000);
	}

}catch(ex)
{

}

	
	for(i= 0; i<length; i++){
	  cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div').scrollTo('top');
	  cy.wait(1000);
	}
}


export function logout() {
	cy.wait(5000);
	cy.get('.sea__header-bar__user-profile > .sea-header--has-icon').click();
	cy.get('.sea__header-bar__icon-logout').click();
	//cy.get('.label-text').should("contain", "Remember");
}


export function SearchPanel(textSerach) {
	cy.wait(900);
	cy.get(".channels-stage__header-actions > :nth-child(1)", {
		force: true
	}).click();
	cy.get('#channel-users__search-input').eq(0).type(textSerach);
	cy.wait(900);
}

export function forward(findChat, sender) {
	
	findMemberNoMessage(findChat)
	cy.get('.ql-editor').should('be.visible');
	cy.get('.ql-editor').should('have.attr', 'contenteditable', 'true')
	cy.get('.ql-editor').type('    ');	

	cy.get('.messages-controller__message-container:last-child .desktop-message-context-menu .button').click()        
	cy.get('body > div:nth-child(n3) > div > button:nth-child(2)').click();
	cy.get('#member-selection-search-filter').type(sender)
	cy.wait(3000);
	cy.contains(sender).click();
	cy.get('button-with-loader > button').click()
	cy.wait(2000)
}


export function forwardLast(findChat, sender) {
	
	findMemberNoMessage(findChat)
	cy.get('.ql-editor').should('be.visible');
	cy.get('.ql-editor').should('have.attr', 'contenteditable', 'true')
	cy.get('.ql-editor').type('    ');	

	cy.get('.messages-controller__message-container:nth-last-child(2) .desktop-message-context-menu .button').click()        
	cy.get('body > div:nth-child(n3) > div > button:nth-child(2)').click();
	cy.get('#member-selection-search-filter').type(sender)
	cy.wait(3000);
	cy.contains(sender).click();
	cy.get('button-with-loader > button').click()
	cy.wait(2000)
}



export function forwardBot(findChat, sender) {
	
    findMemberNoMessage(findChat)
	cy.get('.messages-controller__message-container:last-child .desktop-message-context-menu .button').click();
	cy.get('body > div:nth-child(n3) > div > button:nth-child(1)').click();
	cy.get('#member-selection-search-filter').type(sender)
	cy.wait(3000);
	cy.contains(sender).click();
	cy.get('button-with-loader > button').click()
	cy.wait(2000)
}




export function messageSender(authToken, senderUserToken, recipientUserId) {
	cy.server();
	cy.request({
		method: 'POST',
		url: 'https://cchat-test.clarksons.com/api/test/servicebus/thirdpartymessages',
		headers: {
		  'Authorization': authToken,
		  'Content-Type': 'application/json',
		},
		body: {
			"senderUserToken": senderUserToken,
			"recipientUserId": recipientUserId,
			"messageText": "Laws of science or scientific laws are statements that describe or predict a range of natural phenomena."

		}
	  }).then(response => {
		const target = (response.body)
		console.log(target);
		scroller(2);
		cy.get('#channel-sidebar > chat-navigation > div > div:nth-child(4) > div > channel-virtual-repeat:nth-child(1) > div > div > div:nth-child(1)').should('contain', '2User');

		
	  })
}






      
export function openImportContacts() {
	cy.wait(900);
	cy.get(".channels-stage__header-actions > :nth-child(1)", {
		force: true
	}).click();
	cy.get(".context-menu__content button").eq(4).click();
	cy.wait(900);
}



export function VerifyForwardedTag(username){
	findMemberNoMessage(username)
	cy.get('.messages-controller__message-container:last-child .message-content-container').should('contain', 'Forwarded')

	}


export function imageUpload(){
	
	//cy.fixture('images/image.png').as('image')



	cy.fixture('image.png', 'base64').then(i => {
		this.image = i
	  })
      
     cy.get('.editable-chat-details.can-edit').then(async $input => {
       debugger;
        const blob = await Cypress.Blob.base64StringToBlob(image, 'image/png');
		 const imageFile = new File([blob], 'image.png', { type: 'image/png' });
		 const dataTransfer = new DataTransfer();
		 dataTransfer.items.add(imageFile);
		 $input[0].files = dataTransfer.files;
      })
}	


	
	export function timestamp(){
	  var start = Date.now();
	  return start;
	}

Cypress.Commands.add("session", () => {
    return cy.request({
      method: 'POST',
      url: '/auth/',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "client_secret" : ""+config.clientSecret_staging,
        "username": ""+config.email_staging,
        "password": ""+config.password_staging
      }
    }).then(response => {
      const target = (response.body)
    })
  })





Cypress.Commands.add("sync", () => {
  cy.server()
	cy.route("POST", "https://dc.services.visualstudio.com/v2/track").as("sync");	
	cy.wait('@sync').then((xhr) => {
       expect(xhr.status).to.eq(200);
});
})




export function XHRimageUpload(chatID){
	cy.server()
	  cy.route("PUT", "https://cchat-test.clarksons.com/api/channel/"+ chatID).as("imageUpload");	
	  cy.log("https://cchat-test.clarksons.com/api/channel/"+ chatID)
	  cy.wait('@imageUpload').then((xhr) => {
		 expect(xhr.status).to.eq(200);
  });
  }




export function getCurrentChannelID (){
var restwo = null;	
	cy.url().then(url => {
		var restwo = null;
		var res = url.split("/")
		var restwo = res[7]
		cy.readFile('./cypress/fixtures/data.json').then((file) => {
		file.runtimechannelID = restwo;  
		cy.writeFile('./cypress/fixtures/data.json', file);
	
		
})
})

}

export function updateFixture(name, newvalue){

	cy.readFile('./cypress/fixtures/data.json').then((file) => {
		switch(name) {
			case "groupa":	 
				file.groupa = newvalue;  
			  break;
			case "groupb":
				file.groupb = newvalue;
			  break;
			  case "broadcasta":
				file.broadcasta = newvalue;
			  break;
			  case "groupaID":
					file.groupaID = newvalue;
			  break;
			  case "auth_token":
				file.auth_token = newvalue;
		 	 break;
		  		case "bot_token":
				file.bot_token = newvalue;
	  		break;
	 			 case "senderUserToken":
				file.senderUserToken = newvalue;
  			break;
			default:
		}
	cy.writeFile('./cypress/fixtures/data.json', file);

  })
}



export function assertContains(element, value){
  
	cy.server()
	cy.route("POST", "https://dc.services.visualstudio.com/v2/track").as("sync");	
	cy.wait('@sync').then((xhr) => {
	   expect(xhr.status).to.eq(200);
	   cy.get(element).should('contain', value);
});	
}


export function modifyChatName(Newname){
  
	
	//cy.get('#app-container > div.pages-messaging__home > div > side-panel > div > router-view > chat-details > div > div.channel-info_scrollable.custom-scrollbars > div.channel-info__block.channel-info__block-name > editable-chat-details > div > div.side-panel__header > div > div.au-target.content-block__content > div.content-block__right.au-target > div > button')
	cy.get('#app-container > div.pages-messaging__home > div > side-panel > div > router-view > chat-details > div > div.channel-info_scrollable.custom-scrollbars > div.channel-info__block.channel-info__block-name > editable-chat-details > div > div > div > div.au-target.content-block__content > div.content-block__right.au-target > div > button')
	.should('be.visible')
	.click();
	cy.get('body > ux-dialog-container > div > div > ux-dialog > ux-dialog-body > form > div > input')
	.should('be.visible')
	.clear().type(Newname);
	cy.get('body > ux-dialog-container > div > div > ux-dialog > ux-dialog-footer > div > button-with-loader > button').click();

	
	
}


export function clickOnChatByIndex(index){
	cy.get('.channel-virtual-repeat:first-child .item-container').eq(index).eq(0).click({force:true}).sync()
		
}





// cy.get('input[test]').then(function($input){
//     $input[0].setAttribute('test', 'my new value')
//   })
//   .should('have.attr', 'test', 'my new value')