// Check paste icon Options From AMI-1788:12 to AMI-1789:13

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
    let anyGadgetDom = amiDom.anyGadget;
    let tagRelationGadgetDom = amiDom.tagRelationGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon Options");
    
    });

    beforeEach("Login to AMI for Each Test Case", function() {

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

    });

   afterEach("Logout from AMI for Each Test Case", function(){

        // Logout from AMI
        loginUtils.logoutFromAMI();

    });
    
    /* Verifying Paste icon in Tag Relations screen 
       Copy a relation in the Tag relation gadget */ 

    it("AMI-1788:12, Paste option should get enabled", function() {

        cy.start('AMI-1788:12');

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

        // Click on JLD Single Index
        cy.contains(anyGadgetValue.jldSingleIndex).click();

        // Click On Main Index Terms
        cy.get(anyGadgetDom.mainIndexTermsId).click();

        // Select Cantilever Chair and Add 
        cy.contains(anyGadgetValue.cantileverChair).click();
        cy.get(anyGadgetDom.add).click();
        cy.get(amiDom.amiLogin.ok).click();

        // Select on Cantilever Chair tag checkbox
        cy.wait(2000);
        cy.get(anyGadgetDom.jldSingleIdxArrow).click();
        cy.get(anyGadgetDom.cantileverChairCheck).check().should('be.checked');

        // Copy Option Should be visible and Select Copy
        cy.get(tagRelationGadgetDom.menuCopy).click();

        // Paste option should got enabled
        cy.get(tagRelationGadgetDom.menuPaste).should('be.visible');
        cy.get(tagRelationGadgetDom.menuIcon).click();
        cy.get(tagRelationGadgetDom.indexMenuPaste).should('be.visible');

        // Select !! Demo Catalog from Browse gadgets from Events
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseDemoCatalog);

        // Click Paste Icon
        cy.get(tagRelationGadgetDom.menuPaste).click();
 
        //  Should Visible Cantilever Chair Tag
        cy.contains(anyGadgetValue.cantileverChair).should('be.visible');

        // Click Ok to Submit
        cy.get(amiDom.amiLogin.ok).click();

        cy.finish('AMI-1788:12');
        
    });

    /* In the Browse Gadget, select any other object 
       and in the Tag relation gadget, 
       click on the Paste icon */

    it("AMI-1789:13, Copied relation should get linked to the new object", function(){

        cy.start('AMI-1789:13');
        
        // Browse Gadget Menu
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.name);
        
        // Select Events
        browserGadgetUtils.setStructureType(anyGadgetValue.type);
 
        //Verify its copied in !!Demo Catalog
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseQaTestAgain);
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseDemoCatalog);

        //Veirify Cantilever Chair Tag Added 
        cy.wait(2000)
        cy.get(anyGadgetDom.jldSingleIdxArrow).click();
        cy.contains(anyGadgetValue.cantileverChair).should('be.visible');

        // Remove tag
        // Select QA Data 2 From Events
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseContext);
        cy.wait(2000)
        // cy.get(anyGadgetDom.jldSingleIdxArrow, {timeout:2000}).click();
        cy.get('#idx_805 > .ws-rendered-name').click();
        cy.get(anyGadgetDom.remove).click();
        cy.log("Removed the linked tag relation");

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
    
        cy.finish('AMI-1789:13');
    });
});
