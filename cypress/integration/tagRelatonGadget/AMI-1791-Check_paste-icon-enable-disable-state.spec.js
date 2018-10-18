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

    let anyGadgetValue = amiValue.anyGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon enable disable state");
    
    });

    /* Select and copy any object type object rather than Index type */

    it("AMI-1791:15, Paste icon in Tag Relation gadget should be in disabled state", function() {

        cy.start('AMI-1791:15');

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
        browserGadgetUtils.setBrowseContext(anyGadgetValue.anyInput);

        //Select copy option on Browser Gadget menu
        cy.get(amiDom.anyGadget.browserIconCopy).should('be.visible').click();

        // Paste option Disable on Tag relation Attribute
        cy.get(amiDom.tagRelationGadget.menuPaste).should('not.be.enabled');
        cy.get(amiDom.tagRelationGadget.menuIcon).click();
        cy.get(amiDom.tagRelationGadget.indexMenuPaste).should('not.be.enabled');

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1791:15');

    });

});