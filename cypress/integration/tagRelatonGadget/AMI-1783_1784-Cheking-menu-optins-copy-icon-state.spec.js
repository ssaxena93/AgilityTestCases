// Checking Menu Options Copy Icon State From AMI-1783:7 to AMI-1784:8

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values File
const amiValue = require('../../fixtures/amiDataValue');

// AMI DOM Elements File
const amiDom = require('../../fixtures/amiDomElements');


describe("Checking Menu Options in Tag Relations Gadget", function() {

    let tagRelationGadgetDom = amiDom.tagRelationGadget;
    let anyGadgetValue = amiValue.anyGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Checking Menu Options Copy Icon State");
    
    });

    it("AMI-1783:7, Copy option should be disable state", function() {

        cy.start('AMI-1783:7');

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

        // Select QA Data 2 From Events
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseContext);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.tagRelation);
        
        // Check on JLD Single Index
        cy.get(amiDom.anyGadget.jldSingleIdxId).check().should('be.checked');
        
        // Copy Option should be disable State
        cy.get(tagRelationGadgetDom.menuCopy, { force: true}).should('not.be.enabled');

        cy.finish('AMI-1783:7');
        
    });

    it("AMI-1784:8, Copy option should be in enabled state", function() {

        cy.start('AMI-1784:8');
        
        // Select QA Index 
        cy.get(amiDom.anyGadget.qaIndexId).click();
        
        // Check on Chair
        cy.get(amiDom.anyGadget.qaIndexChair).check().should('be.checked');

        // Verify Copy option should be enable state
        cy.get(tagRelationGadgetDom.menuCopy).should('exist');

        // Verify copy option enable state in menu
        cy.get(tagRelationGadgetDom.menuIcon).click();

        cy.get(tagRelationGadgetDom.indexMenuCopy).should('be.visible');

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1784:8');
        
    });

});