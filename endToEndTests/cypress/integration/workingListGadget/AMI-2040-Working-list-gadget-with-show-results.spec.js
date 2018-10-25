// Work list gadget with show results dropdown Test Cases from AMI-2040:47

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
    
    /* 1.In the 'List of Objects' field enter an object id or name which doesn't exists. 
       2.Select Add and click on Apply button.  
    */
    it("AMI-2040:47, No matching objects found message should be displayed.", function() {
        
        cy.start('AMI-2040:47');
        
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
        
        // Select any in filter by object type
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);
        cy.addLog("Select Any in 'Filter by Object Type' field.");
        
        // Select Object id as in list Element
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");
        cy.addLog("Select List Elements DropDown as Object Id");

        // Select Delemeter should have value default ','
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);
        
        // In the 'List of Objects' field enter an object id or name which doesn't exists
        cy.get(workListGadgetDom.listObjectTextBox).clear().type(workListGadgetValue.listObjectTextBoxValue);
        cy.addLog("In the 'List of Objects' field, enter an object id which doesn't exists : "+ workListGadgetValue.listObjectTextBoxValue);

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);
        cy.addLog("Select add");

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });
        cy.addLog("Select Apply");

        // No matching objects found message should be displayed.
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Displaying Error : "+ workListGadgetValue.error1259);

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-2040:47');

    });

});

