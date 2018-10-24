// Work list gadget Test Cases with apply to list dropdown from AMI-2024:31

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const workSpaceEditorUtils = require('../../utils/ravi_utils/workspaceEditorUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Work list gadget Test Cases with apply to list dropdown", function() {

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work List Gadget with apply to list dropdown");
    
    });

    /* 1.Select a List structure which does not have any child object in 'List Structure to store search results' 
       field for working list gadget in Edit workspace window. 
       2.Save the workspace.
    */

    it("AMI-2024:31, 'Selected list object has no children' message should be displayed and Apply to list, "+ 
       "Copy descendants, Show result option should not be present.", function() { 

        cy.start("AMI-2024:31");

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
        cy.addLog(amiValue.anyGadget.workListGadget+ " Opened Successfully");

        // Open Browse Gadget
        cy.get(amiDom.workListGadget.browserIcon).click();
        cy.addLog("Open Browser and Displaying Contents");

        // Select Lists
        browserGadgetUtils.setStructureType(amiValue.anyGadget.list);
        cy.addLog('Select List Displaying all Objects');

        // Select vQADBASE From lists
        browserGadgetUtils.setBrowseContext(amiValue.workListGadget.vQADBASE);
        cy.addLog("Select Object has no Children : "+ amiValue.workListGadget.vQADBASE);

        // Edit current workspace
        changeDropdownUtils.openWorkspaceEditor();
        cy.addLog("Edit Workspace");

        // Open Working List
        cy.addLog("Open Working List");
        cy.get(amiDom.workListGadget.workingListWindow).click();
        cy.addLog("Displaying all Available Options in Working List");

        cy.get(amiDom.workListGadget.workingListObjectId).clear().type(amiValue.workListGadget.vQADBASEID);
        
        // Uncheck 'Can create new lists'
        cy.get(amiDom.workListGadget.workingListCreateNewListCheckbox).uncheck();
        cy.addLog("Uncheck On Create New List ");

        // Click ok to save Index Menu Options
        workSpaceEditorUtils.closeWorkspaceEditor();
        cy.addLog("Save Workspace");

        // Should display Selected list object has no children messge
        cy.contains(amiValue.workListGadget.error1275).should('be.visible');
        cy.addLog("Displaying Error : "+ amiValue.workListGadget.error1275);
        cy.log("Displaying 1275 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        // Apply to list,Copy descendants,Show result option should not be present.
        cy.get(amiDom.workListGadget.applyListDropDown).should('not.be.visible');
        cy.get(amiDom.workListGadget.copyDescendantsCheckbox).should('not.exist');
        cy.get(amiDom.workListGadget.showResultsDropDown).should('not.be.visible');
        cy.addLog("Close Error, Should not Exit Apply List, Copy Descendants & Show Results");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");
        
        cy.finish("AMI-2024:31")
    });
});