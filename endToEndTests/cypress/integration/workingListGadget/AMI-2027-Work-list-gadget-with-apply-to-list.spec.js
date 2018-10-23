// Work list gadget Test Cases with apply to list dropdown from AMI-2027:34

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const workSpaceEditorUtils = require('../../utils/ravi_utils/workspaceEditorUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Work list gadget Test Cases with apply to list dropdown", function() {

    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work List Gadget with apply to list dropdown");
    
    });

    /* In the Edit workspace window of Working list gadget, check 'Can create new lists' and Save it. */

    it("AMI-2027:34, 'New' option should come up along with child objects in Apply to list drop down.", function() {

        cy.start('AMI-2027:34');

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

        // Edit current workspace
        changeDropdownUtils.openWorkspaceEditor();
        cy.addLog("Edit Workspace");

        // Open Working List 
        cy.get(amiDom.workListGadget.workingListWindow).click();
        cy.addLog("Open Working List Window");

        // check 'Can create new lists'
        cy.get(amiDom.workListGadget.workingListCreateNewListCheckbox).uncheck().check().should('be.checked');
        cy.addLog("Check On Create New List ");

        // Click ok to save Index Menu Options
        workSpaceEditorUtils.closeWorkspaceEditor();
        cy.addLog("Save Workspace");

        // Should Exist Apply to list DropDown
        cy.get(workListGadgetDom.applyListDropDown).select(amiValue.workListGadget.new)
        .should("have.value", amiValue.workListGadget.new);
        cy.addLog("Should Display Apply list DropDown Has new Value : "+ amiValue.workListGadget.new);

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-2027:34');

    });

});