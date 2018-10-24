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
    let anyGadget = amiValue.anyGadget;
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
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Worksapce to "+ amiValue.amiLogin.changeWorkspace);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
        cy.addLog(amiValue.amiLogin.changeWorkspace +" Changed Successfully");

        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opend With List");

        // Select Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.type);
        browserGadgetUtils.setStructureType(anyGadget.type);
        cy.addLog(anyGadget.type +" Displaying with List Of Objects");

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext+ " object");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");


        // Select Qa Index object
        cy.addLog('Select QA Index and Check on Child Object, Do Copy and Paste');
        cy.get(anyGadgetDom.qaIndexId).click();

        // Select inside Qa index and Check
        cy.get(anyGadgetDom.qaIndexChair).check().should('be.checked');

        //Select copy option on tag relation gadget menu
        cy.get(tagRelationGadgetDom.menuCopy).click();

        // Select paste icon in Tag Relation gadget
        cy.get(tagRelationGadgetDom.menuPaste).click();
        cy.addLog("Qa Index Child Object Copied and Pasted Successfully");
        cy.log("Displying Paste tags Relation Window");

        // Displaying paste tag relation window
        cy.addLog("Displying Paste tags Relation Window");
        cy.get('.title').contains("Paste Tags Relations").should('be.visible');

        // Copied object Should present in mapped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');
        cy.addLog("Displaying Pasted objects");

        cy.finish('AMI-1800:24');
        
    });

    /* Click on Auto map button for Tag Relations */

    it("AMI-1802:26, Object should automatically linked to respective selected Tag relation", function() {

        cy.start('AMI-1802:26');
        
        // Click on unmapall
        cy.addLog("Select Automap");
        cy.get(pasteTagRelationWindowDom.unmapAll).click();

        // click on Automap
        cy.get(pasteTagRelationWindowDom.autoMap).click();
        cy.addLog("Object should automatically linked to respective selected Tag relation");

        cy.finish('AMI-1802:26');

    });

    /* Drag and Drop object from mapped item column */

    it("AMI-1803:27, We should be able to drag object from mapped items to un-mapped items", function() {

        cy.start('AMI-1803:27');
        
        // Trying Drag to unmapped Items
        cy.get(pasteTagRelationWindowDom.pasteRelation).trigger('mousedown')
        .trigger('mousemove', 'left', { which: 1, pageX: -50, pageY: 0 }).trigger('mouseup');
        cy.log('Cypress is not supporting "Drag and Drop" Properly');

        // Click on unmapall
        cy.addLog("Select Unmap all");
        cy.get(pasteTagRelationWindowDom.unmapAll).click();
        cy.addLog("Mapped Items to Un-mapped Items");

        cy.finish('AMI-1803:27');
    });

    /* Drag object from unmapped items column and drop */

    it("AMI-1804:28, The object should get linked to chosen Tag relation", function(){

        cy.start('AMI-1804:28');

        // Copied object Should present in mapped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).trigger('mousedown')
        .trigger('mousemove', { which: 1, pageX: 50, pageY: 0 }).trigger('mouseup');
        cy.log('Cypress is not supporting "Drag and Drop" Properly');

        // click on Automap
        cy.addLog("Select Automap");
        cy.get(pasteTagRelationWindowDom.autoMap).click();
        cy.addLog("Objects Moved to Unmapped to Automap");

        cy.finish('AMI-1804:28');
    });

    /* Click on Cancel button */

    it("AMI-1805:29, The object should not be linked to the Tag relation", function() {

        cy.start('AMI-1805:29');

        // Click cancel to exit from paste tag relation window
        cy.addLog("Select Cancel");
        cy.get(amiDom.amiLogin.cancel).click();
        cy.addLog("Close/Exit from Paste Tag Relation Window");

        cy.finish('AMI-1805:29');

    });

    /* 1) Click on action menu -> paste 
    2) Drag object from unmapped items column and drop to a Tag relation under mapped items 
    3) Click on 'OK' button */

    it("AMI-1806:30, The object should not be linked to the Tag relation", function() {

        cy.start('AMI-1806:30');
        
        cy.addLog("Drag and Drop is not Supporting This test Case not Automated Now");

        cy.finish('AMI-1806:30');

    });

    /* 	Check only show dialog when auto map fails */

    it("AMI-1807:31, Paste Tag Relations window will close with Auto map fail checked", function() {

        cy.start('AMI-1807:31');
        
        // Select paste icon in Tag Relation gadget
        cy.addLog("Select Tag Relation Paste Option");
        cy.get(tagRelationGadgetDom.menuPaste).click();

        // Checked on Auto map fail
        cy.addLog("Should Display Paste Tag Relation Window, Check on Auto Map Fail Checkbox");
        cy.get(pasteTagRelationWindowDom.pasteCheckBox).check().should('be.checked');

        // Click cancel to exit from paste tag relation window
        cy.get(amiDom.amiLogin.cancel).click();
        cy.addLog("Auto Map Fail Checked and Close");

        // Select Events to minimize
        cy.addLog("Select "+ anyGadget.type, "to Minimize");
        browserGadgetUtils.setStructureType(anyGadget.type);

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1807:31');
    });

    /* Copy a object from Browse gadget, select a Tag relation and click on Paste icon */
    /* Click ok */

    it("AMI-1808:32, AMI-1809:33 & AMI-1810:34, Paste Tag Relations window should not display and copied object should "+
       "get linked with selected Tag relation", function() {

        cy.start('AMI-1808:32, AMI-1809:33 & AMI-1810:34');
        
        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opened With List");
        
        // Click on tags
        cy.addLog("Select "+ anyGadget.tags);
        browserGadgetUtils.setStructureType(anyGadget.tags);

        // Select Any Browser Object from Browser gadget
        cy.addLog("Browse any Gadget");
        browserGadgetUtils.setBrowseContext('QA Index/Pomme');
        cy.contains("Pomme").click();

        // Select copy option on Browser Gadget menu
        cy.addLog("Do Copy and Paste");
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Select Paste icon
        cy.get(tagRelationGadgetDom.menuPaste).click();

        // Displaying Error Attempting Relation Object itself
        cy.get('.ws-notification-content').find('.mdi').click();
        cy.addLog('Displaying Error Close error');

        // Should not Displaying paste tag relation window
        cy.contains("Paste Tags Relations").should('not.exist');
        cy.addLog("Paste Tags Relation Window Should not Display");

        // Click on tags to minimize
        cy.addLog("Minimize "+ anyGadget.tags)
        browserGadgetUtils.setStructureType(anyGadget.tags);

        // Select Events
        cy.addLog("Open "+ anyGadget.type)
        browserGadgetUtils.setStructureType(anyGadget.type);

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext);
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Select Paste icon again
        cy.addLog("Select Paste Options from Tag Relation Gadget");
        cy.get(tagRelationGadgetDom.menuPaste).click();

        // Displaying paste tag relation window
        cy.get('.title').contains("Paste Tags Relations").should('be.visible');
        cy.addLog("Displaying Paste Tags Relations Window");

        // Copied object Should present in mapped column
        cy.get(pasteTagRelationWindowDom.pasteRelation).should('be.visible');
        cy.addLog("Copied Objects Should display in Mapped Column");

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.addLog("Select Ok to Submit");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1808:32, AMI-1809:33 & AMI-1810:34');
    });
    
});

