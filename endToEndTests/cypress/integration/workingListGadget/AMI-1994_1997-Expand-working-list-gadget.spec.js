// Working List Gadget GUI from AMI-1944:1 to AMI-1947:4

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget GUI", function() {

    let workListGadgetDom = amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Working List Gadget GUI");
    
    });

    /* Expand Working List Gadget. */

    it("AMI-1994:1, Working List Gadget should consists of : Filter by Object Type, "+
       "List element as,Delimiter,List of Objects,Apply to list and Show results fields "+
       "along with Checkboxes:Use whitespace characters as delimiter?,Copy descendants? "+
       "and disabled Apply button.", function() {

        cy.start("AMI-1994:1"); 

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Worksapce to "+ amiValue.amiLogin.workListGadget);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);
        cy.addLog(amiValue.amiLogin.workListGadget+ " Changed Successfully");

        // Open WorkList Gadget
        cy.addLog("Open ", amiValue.anyGadget.workListGadget);
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);
        cy.addLog(amiValue.anyGadget.workListGadget+ " Opened Successfully");

        // Should consist of Filter by object type and it's Drop Down
        cy.addLog("Should Consist of all Availble Options in Working list Gadget");
        cy.contains("Filter by Object Type:").should('be.visible');
        cy.get(workListGadgetDom.filterByObjectDropDown).should('be.visible');

        // Should consist of list element as and it's Drop Down
        cy.contains("List elements as:").should('be.visible');
        cy.get(workListGadgetDom.listElementsDropDown).should('be.visible');

        // Should consist of delimeter text box
        cy.contains("Delimiter:").should('be.visible');
        cy.get(workListGadgetDom.whitespaceCharacterCheckBox).uncheck();
        cy.get(workListGadgetDom.delimiterTextBox).should('be.visible');

        // Should consist of list of objects and text box
        cy.contains("List of Objects:").should('be.visible');
        cy.get(workListGadgetDom.listObjectTextBox).should('be.visible');

        // Should consist of Apply to list and drop down
        cy.contains("Apply to list:").should('be.visible');
        cy.get(workListGadgetDom.applyListDropDown).should('be.visible');

        // Should consist of show results and drop down 
        cy.contains("Show results:").should('be.visible');
        cy.get(workListGadgetDom.showResultsDropDown).should('be.visible');

        // Should consist of Select list after applying changes and check box
        cy.contains("Select list after applying changes?").should('be.visible');
        cy.get(workListGadgetDom.selectListCheckBox).should('exist').and('not.be.checked');
       
        // Should consist of Use whitespace characters as delimiter? and Check Box
        cy.contains("Use whitespace characters as delimiter?").should('be.visible');
        cy.get(workListGadgetDom.whitespaceCharacterCheckBox).should('exist').and('not.be.checked');

        // Should consist of Copy descendants? and Check Box
        cy.contains('Copy descendants?').should('be.visible');
        cy.get(workListGadgetDom.copyDescendantsCheckbox).should('exist').and('not.be.checked');

        // Should consist of Apply button in Disable state
        cy.get(workListGadgetDom.apply).should('not.be.enabled');
        cy.addLog("Displying all Availabe Options in Working List Gadget");

        cy.finish("AMI-1994:1");

    });

    /* Click on Working List Action menu */

    it("AMI-1995:2, Refresh and Help option should come up.", function() {

        cy.start("AMI-1995:2"); 

        // Click on work list action menu
        cy.addLog("Open Work List Action Menu")
        cy.get(workListGadgetDom.actionMenu).click({ force:true });

        // Displaying refresh
        cy.get(workListGadgetDom.actionMenuRefresh).should('exist').and('visible');
        cy.addLog("Displaying Refresh")

        // Displaying Help
        cy.get(workListGadgetDom.actionMenuHelp).should('exist').and('visible');
        cy.addLog("Displaying Help")

        cy.finish("AMI-1995:2"); 

    });
    
    /* Click on refresh option. */

    it("AMI-1996:3, Working list gadget should get refreshed.", function() {

        cy.start("AMI-1996:3");

        // Click on refresh
        cy.addLog("Select Refresh")
        cy.get(workListGadgetDom.actionMenuRefresh).click({ force:true });
        cy.addLog("Working List Gadget Refreshed")
        

        cy.log("Working list gadget is refreshed");

        cy.finish("AMI-1996:3");
    });

    /* Click on help option. */
    it("AMI-1997:4, Working list gadget Help window should get opened.", function() {
        
        cy.start("AMI-1997:4");

        // Click again on work list action menu
        cy.get(workListGadgetDom.actionMenu).click({ force:true });

        // Click on Help
        cy.addLog("Select Help Option")
        cy.get(workListGadgetDom.actionMenuHelp).click({ force:true });
        cy.log("Invalid Session Popup & Error:1098");
        cy.addLog("Help Window Should Open")

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish("AMI-1997:4");

    });
});