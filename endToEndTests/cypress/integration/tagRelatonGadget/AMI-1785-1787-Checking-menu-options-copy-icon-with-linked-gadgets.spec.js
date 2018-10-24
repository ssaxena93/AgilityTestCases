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

    let anyGadget = amiValue.anyGadget;
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
        cy.addLog(anyGadget.type +" Displayng with List Of Objects");

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext+ "object");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Attribute");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");

        // Click on JLD Single Index
        cy.addLog("Select "+ anyGadget.jldSingleIndex +" Object to add Child Objects");
        cy.contains(anyGadget.jldSingleIndex).click();

        // Click On Main Index Terms
        cy.addLog("Object Window opend and add any Object");
        cy.get(anyGadgetDom.mainIndexTermsId).click();

        // Select Cantilever Chair and Add 
        cy.contains(anyGadget.cantileverChair).click();
        cy.get(anyGadgetDom.add).click();
        cy.get(amiDom.amiLogin.ok).click();
        cy.addLog(anyGadget.cantileverChair," Child Object added Successfully");

        //Veirify Cantilever Chair Tag Added
        cy.addLog("Verify "+ anyGadget.cantileverChair," Child Object Under "+ anyGadget.jldSingleIndex, " and Check on");
        cy.wait(2000);
        cy.get(anyGadgetDom.jldSingleIdxArrow, {timeout:2000}).click();
        cy.contains(anyGadget.cantileverChair).should('be.visible');   

        // Chek on Cantilever Chair tag
        cy.get(anyGadgetDom.cantileverChairCheck).check().should('be.checked');
        cy.addLog(anyGadget.cantileverChair, "is present and Checked");

        // Copy Option Should be visible Select Copy
        cy.addLog("Tag Relations Index menu Copy Option enabled Do copy");
        cy.get(tagRelationGadgetDom.menuCopy).click();
        cy.addLog("Child object Copied Successfully");

        // open ClipBoard
        cy.addLog("Open Clip Board");
        cy.get(anyGadgetDom.clipboard).click();

        // Verify Copied Object Should be Linked to ClipBoard
        cy.contains(anyGadget.cantileverChair).should('be.visible');

        // Close ClipBoard
        cy.get(anyGadgetDom.clipboard).click();
        cy.addLog("Should Display Copied Object, then close Clipboard");

        // Remove tag
        cy.addLog("Remove Child Object");
        cy.get(anyGadgetDom.jldSingleIdxArrow, {timeout:2000}).click();
        cy.get('#idx_805 > .ws-rendered-name').click();
        cy.get(anyGadgetDom.remove).click();
        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.log("Removed the linked tag relation");
        cy.addLog("Child Object Removed Successfully");
        

        cy.finish('AMI-1785:9');
        
    });
   
    /* Select a object in Browse gadget and click on Action 
       menu of Browse gadget */

    it("AMI-1786:10, The object is copied with Tag relation paste link option should be in disabled stage", function() {

        cy.start('AMI-1786:10');

        // Click on Action Menu on Browse gadget
        cy.addLog("Select Browse icon");
        cy.get(anyGadgetDom.browserIcon).click();

        // Paste link Options Should be Disable State
        cy.contains('Paste Link...').should('not.be.enabled');
        cy.contains('Paste Duplicate...').should('not.be.enabled');
        cy.addLog("Paste Link & Paste Duplicate are Disabled State");

        cy.finish('AMI-1786:10');
        
    });

    /* Select a Tag relation from Tag relation gadget */

    it("AMI-1787:11, Paste icon should got enabled", function() {

        cy.start('AMI-1787:11');

        // Select Tag Relation Gadget Bag_index
        cy.addLog("Check On Bag Index and Paste Icon should Enabled");
        cy.get(anyGadgetDom.bagIndexCheck).check().should('be.checked');

        // Check Paste icon Enabled
        cy.get(tagRelationGadgetDom.menuPaste).should('not.be.disabled').and('be.visible');

        // Check Paste Option Enabled state in Menu 
        cy.get(tagRelationGadgetDom.menuIcon).click();
        cy.get(tagRelationGadgetDom.indexMenuPaste).should('be.visible');
        cy.addLog("Paste options are Enabled");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1787:11');
        
    });

});