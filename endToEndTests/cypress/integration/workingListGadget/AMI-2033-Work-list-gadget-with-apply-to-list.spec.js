// Work list gadget Test Cases with apply to list dropdown from AMI-2033:40

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const workSpaceEditorUtils = require('../../utils/ravi_utils/workspaceEditorUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Work list gadget Test Cases with apply to list dropdown", function() {

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work List Gadget with apply to list dropdown");
    
    });

    /* 	1.Create an object(O1) and under it create object(C1). 
        2.Set the object id of O1 in 'List of Objects' field. 
        3.Select an object from 'Apply to list' drop down. 
        4.Check Copy descendant check box. 
        5.Select Add and click on Apply button. 
    */

    it("AMI-2033:40, Object O1 should get linked to list object along with C1 under it.", function() {

        cy.start('AMI-2033:40');

        let workListGadgetValue =  amiValue.workListGadget; 
        let workListGadgetDom =  amiDom.workListGadget;

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

        // Create an object(O1) and under it create object(C1)
        // Open Browse Gadget
        cy.addLog("Create an object(O1) and under it create object(C1)")
        cy.get(amiDom.workListGadget.browserIcon).click();
        cy.addLog("Open Browser and Displaying Contents");

        // Select Lists
        browserGadgetUtils.setStructureType(amiValue.anyGadget.list);
        cy.addLog('Select List Displaying all Objects');

        // Select QA list Test From lists
        browserGadgetUtils.setBrowseContext(amiValue.workListGadget.qaListTest);
        cy.addLog("Select Object has Children : "+ amiValue.workListGadget.qaListTest);

        // Select Browser menu icon
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.addLog("Select Browser Menu");

        // Select Add Object
        cy.contains(amiValue.workListGadget.browserAddObject).click();
        cy.addLog("Select Add object");

        // Add object Window Should Displayed
        cy.contains(amiValue.workListGadget.AddObjectWindow).should('be.visible');
        cy.addLog("Displaying Add Object Window");

        // Enter Any name
        cy.get(amiDom.workListGadget.AddObjectName).clear().type(amiValue.workListGadget.addObjectC1)
        .should('have.value', amiValue.workListGadget.addObjectC1);
        cy.addLog("Enter any value in Add object Name : "+ amiValue.workListGadget.addObjectC1);

        // Select new object type
        cy.get(amiValue.workListGadget.addObjectType).check().should('be.checked')
        cy.addLog('Select object type');
        
        // Select add and then select check box
        cy.get(amiDom.workListGadget.AddObjectSelect).check().should('be.checked');
        cy.addLog("Checked on add and then select check box");

        // Click Ok
        cy.get(amiDom.amiLogin.ok).click({force:true});
        cy.contains(amiValue.workListGadget.addObjectC1).click();

        // Select Browser menu icon
        cy.addLog("Add Child object Under : "+ amiValue.workListGadget.addObjectC1)
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.addLog("Select Browser Menu");

        // Select Add Object
        cy.contains(amiValue.workListGadget.browserAddObject).click();
        cy.addLog("Select Add object");

        // Add object Window Should Displayed
        cy.contains(amiValue.workListGadget.AddObjectWindow).should('be.visible');
        cy.addLog("Displaying Add Object Window");

        // Enter Any name
        cy.get(amiDom.workListGadget.AddObjectName).clear().type(amiValue.workListGadget.addObject01)
        .should('have.value', amiValue.workListGadget.addObject01);
        cy.addLog("Enter any value in Add object Name : "+ amiValue.workListGadget.addObject01);

        // Select new object type
        cy.get(amiValue.workListGadget.addObjectType).check().should('be.checked')
        cy.addLog('Select object type');
        
        // Select add and then select check box
        cy.get(amiDom.workListGadget.AddObjectSelect).check().should('be.checked');
        cy.addLog("Checked on add and then select check box");

        // Click Ok
        cy.get(amiDom.amiLogin.ok).click({force:true});

        // Edit current workspace
        changeDropdownUtils.openWorkspaceEditor();
        cy.addLog("Edit Workspace");

        // Open Working List
        cy.addLog("Open Working List");
        cy.get(amiDom.workListGadget.workingListWindow).click();
        cy.addLog("Displaying all Available Options in Working List");

        cy.get(amiDom.workListGadget.workingListObjectId).clear().type(amiValue.workListGadget.qaListTestId);

        // Click ok to save Index Menu Options
        workSpaceEditorUtils.closeWorkspaceEditor();
        cy.addLog("Save Workspace");

        // Should consist of Copy descendants? and Check Box
        cy.contains('Copy descendants?').should('be.visible');
        cy.get(workListGadgetDom.copyDescendantsCheckbox).check().should('be.checked');

        // Select Object id as in list Element
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");
        cy.addLog("Select Object IDs in 'List element as' field.");

        // Set the object id of O1 in 'List of Objects' field.
        cy.get(workListGadgetDom.listObjectTextBox).clear().type(amiValue.workListGadget.addObject01);

        // Select an object from 'Apply to list' drop down.
        cy.get(workListGadgetDom.applyListDropDown).select(amiValue.workListGadget.addObjectC1);
        cy.addLog("Select Apply list DropDown Value : "+ amiValue.workListGadget.addObjectC1);

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);
        cy.addLog("Select add");

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });
        cy.addLog("Select Apply");

        cy.get(amiDom.amiLogin.ok).click();

        //Remove The object
        cy.contains(amiValue.workListGadget.addObjectC1).click();
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.contains("Delete...").click();
        cy.get(amiDom.amiLogin.ok).click();

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-2033:40');

    });

});

 