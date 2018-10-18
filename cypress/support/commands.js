// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


// This caused problems with tests getting faced with an Invalid Session message instead of a login page. Disable for now.
//Cypress.LocalStorage.clear = function () {
//    /*
//    WAVE-5182 - https://github.com/cypress-io/cypress/issues/461#issuecomment-325402086
//        Overriding this Cypress function stops the Local Storage being cleared in between tests (which breaks our sessions)
//        There may be other unexpected effects caused by this, but as AMI sometimes starts with cleared local sessions we want 
//        it to cope regardless, clearing it between tests doesn't reflect AMI real world use.
//    */
//};

/*
    filters a selection of elements to one which contains text that matches 'textToMatch' exactly. 
    NOTE: it doesn't 'find' but filters the results of a select.
          So if you want to find an element like <div class='detail'>#Hello#</div>
          you should call cy.get('div.detail').exactText('#Hello#');
          trim was added to cope with mark-up with spaces appended.
*/
Cypress.Commands.add('exactText', {prevSubject: true}, (subject, textToMatch, options) => 
    subject.filter((index, element) => element.textContent.trim() === textToMatch, options));

/*
    Opens The Gadget Hamburger Menu belonging to the 'subject' element passed in.
*/
Cypress.Commands.add('openGadgetHamburger', {prevSubject: true}, (subject) => 
    cy.wrap(subject, {log: false}).closest('.ws-gadget-holder', {log: false}).find('span.ws-hamburger-menu', {log: false}).click().
            then(() => cy.get('ul.ws-menu-container', {log: false})));

/*
    Gets a Hamburger Menu Item for the Gadget that the subject element belongs to.
    The result can then be clicked, or examined for state.
    eg: check a checkbox and then click on the gadgets Delete Menu Item
        cy.get('input[type="checkbox"]).getGadgetHamburgerMenuItem('Delete').click();

    eg: check a menu item is disabled
        cy.get('input[type="checkbox"]).getGadgetHamburgerMenuItem('Unlink').should('be.disabled');
*/
Cypress.Commands.add('getGadgetHamburgerMenuItem', {prevSubject: true}, (subject, menuItemText) => 
    cy.log(`Opening Hamburger Menu - ${menuItemText}`).
    wrap(subject, {log: false}).
        openGadgetHamburger().
        find('span.ws-context-menu-title').
            exactText(menuItemText).
            should("be.visible", `Expected To Find A Menu Option Named '${menuItemText}'`));

Cypress.Commands.add('addLog', function(logtoAppend, status) {
    if(status === "pass"){
        logtoAppend = logtoAppend + " " +"Test Execution is Started"
    } else if(status === "fail"){
        logtoAppend = logtoAppend + " " +"Test Execution is Finished Successfully"
    }
    cy.readFile('cypress/logReport.txt').then(str => {
        if (str === '') {
        var x = new Date().toLocaleString();
        str = `${x} : ${logtoAppend}`;
        } else {
        var x = new Date().toLocaleString();
        str = `${str} \n${x} : ${logtoAppend}`;
        }
        cy.writeFile('cypress/logReport.txt', str);
    });
});

Cypress.Commands.add('logHeader', function(heading) {
    
        cy.readFile('cypress/logReport.txt').then(str => {
          if (str === '') {
            str = `Test Scenario : ${heading}`;
          } else {
            str = `${str}\n\nTest Scenario : ${heading}`;
          }
          cy.writeFile('cypress/logReport.txt', str);
        });

});

Cypress.Commands.add('start', function(logtoAppend){
    cy.addLog(logtoAppend, "pass");
})

Cypress.Commands.add('finish', function(logtoAppend){
    cy.addLog(logtoAppend, "fail");
})