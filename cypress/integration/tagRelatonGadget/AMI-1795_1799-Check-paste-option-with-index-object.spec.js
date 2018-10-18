// Check paste icon options AMI-1795:19 and AMI-1799:23

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

function selectTagstoCopy(){
    cy.wait(2000);
    cy.get('#check-2-idx_1666-1661').check().should('be.checked');
    cy.get('#check-2-idx_1666-1645').check().should('be.checked');
    cy.get('#check-2-idx_1666-1659').check().should('be.checked');
    cy.get('#check-2-idx_1666-1663-1662').check().should('be.checked');

}

function verifyCopiedTagsPresence(){

    cy.contains('Cantilever Chair').should('be.visible');
    cy.contains('Chair, Executive').should('be.visible');
    cy.contains('High Back Manager Chair').should('be.visible');
    cy.contains('Task Chair:Manager Chair').should('be.visible');
};


describe("Check Pate Icon Options in Tag Relations Gadget", function() {

    let anyGadgetDom = amiDom.anyGadget;
    let anyGadgetValue = amiValue.anyGadget;
    let pasteTagRelationWindowDom = amiDom.pasteTagRelationWindow;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon Options With Index Object");
    
    });

    /* 	Select Index objects and do copy */

    /* Select any other object in Browser gadget and Select paste icon in Tag Relation gadget */
    
    it("AMI-1795:19 & AMI-1796:20 All the objects are copied in one page of the clipboard, "+
       "Only Index object should get linked with selected / mapped Tag relation", function(){

        cy.start('AMI-1795:19');

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
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.tagRelation);

        // Select CypressRelationTagArrow
        cy.get(anyGadgetDom.cypressRelationTagArrow).click();

        // Check on Inside Tag
        selectTagstoCopy();

        //Select copy option on tag relation gadget menu
        cy.get(amiDom.tagRelationGadget.menuCopy).click();

        // Copied Object Should be Linked to ClipBoard
        cy.get(anyGadgetDom.clipboard).click();

        // Verify copied objects presence in Clipboard
        verifyCopiedTagsPresence();

        // Select other object in Browser gadget
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseQaTestAgain);

        // Select paste icon in Tag Relation gadget
        cy.get(amiDom.tagRelationGadget.menuPaste).click();

        // Only Index object should get linked with selected / mapped Tag relation
        verifyCopiedTagsPresence();
   
        cy.finish('AMI-1795:19');
    });

    /* Copy a Index object from Tag browser and select any object from Browse gadget, 
      select a Tag relation and select paste icon */

    it("AMI-1797:21, Paste Tag Relations window should open with Unmapped items "+ 
     "and Mapped items columns, Automap, Unmap all, OK, Cancel buttons, Only show dialog "+
     "when automap fails checkbox and copied object should mapped with selected Tag relation", function(){
        
        cy.start('AMI-1797:21');

        // Displaying paste tag relation window
        cy.get('.title').contains("Paste Tags Relations").should('be.visible');

        // Displaying unmapped Items colums
        cy.get('p').contains('Unmapped Items').should('be.visible');

        // Displaying mapped Items colums
        cy.get('p').contains('Mapped Items').should('be.visible');

        // Displaying Automap
        cy.get('button').contains('Auto Map').should('be.visible');

        // Displaying Unmap all
        cy.get('button').contains('Unmap All').should('be.visible');

        // Displaying Ok
        cy.get(amiDom.amiLogin.ok).should('be.visible');

        // Displaying Cancel
        cy.get(amiDom.amiLogin.cancel).should('be.visible');

        // Displaying Only show dialog when auto map fails and Chekbox
        cy.get(pasteTagRelationWindowDom.pasteCheckBox).should('be.visible');
        cy.contains("Only show dialog when auto map fails").should('be.visible');

        // copied object Should Mapped with Select objects
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible')

        cy.finish('AMI-1797:21');

    });

    /* Click on unmap all button */
    it("AMI-1799:23, The object should present in unmapped column since "+ 
       "the object is not linked to any of Tag relation", function() {

        cy.start('AMI-1799:23');

        // Click on unmapall 
        cy.get(pasteTagRelationWindowDom.unmapAll).click();

        // Displaying objects in unmaped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');

        // Click cancel to exit from paste tag relation window
        cy.get(amiDom.amiLogin.cancel).click();

        // Logout from AMI
        loginUtils.logoutFromAMI();
    
        cy.finish('AMI-1799:23')
        
    });

    
});

