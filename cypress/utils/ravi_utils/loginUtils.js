const changeDropdownUtils = require('./changeDropdownUtils');

// AMI Data Values File
const amiValue = require('../../fixtures/amiDataValue');

// AMI DOM Elements File
const amiDom = require('../../fixtures/amiDomElements')

/**
 * Utility function to log into AMI. Assumes the user has the standard password.
 * @param {string} userName - Name of the user to login as. If an alternative username is supplied in cypress.env.json, that will be used instead unless allowUserNameOverride is false.
 * @param {boolean} allowUserNameOverride - If false, any alternative username supplied in cypress.env.json will be ignored.
 */
function loginToAMI(userName, allowUserNameOverride = true) {
    if (allowUserNameOverride) {
        const alternativeUserName = Cypress.env('userName');

        if (alternativeUserName) {
            userName = alternativeUserName;
        }
    }

    // See if Cypress was launched with an 'indexFile' environment variable set (e.g. by openCypress.ps1). If not, default to using 'index.html'.
    let indexFile = Cypress.env('indexFile') || 'index.html';

    // These make life easier for automated tests on login and logout.
    indexFile += '?silentExit=true&forceLogin=true';

    // If using AMI Launcher, this environment variable lets you specify a different instance of Agility Server.
    const alternativeServer = Cypress.env('agilityServer');
    if (alternativeServer) {
        indexFile += `&server=${alternativeServer}`;
        cy.log('Will connect to the alternative server called ' + alternativeServer);
    }

    cy.visit(indexFile);
  
    //cy.visit(amiValue.amiLogin.visit);

    cy.get(amiDom.amiLogin.loginUsername).should('be.visible').then((login) => {
        cy.wrap(login).clear().type(userName).should('have.value', userName);
    });
    cy.get(amiDom.amiLogin.loginPassword).clear()
      .type(amiValue.amiLogin.password).should('have.value', amiValue.amiLogin.password)
      .type('{enter}');

    // Confirm that we can now see the workspace dropdown.
    cy.get(amiDom.amiLogin.ACMSWorkspaceSelectordropdown, {timeout: 30000}).should('exist');
};

/**
 * Utility function to log out of AMI.
 */
function logoutFromAMI() {
    changeDropdownUtils.selectUserOption(amiValue.amiLogin.logout);
}

module.exports = {
    loginToAMI: loginToAMI,
    logoutFromAMI: logoutFromAMI
};
