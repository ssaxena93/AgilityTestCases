// Check paste icon options with paste tag relation window from AMI-1800:24 to AMI-1810:34

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
    let pasteTagRelationWindowDom = amiDom.pasteTagRelationWindow;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon Options With Paste Tag Relation Window");
    
    });
    
    /* copy a object which is linked to a Tag relation and do paste */
    it("AMI-1800:24, Paste Tag Relations window should open and copied object "+
    "should be present in mapped column with respective Tag relation", function() {

        cy.start('AMI-1800:24');

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

        // Select Qa Index object 
        cy.get(anyGadgetDom.qaIndexId).click();

        // Select inside Qa index and Check
        cy.get(anyGadgetDom.qaIndexChair).check().should('be.checked');

        //Select copy option on tag relation gadget menu
        cy.get(tagRelationGadgetDom.menuCopy).click();

        // Select paste icon in Tag Relation gadget
        cy.get(tagRelationGadgetDom.menuPaste).click();

        cy.log('Copied and Pasted Tag Relations');

        // Displaying paste tag relation window
        cy.get('.title').contains("Paste Tags Relations").should('be.visible');

        // Copied object Should present in mapped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');

        cy.finish('AMI-1800:24');
        
    });

    /* Click on Auto map button for Tag Relations */

    it("AMI-1802:26, Object should automatically linked to respective selected Tag relation", function() {

        cy.start('AMI-1802:26');
        
        // Click on unmapall 
        cy.get(pasteTagRelationWindowDom.unmapAll).click();

        // click on Automap
        cy.get(pasteTagRelationWindowDom.autoMap).click();

        cy.finish('AMI-1802:26');

    });

    /* Drag and Drop object from mapped item column */

    it("AMI-1803:27, We should be able to drag object from mapped items to un-mapped items", function() {

        cy.start('AMI-1803:27');
        
        // Trying Drag to unmapped Items
        cy.get(pasteTagRelationWindowDom.pasteRelation).trigger('mousedown')
        .trigger('mousemove', 'left', { which: 1, pageX: -50, pageY: 0 }).trigger('mouseup');
        cy.log('Cypress is not supporting "Drag and Drop" Properly')

        // Click on unmapall 
        cy.get(pasteTagRelationWindowDom.unmapAll).click();

        cy.finish('AMI-1803:27');
    });

    /* Drag object from unmapped items column and drop */

    it("AMI-1804:28, The object should get linked to chosen Tag relation", function(){

        cy.start('AMI-1804:28');

        // Copied object Should present in mapped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).trigger('mousedown')
        .trigger('mousemove', { which: 1, pageX: 50, pageY: 0 }).trigger('mouseup');
        cy.log('Cypress is not supporting "Drag and Drop" Properly')

        // click on Automap
        cy.get(pasteTagRelationWindowDom.autoMap).click();

        cy.finish('AMI-1804:28');
    });

    /* Click on Cancel button */

    it("AMI-1805:29, The object should not be linked to the Tag relation", function() {

        cy.start('AMI-1805:29');

        // Click cancel to exit from paste tag relation window
        cy.get(amiDom.amiLogin.cancel).click();

        cy.finish('AMI-1805:29');

    });

    /* 1) Click on action menu -> paste 
    2) Drag object from unmapped items column and drop to a Tag relation under mapped items 
    3) Click on 'OK' button */

    it("AMI-1806:30, The object should not be linked to the Tag relation", function() {

        cy.start('AMI-1806:30');
        
        cy.log("Drag and Drop is not Supporting This test Case not Automated Now")  

        cy.finish('AMI-1806:30');

    });

    /* 	Check only show dialog when auto map fails */

    it("AMI-1807:31, Paste Tag Relations window will close with Auto map fail checked", function() {

        cy.start('AMI-1807:31');
        
        // Select paste icon in Tag Relation gadget
        cy.get(tagRelationGadgetDom.menuPaste).click();

        // Checked on Auto map fail 
        cy.get(pasteTagRelationWindowDom.pasteCheckBox).check().should('be.checked');

        // Click cancel to exit from paste tag relation window
        cy.get(amiDom.amiLogin.cancel).click();

        // Select Events to minimize
        browserGadgetUtils.setStructureType(anyGadgetValue.type);

        // Logout from AMI
        loginUtils.logoutFromAMI(); 

        cy.finish('AMI-1807:31');
    });

    /* Copy a object from Browse gadget, select a Tag relation and click on Paste icon */
    /* Click ok */

    it("AMI-1808:32, AMI-1809:33 & AMI-1810:34, Paste Tag Relations window should not display and copied object should "+
       "get linked with selected Tag relation", function() {

        cy.start('AMI-1808:32');
        
        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Browse Gadget Menu
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.name);
        
        // Click on tags
        browserGadgetUtils.setStructureType(anyGadgetValue.tags);

        // Select Any Browser Object from Browser gadget
        browserGadgetUtils.setBrowseContext('QA Index/Pomme');
        cy.contains("Pomme").click();

        // Select copy option on Browser Gadget menu
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Select Paste icon
        cy.get(tagRelationGadgetDom.menuPaste).click();

        // Displating Error Attempting Relation Object itself
        cy.get('.ws-notification-content').find('.mdi').click();

        // Should not Displaying paste tag relation window
        cy.contains("Paste Tags Relations").should('not.exist');

        // Click on tags to minimize
        browserGadgetUtils.setStructureType(anyGadgetValue.tags);

        // Select Events
        browserGadgetUtils.setStructureType(anyGadgetValue.type);

        // Select QA Data 2 From Events
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseContext);

        // Select Paste icon again
        cy.get(tagRelationGadgetDom.menuPaste).click();

        // Displaying paste tag relation window
        cy.get('.title').contains("Paste Tags Relations").should('be.visible');

        // Copied object Should present in mapped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1808:32');
    });
    
});

