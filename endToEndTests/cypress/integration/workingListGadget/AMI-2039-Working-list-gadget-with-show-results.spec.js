// Work list gadget with show results dropdown Test Cases from AMI-2039:46

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');

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
    
    /*  1.Create object say, O1 under structure S1. 
        2.Select Object Names in 'List elements as' field 
        3.Set the id of O1 in 'List of Objects' field. 
        4.Select Add and click Apply button.
    */

    it("AMI-2039:46, O1 Should get linked with the list object.", function() {
        
        cy.start('AMI-2039:46');
        
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

        // Create object say, O1 under structure S1
        // Open Browse Gadget
        cy.addLog("Create object say, O1 under structure S1")
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
        cy.get(amiDom.workListGadget.AddObjectName).clear().type(amiValue.workListGadget.addObjectS1)
        .should('have.value', amiValue.workListGadget.addObjectS1);
        cy.addLog("Enter any value in Add object Name : "+ amiValue.workListGadget.addObjectS1);

        // Select new object type
        cy.get(amiValue.workListGadget.addObjectType).check().should('be.checked')
        cy.addLog('Select object type');
        
        // Select add and then select check box
        cy.get(amiDom.workListGadget.AddObjectSelect).check().should('be.checked');
        cy.addLog("Checked on add and then select check box");

        // Click Ok
        cy.get(amiDom.amiLogin.ok).click({force:true});
        cy.contains(amiValue.workListGadget.addObjectS1).click();

        // Select Browser menu icon
        cy.addLog("Add Child object Under : "+ amiValue.workListGadget.addObjectS1)
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

        // Select Object Names in 'List elements as' field
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementName).should('have.value', "name");
        cy.addLog("Select Object Names in 'List elements as' field.");

        // Set the object id of O1 in 'List of Objects' field.
        cy.get(workListGadgetDom.listObjectTextBox).clear().type(amiValue.workListGadget.addObject01);
        cy.addLog("Set the object id of O1 in 'List of Objects' field.")

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);
        cy.addLog("Select add");

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });
        cy.addLog("Select Apply");

        // O1 Should get linked with the list object
        cy.get(amiDom.amiLogin.ok).click();
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.get(amiDom.anyGadget.browserRefresh).click();
        cy.addLog("O1 Should get linked with the list object");

        //Remove The object
        cy.contains(amiValue.workListGadget.addObjectS1).click();
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.contains("Delete...").click();
        cy.get(amiDom.amiLogin.ok).click();

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-2039:46');
    
    });

});
        