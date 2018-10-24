// Check paste icon Options From AMI-1792:16 to AMI-1793:17

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Check Pate Icon Options in Tag Relations Gadget", function() {

    let anyGadgetDom = amiDom.anyGadget;
    let anyGadget = amiValue.anyGadget;
    let tagRelationGadgetDom = amiDom.tagRelationGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon enable disable");
    
    });
    
    /* Select and copy Index type objects */
    /* Copy Index object in one page of clipboard
       Select Index object page in Clipboard gadget */

    it("AMI-1792:16 & AMI-1793:17, Paste icon in Tag Relation gadget should be in enabled state", function() {

        cy.start('AMI-1792:16 & AMI-1793:17');

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Worksapce to "+ amiValue.amiLogin.changeWorkspace);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
        cy.addLog(amiValue.amiLogin.changeWorkspace +" Changed Successfully");

        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opend With List");

        // Click on tags
        cy.addLog('Select '+ anyGadget.tags);
        browserGadgetUtils.setStructureType(anyGadget.tags);
        cy.addLog("Should Display "+ anyGadget.tags +" Objects List");
        
        // Select Any Browser Object from Browser gadget
        cy.addLog("Select any Object from Tags");
        browserGadgetUtils.setBrowseContext('QA Index/Pomme');
        cy.contains("Pomme").click();

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");
        

        // Select copy option on Browser Gadget menu
        cy.addLog('Select Copy & Paste Options should be enabled');
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Paste option Enable on Tag relation Attribute
        cy.get(tagRelationGadgetDom.menuPaste).should('not.be.disabled');
        cy.get(tagRelationGadgetDom.menuIcon).click();
        cy.get(tagRelationGadgetDom.indexMenuPaste).should('not.be.disabled');
        cy.addLog("Paste Options are enabled State");

        // Open clipboard
        cy.addLog("Open Clipboard, check Paste Options");
        cy.get(anyGadgetDom.clipboard).click(); 

        // Check again Paste icon Enable
        cy.get(tagRelationGadgetDom.menuPaste).should('not.be.disabled');
        cy.addLog("Paste Options are Enabled");

        // Close clipboard
        cy.get(anyGadgetDom.clipboard).click();
        cy.addLog("Close Clipboard");
        
        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1792:16 & AMI-1793:17');
    });

});
