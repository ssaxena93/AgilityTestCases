// Checking Menu Options Copy Icon With Linked Gadgets From AMI-1785:9 to AMI-1787:11

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values File
const amiValue = require('../../fixtures/amiDataValue');

// AMI DOM Elements File
const amiDom = require('../../fixtures/amiDomElements');


describe("Checking Menu Options in Tag Relations Gadget", function() {

    let anyGadgetValue = amiValue.anyGadget;
    let anyGadgetDom = amiDom.anyGadget;
    let tagRelationGadgetDom = amiDom.tagRelationGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Checking Menu Options Copy Icon With Linked Gadgets");
    
    });

    /* Link a Index object to a Tag relation, 
    select that object and select copy icon. */

    it("AMI-1785:9, Selected object should get copied in clipboard gadget with the linked Tag relation", function() {

        cy.start('AMI-1785:9');

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

        // Select gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.name);
    
        // Browse Gadge
        browserGadgetUtils.setStructureType(anyGadgetValue.type);

        // Select Events in Browser Gadget
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseContext);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.tagRelation);

        // Click on JLD Single Index
        cy.contains(anyGadgetValue.jldSingleIndex).click();

        // Click On Main Index Terms
        cy.get(anyGadgetDom.mainIndexTermsId).click();

        // Select Cantilever Chair and Add 
        cy.contains(anyGadgetValue.cantileverChair).click();
        cy.get(anyGadgetDom.add).click();
        cy.get(amiDom.amiLogin.ok).click();

        //Veirify Cantilever Chair Tag Added 
        cy.wait(2000)
        cy.get(anyGadgetDom.jldSingleIdxArrow, {timeout:2000}).click();
        cy.contains(anyGadgetValue.cantileverChair).should('be.visible');   

        // Chek on Cantilever Chair tag
        cy.get(anyGadgetDom.cantileverChairCheck).check().should('be.checked');

        // Copy Option Should be visible Select Copy
        cy.get(tagRelationGadgetDom.menuCopy).click();

        // open ClipBoard
        cy.get(anyGadgetDom.clipboard).click();

        // Verify Copied Object Should be Linked to ClipBoard
        cy.contains(anyGadgetValue.cantileverChair).should('be.visible');

        // Close ClipBoard
        cy.get(anyGadgetDom.clipboard).click();

        // Remove tag
        cy.get(anyGadgetDom.jldSingleIdxArrow, {timeout:2000}).click();
        cy.get('#idx_805 > .ws-rendered-name').click();
        cy.get(anyGadgetDom.remove).click();
        cy.log("Removed the linked tag relation");

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();

        cy.finish('AMI-1785:9');
        
    });
   
    /* Select a object in Browse gadget and click on Action 
       menu of Browse gadget */

    it("AMI-1786:10, The object is copied with Tag relation paste link option should be in disabled stage", function() {

        cy.start('AMI-1786:10');

        // Click on Action Menu on Browse gadget
        cy.get(anyGadgetDom.browserIcon).click();

        // Paste link Options Should be Disable State
        cy.contains('Paste Link...').should('exist');
        cy.contains('Paste Duplicate...').should('exist');

        cy.finish('AMI-1786:10');
        
    });

    /* Select a Tag relation from Tag relation gadget */

    it("AMI-1787:11, Paste icon should got enabled", function() {

        cy.start('AMI-1787:11');

        // Select Tag Relation Gadget Bag_index 
        cy.get(anyGadgetDom.bagIndexCheck).check().should('be.checked')

        // Check Paste icon Enabled
        cy.get(tagRelationGadgetDom.menuPaste).should('be.visible');

        // Check Paste Enable in Menu 
        cy.get(tagRelationGadgetDom.menuIcon).click();
        cy.get(tagRelationGadgetDom.indexMenuPaste).should('be.visible');

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1787:11');
        
    });

});