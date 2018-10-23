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

/* 
    logger command : Add a log into logReport.txt file directly 
    logtoAppend: is the generally the test case name.
    status: can be start and finish. 
    If start, the log ends with "logtoAppend... Test Execution is Started"
    If end, the log ends with "logtoAppend... Test Execution is Finished Successfully".
    This method should not be directly used in test scripts, it is used in start and finish methods
    and intern start and finish commands call this command.
*/

Cypress.Commands.add('logger', function(logtoAppend, status) {
    if (status === 'pass') {
        logtoAppend = logtoAppend + ' ' + 'Test Execution is Started';
    }
    else if (status === 'fail') {
        logtoAppend = logtoAppend + ' ' + 'Test Execution is Finished Successfully';
    }

    // Reading the file logReport.txt and storing the file content in "str".
    // If nothing is present in the logReport, empty string will be there in "str" (""). 
    // Appending the new log to the "str" with the time stamp.
    cy.readFile('cypress/logReport.txt').then(str => {
        if (str === '') {
            var x = new Date().toLocaleString();
            str = `${x} : ${logtoAppend}`;
        } 
        else {
            var x = new Date().toLocaleString();
            str = `${str} \n${x} : ${logtoAppend}`;
        }
        // Overwriting the previously read content and new log(to be add to file).
        cy.writeFile('cypress/logReport.txt', str);
    });
});

/* 
    logHeader command : Add A log Header into logReport.txt file directly
    heading: Will the heading for the logs to follow.
    ex: cy.logHeader("Work list gadget with list of objects");
    o/p: Test Scenario : Work list gadget with list of objects 
*/

Cypress.Commands.add('logHeader', function(heading) {
    cy.task('fileCheck');
    cy.readFile('cypress/logReport.txt').then(str => {
        if (str === '') {
            str = `Test Scenario : ${heading}`;
        } else {
            str = `${str}\n\nTest Scenario : ${heading}`;
        }
        cy.writeFile('cypress/logReport.txt', str);
    });
});

/* 
    Start command: If you are adding log at the start of the test case to specify 
    the beginging of the test case use this method. Method will append the time stamp at the begining. 
    ex: 10/18/2018, 7:29:47 PM : AMI-2027:34 Test Execution is Started. 
*/

Cypress.Commands.add('start', function(logtoAppend) {
    cy.logger(logtoAppend, 'pass');
});

/* 
    Finish command: If you are adding log at the finish of the test case to specify 
    the end of the test case use this method. Method will append the time stamp at the begining. 
    ex: 10/18/2018, 7:29:59 PM : AMI-2027:34 Test Execution is Finished Successfully
*/
Cypress.Commands.add('finish', function(logtoAppend) {
    cy.logger(logtoAppend, 'fail');
});

/* 
    addLog() : addLog method used to generate logs for each and every step in between start() and finish() execution.
    Method will append the time stamp at the begining.
    ex: 10/18/2018, 7:29:47 PM : Trying to login
*/
Cypress.Commands.add('addLog', function(assertion) {
    cy.readFile('cypress/logReport.txt').then(str => {
        var x = new Date().toLocaleString();
        str = `${str} \n${x} : ${assertion}`;
        cy.writeFile('cypress/logReport.txt', str);
    });
});