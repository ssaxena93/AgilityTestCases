// Work list gadget Test Cases with apply to list dropdown from AMI-2024:31 to AMI-2033:40

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Work list gadget Test Cases with apply to list dropdown", function() {

    let workListGadgetValue =  amiValue.workListGadget; 
    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work list gadget with list of objects");
    
    });
    
    /* Click on 'Apply to list' drop down. */
    it("AMI-2026:33, Apply to list drop down should display all the child objects under the selected list structure.", function() {

        cy.start('AMI-2026:33');

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);

        // Open WorkList Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);

        // Should Exist Apply to list DropDown
        cy.get(workListGadgetDom.applyListDropDown).should('exist');

        // Should consist of Child objects
        cy.get(workListGadgetDom.applyListDropDown).select(workListGadgetValue.workListChild1).should('have.value', "27568-37596-37597");
        cy.get(workListGadgetDom.applyListDropDown).select(workListGadgetValue.workListChild2).should('have.value', "27568-37596-37598");

        // logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-2026:33');
        
    });
});