// Work list gadget with show results dropdown Test Cases from AMI-2034:41 to AMI-2049:56

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
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);

        // Open WorkList Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);

        // Should dipslay show results dropdown
        cy.get(workListGadgetDom.showResultsDropDown).should('exist');

        // should consist of Always value
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsAlways).should('have.value', 'always_show');

        // Should consist of Only when there are errors
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsOnlyErrors).should('have.value', 'only_show_errors');

        // Should consist of Never
        cy.get(workListGadgetDom.showResultsDropDown).select(workListGadgetValue.showResultsNever).should('have.value', 'never_show');

        // logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-2034:41');
        
    });
});



