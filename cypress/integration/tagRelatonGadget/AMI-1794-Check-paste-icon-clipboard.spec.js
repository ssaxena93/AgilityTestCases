// Check paste icon Options AMI-1794:18

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
    let anyGadgetValue = amiValue.anyGadget;
    
    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon clipboard");
    
    });

    /* Select other object page in Clipboard gadget */

    it("AMI-1794:18, Paste icon in Tag relation gadget should be in disabled state", function() {

        cy.start('AMI-1794:18');

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.tagRelation);

        // Browse Gadget Menu
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.name);
        
        // Select Events
        browserGadgetUtils.setStructureType(anyGadgetValue.type);

        // Select Any Browser Object from Browser gadget
        browserGadgetUtils.setBrowseContext('!!Demo Catalog/sara');
        
        // Select copy option on Browser Gadget menu
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Select Events to minimize
        browserGadgetUtils.setStructureType(anyGadgetValue.type);

        // Click on tags
        browserGadgetUtils.setStructureType(anyGadgetValue.tags);

        // Select Any Browser Object from Browser gadget
        browserGadgetUtils.setBrowseContext('QA Index/Pomme');
        cy.contains("Pomme").click();

        // Select copy option on Browser Gadget menu
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Copied Object Should be Linked to ClipBoard
        cy.get(anyGadgetDom.clipboard).click();

        // Change Next button On Clipboard 
        cy.get(anyGadgetDom.clipboardPrev).click();
        
        // Paste icon Should be disable State
        cy.get(amiDom.tagRelationGadget.menuPaste).should('not.be.enabled');
        
        // Change Next button On clipboard
        cy.get(anyGadgetDom.clipboardNext).click();

        // Check again Paste icon Enable
        cy.get(amiDom.tagRelationGadget.menuPaste).should('not.be.disabled');

        // Close ClipBoard
        cy.get(anyGadgetDom.clipboard).click();

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1794:18');
    });

});