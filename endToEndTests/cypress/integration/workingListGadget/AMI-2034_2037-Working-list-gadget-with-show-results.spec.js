// Work list gadget with show results dropdown Test Cases from AMI-2034:41 to AMI-2037:44

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget with Show Results DropDown", function() {

    let workListGadgetValue =  amiValue.workListGadget; 
    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work list gadget with show results dropdown");
    
    });
    
    /* Click on Show results drop down.  */
    it("AMI-2034:41, The show results drop down should consists of: Always,Only when there are errors,Never options.", function() {
        
        cy.start('AMI-2034:41');
        
        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Worksapce to "+ amiValue.amiLogin.workListGadget);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);
        cy.addLog(amiValue.amiLogin.workListGadget +" Changed Successfully");
 
        // Open WorkList Gadget
        cy.addLog("Open "+ amiValue.anyGadget.workListGadget);
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);
        cy.addLog(amiValue.anyGadget.workListGadget +" Opened Successfully");

        // Should dipslay show results dropdown
        cy.get(workListGadgetDom.showResultsDropDown).should('exist');
        cy.addLog("Should Display Show Results DropDown");

        // should consist of Always value
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsAlways)
        .should('have.value', 'always_show');

        // Should consist of Only when there are errors
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsOnlyErrors)
        .should('have.value', 'only_show_errors');

        // Should consist of Never
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsNever)
        .should('have.value', 'never_show');
        cy.addLog("Apply List DropDown Should have all Values");

        cy.finish('AMI-2034:41');
        
    });

    /* Select 'Always' in Show result drop down. */

    it("AMI-2035:42, Should display result in all cases.", function() {

        cy.start('AMI-2035:42'); 
        
        // should consist of Always value
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsAlways)
        .should('have.value', 'always_show');
        cy.addLog("Select Show Results DropDown Has Value : "+ workListGadgetValue.showResultsAlways);

        cy.finish('AMI-2035:42');


    });

    /* Select 'Only when there are errors' in Show result drop down. */

    it("AMI-2036:43, Should display result screen when there are errors.", function() {

        cy.start('AMI-2036:43');

        // Should consist of Only when there are errors
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsOnlyErrors)
        .should('have.value', 'only_show_errors');
        cy.addLog("Select Show Results DropDown Has Value : "+ workListGadgetValue.showResultsOnlyErrors);

        cy.finish('AMI-2036:43');


    });

    /* Select 'Never' in Show result drop down. */

    it("AMI-2037:44, No result screen should be displayed.", function() {

        cy.start('AMI-2037:44');

        // No result screen should be displayed
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsNever)
        .should('have.value', 'never_show');
        cy.addLog("Select Show Results DropDown Has Value : "+ workListGadgetValue.showResultsNever);

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-2037:44');
 
    });

});




