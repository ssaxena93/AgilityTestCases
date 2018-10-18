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
    let anyGadgetValue = amiValue.anyGadget;
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
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.tagRelation);
        
        // Browse Gadget Menu
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.name);
        
        // Click on tags
        browserGadgetUtils.setStructureType(anyGadgetValue.tags);
        
        // Select Any Browser Object from Browser gadget
        browserGadgetUtils.setBrowseContext('QA Index/Pomme');
        cy.contains("Pomme").click();

        //Select copy option on Browser Gadget menu
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Paste option Enable on Tag relation Attribute
        cy.get(tagRelationGadgetDom.menuPaste).should('not.be.disabled');
        cy.get(tagRelationGadgetDom.menuIcon).click();
        cy.get(tagRelationGadgetDom.indexMenuPaste).should('not.be.disabled');

        // Open clipboard
        cy.get(anyGadgetDom.clipboard).click(); 

        // Check again Paste icon Enable
        cy.get(tagRelationGadgetDom.menuPaste).should('not.be.disabled');

        // Close clipboard
        cy.get(anyGadgetDom.clipboard).click();
        
        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1792:16 & AMI-1793:17');
    });

});
