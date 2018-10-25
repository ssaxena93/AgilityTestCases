// Check paste icon options AMI-1795:19 and AMI-1799:23

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

function selectChildObjects(){
    cy.wait(2000);
    cy.get('#check-2-idx_1666-1661').check().should('be.checked');
    cy.get('#check-2-idx_1666-1645').check().should('be.checked');
    cy.get('#check-2-idx_1666-1659').check().should('be.checked');
    cy.get('#check-2-idx_1666-1663-1662').check().should('be.checked');

}

function copiedChidObjects(){

    cy.contains('Cantilever Chair').should('be.visible');
    cy.contains('Chair, Executive').should('be.visible');
    cy.contains('High Back Manager Chair').should('be.visible');
    cy.contains('Task Chair:Manager Chair').should('be.visible');
};

describe("Check Pate Icon Options in Tag Relations Gadget", function() {

    let anyGadgetDom = amiDom.anyGadget;
    let anyGadget = amiValue.anyGadget;
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
        cy.addLog("Select "+ anyGadget.browseContext +" Object");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");

        // Select CypressRelationTagArrow
        cy.addLog("Copy any Multiple Child Objects");
        cy.get(anyGadgetDom.cypressRelationTagArrow).click();

        // Check on Inside child Objects
        selectChildObjects();

        //Select copy option on tag relation gadget menu
        cy.get(amiDom.tagRelationGadget.menuCopy).click();

        // Copied Object Should be Linked to ClipBoard
        cy.addLog("Open Clipboard");
        cy.get(anyGadgetDom.clipboard).click();

        // Verify copied objects presence in Clipboard
        copiedChidObjects();
        cy.addLog("Should display Copied Child Objects");

        // Select other object in Browser gadget
        cy.addLog("Select"+ anyGadget.browseQaTestAgain);
        browserGadgetUtils.setBrowseContext(anyGadget.browseQaTestAgain);

        // Select paste icon in Tag Relation gadget
        cy.addLog("Select Paste Options");
        cy.get(amiDom.tagRelationGadget.menuPaste).click();

        // Only Index object should get linked with selected / mapped Tag relation
        copiedChidObjects();
        cy.addLog("Only Index object should get linked with selected / mapped Tag relation");
   
        cy.finish('AMI-1795:19');

    });

    /* Copy a Index object from Tag browser and select any object from Browse gadget, 
      select a Tag relation and select paste icon */

    it("AMI-1797:21, Paste Tag Relations window should open with Unmapped items "+ 
     "and Mapped items columns, Automap, Unmap all, OK, Cancel buttons, Only show dialog "+
     "when automap fails checkbox and copied object should mapped with selected Tag relation", function(){
        
        cy.start('AMI-1797:21');

        // Displaying paste tag relation window
        cy.addLog("Opened Paste Tags Relations Winodow")
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

        // copied object Should Mapped with Select object
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');
        cy.addLog("Displaying all Available Options in Paste Relation Window");

        cy.finish('AMI-1797:21');

    });

    /* Click on unmap all button */
    it("AMI-1799:23, The object should present in unmapped column since "+ 
       "the object is not linked to any of Tag relation", function() {

        cy.start('AMI-1799:23');

        // Click on unmapall
        cy.addLog("Select Unmapall")
        cy.get(pasteTagRelationWindowDom.unmapAll).click();

        // Displaying objects in unmaped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');
        cy.addLog("The objects are Present in Unmapped Column");

        // Click cancel to exit from paste tag relation window
        cy.get(amiDom.amiLogin.cancel).click();
        cy.addLog("Select Cancel to Exist")

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");
    
        cy.finish('AMI-1799:23');
        
    });

});

