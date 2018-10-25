// Tag Relation Gadget With Check paste icon Options AMI-1794:18

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Tag Relation Gadget With Check Pate Icon Options in Tag Relations Gadget", function() {

    let anyGadgetDom = amiDom.anyGadget;
    let anyGadget = amiValue.anyGadget;
    
    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon with Clipboard");
    
    });

    /* Select other object page in Clipboard gadget */

    it("AMI-1794:18, Paste icon in Tag relation gadget should be in disabled state", function() {

        cy.start('AMI-1794:18');

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

        // Select Any Browser Object from Browser gadget
        browserGadgetUtils.setBrowseContext("!!Demo Catalog/sara");

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");

        // Select copy option on Browser Gadget menu
        cy.addLog("Select Copy on Browse Gadget Menu Options");
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Select Events to minimize
        cy.addLog("Minimize "+ anyGadget.type)
        browserGadgetUtils.setStructureType(anyGadget.type);

        // Click on tags
        cy.addLog("Select "+ anyGadget.tags)
        browserGadgetUtils.setStructureType(anyGadget.tags);

        // Select Any Browser Object from Browser gadget
        cy.addLog("Select any Object");
        browserGadgetUtils.setBrowseContext("QA Index/Pomme");
        cy.contains("Pomme").click();

        // Select copy option on Browser Gadget menu
        cy.addLog("Select Copy and open Clipboard");
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Copied Object Should be Linked to ClipBoard
        cy.get(anyGadgetDom.clipboard).click();
        cy.addLog("Copy Objects Should Linked to Clipboard");

        // Change Next button On Clipboard
        cy.addLog("Select Previous on Clipboard");
        cy.get(anyGadgetDom.clipboardPrev).click();
        
        // Paste icon Should be disable State
        cy.get(amiDom.tagRelationGadget.menuPaste).should('not.be.enabled');
        cy.addLog("Paste Options should be disabled");
        
        // Change Next button On clipboard
        cy.addLog("Select Next on Clipboard");
        cy.get(anyGadgetDom.clipboardNext).click();

        // Check again Paste icon Enable
        cy.get(amiDom.tagRelationGadget.menuPaste).should('not.be.disabled');
        cy.addLog("Paste Options are Enabled State")

        // Close ClipBoard
        cy.addLog("Close Clipboard");
        cy.get(anyGadgetDom.clipboard).click();

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1794:18');
        
    });

});