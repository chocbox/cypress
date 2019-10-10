/// <reference types="cypress" />

let token;

export function getToken(username, password) {
    token = token || {};

    username = (username || Cypress.env("AdminUser"));
    password = (password || Cypress.env("AdminPassword"));

    if (!token[username]) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", `${Cypress.env("CloudBaseUrl")}/api/1_1/Security/GetLoginToken?Username=${username}&Password=${password}`, false);
         //xmlHttp.open("GET", `https://cloud.test.clarksons.com/api/1_1/Security/GetLoginToken?Username=${username}&Password=${password}`, false);
         xmlHttp.send(null);

        //token[username] = encodeURIComponent(JSON.parse(xmlHttp.responseText).LoginToken);
        token[username] = decodeURIComponent(JSON.parse(xmlHttp.responseText).LoginToken);
    }
   // cy.log('TEST', token[username]);
    return token[username];
}