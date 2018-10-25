// Work list gadget Test Cases with apply to list dropdown from AMI-2028:35 to AMI-2030:37

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

    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work list gadget with apply to list dropdown");
    
    });

    /* Select New option from 'Apply to list' drop down. */

    it("AMI-2028:35, Add object window should be displayed with Name field, "+ 
       "Add and then select checkbox with disabled Ok and enabled Cancel button.", function() {

        cy.start('AMI-2028:35');

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Workspace to "+ amiValue.amiLogin.workListGadget);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);
        cy.addLog(amiValue.amiLogin.workListGadget+ " Changed Successfully");

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
 
        // Select New option from Apply list Drop Down
        cy.get(workListGadgetDom.applyListDropDown).select(amiValue.workListGadget.new)
        .should("have.value", amiValue.workListGadget.new);
        cy.addLog("Select Apply list DropDown Value : "+ amiValue.workListGadget.new);

        // Open Browse Gadget
        cy.get(amiDom.workListGadget.browserIcon).click();
        cy.addLog("Open Browser and Displaying Contents");

        // Select Lists
        browserGadgetUtils.setStructureType(amiValue.anyGadget.list);
        cy.addLog('Select List Displaying all Objects');

        // Select QA List Test From lists
        browserGadgetUtils.setBrowseContext(amiValue.workListGadget.qaListTest);
        cy.addLog("Select Object has Children : "+ amiValue.workListGadget.qaListTest);

        // Select Browser menu icon
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.addLog("Select Browser Menu");

        // Select Add Object
        cy.contains(amiValue.workListGadget.browserAddObject).click();
        cy.addLog("Select "+ amiValue.workListGadget.browserAddObject)

        // Add object Window Should Displayed
        cy.contains(amiValue.workListGadget.AddObjectWindow).should('be.visible');
        cy.addLog("Displaying Add Object Window")

        // Should Consist of Name field
        cy.get(amiDom.workListGadget.AddObjectName).should('exist');
        cy.addLog("Select Add Object");

        // Should consist of add and selected check box
        cy.get(amiDom.workListGadget.AddObjectSelect).uncheck().should('not.be.checked');
        cy.addLog("Displaying selected Check Box");

        // Should consist of disabled ok and enabled Cancel
        cy.get(amiDom.amiLogin.ok).should('be.disabled');
        cy.get(amiDom.amiLogin.cancel).should('be.enabled');
        cy.addLog("Displaying Ok & Cancel Options");
        cy.addLog("Should Display available Options in Add Object Window");

        cy.finish('AMI-2028:35');

    });

    /* Enter name in the Name field. */

    it("AMI-2029:36, Ok button should get enabled.", function() {

        cy.start('AMI-2029:36');

        // Enter Any name
        cy.get(amiDom.workListGadget.AddObjectName).clear().type(amiValue.workListGadget.addObjectValue)
        .should('have.value', amiValue.workListGadget.addObjectValue)
        cy.addLog("Enter any value in Add object Name : "+ amiValue.workListGadget.addObjectValue);
        
        // Should consist of add and selected check box
        cy.get(amiDom.workListGadget.AddObjectSelect).check().should('be.checked');
        cy.addLog("Displaying selected Check Box");

        // Ok button should get enabled
        cy.get(amiDom.amiLogin.ok).should('be.enabled');
        cy.addLog("Ok Button Should be Enabled");

        cy.finish('AMI-2029:36');

    });

    /* Click on Ok button.*/

    it("AMI-2030:37, A new list object should be created and object specified in the 'List of Objects' field should get linked to it.", function() {

        cy.start("AMI-2030:37");

        // Ok button should get enabled
        cy.get(amiDom.amiLogin.ok).click({force:true});
        cy.addLog("Click Ok Button to Submit");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");
        
        cy.finish('AMI-2030:37');

    });

});