// Check paste icon enable disable state From AMI-1791:15

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');

// AMI Data Values File
const amiValue = require('../../fixtures/amiDataValue');

// AMI DOM Elements File
const amiDom = require('../../fixtures/amiDomElements');

describe("Check Pate Icon Options in Tag Relations Gadget", function() {

    let anyGadget = amiValue.anyGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon disable state");
    
    });

    /* Select and copy any object type object rather than Index type */

    it("AMI-1791:15, Paste icon in Tag Relation gadget should be in disabled state", function() {

        cy.start('AMI-1791:15');

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Workspace to "+ amiValue.amiLogin.changeWorkspace);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
        cy.addLog(amiValue.amiLogin.changeWorkspace +" Changed Successfully");

        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opend With List");

        // Select Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.type);
        browserGadgetUtils.setStructureType(anyGadget.type);
        cy.addLog(anyGadget.type +" Displayng with List Of Objects");

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext+ " Object");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");
 
        // Select any browser object from browser gadget
        cy.addLog("Select "+ anyGadget.anyInput);
        browserGadgetUtils.setBrowseContext(anyGadget.anyInput);

        //Select copy option on Browser Gadget menu
        cy.addLog('Select Copy from Tag Relation Gadget Action Menu');
        cy.get(amiDom.anyGadget.browserIconCopy).should('be.visible').click();

        // Paste option Disable on Tag relation Attribute
        cy.addLog("Verify Paste Options are Disabled State");
        cy.get(amiDom.tagRelationGadget.menuPaste).should('not.be.enabled');
        cy.get(amiDom.tagRelationGadget.menuIcon).click();
        cy.get(amiDom.tagRelationGadget.indexMenuPaste).should('not.be.enabled');
        cy.addLog("Paste Options are disabed");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1791:15');

    });

});