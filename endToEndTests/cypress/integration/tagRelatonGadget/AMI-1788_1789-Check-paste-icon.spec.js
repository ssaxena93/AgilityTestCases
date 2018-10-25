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

    let anyGadget = amiValue.anyGadget;
    let anyGadgetDom = amiDom.anyGadget;
    let tagRelationGadgetDom = amiDom.tagRelationGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste icon Options");
    
    });

    beforeEach("Login to AMI for Each Test Case", function() {

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

    });

   afterEach("Logout from AMI for Each Test Case", function(){

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

    });
    
    /* Verifying Paste icon in Tag Relations screen 
       Copy a relation in the Tag relation gadget */ 

    it("AMI-1788:12, Paste option should get enabled", function() {

        cy.start('AMI-1788:12');

       // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
       cy.addLog("Trying to Change Workspace to "+ amiValue.amiLogin.changeWorkspace);
       changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
       cy.addLog(amiValue.amiLogin.changeWorkspace +" Changed Successfully");

        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opened With List");

        // Select Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.type);
        browserGadgetUtils.setStructureType(anyGadget.type);
        cy.addLog(anyGadget.type +" Displayng with List Of Objects");

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext+ " object");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Attribute");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");
        
        // Click on JLD Single Index
        cy.addLog("Select "+ anyGadget.jldSingleIndex +" Object to add Child Objects");
        cy.contains(anyGadget.jldSingleIndex).click();

        // Click On Main Index Terms
        cy.addLog("Object Window opened and add any Object");
        cy.get(anyGadgetDom.mainIndexTermsId).click();

        // Select Cantilever Chair and Add 
        cy.contains(anyGadget.cantileverChair).click();
        cy.get(anyGadgetDom.add).click();
        cy.get(amiDom.amiLogin.ok).click();
        cy.addLog(anyGadget.cantileverChair +" Child Object added Successfully");

        // Veirify Cantilever Chair Tag Added
        cy.addLog("Verify "+ anyGadget.cantileverChair +" Child Object Under "+ anyGadget.jldSingleIndex + " Check on");
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

        // Paste option should got enabled
        cy.addLog("verify Paste options are be Enabled")
        cy.get(tagRelationGadgetDom.menuPaste).should('not.be.disabled');
        cy.get(tagRelationGadgetDom.menuIcon).click();
        cy.get(tagRelationGadgetDom.indexMenuPaste).should('not.be.disabled');
        cy.addLog("Paste Options are Enabled State");

        // Select !! Demo Catalog from Browse gadgets from Events
        cy.addLog("Select", anyGadget.browseDemoCatalog )
        browserGadgetUtils.setBrowseContext(anyGadget.browseDemoCatalog);

        // Click Paste Icon
        cy.addLog("Select Paste Option & Should Diplay", anyGadget.cantileverChair);
        cy.get(tagRelationGadgetDom.menuPaste).click();
 
        //  Should Visible Cantilever Chair Tag
        cy.contains(anyGadget.cantileverChair).should('be.visible');

        // Click Ok to Submit
        cy.addLog("Select Ok to Submit")
        cy.get(amiDom.amiLogin.ok).click();

        cy.finish('AMI-1788:12');
        
    });

    /* In the Browse Gadget, select any other object 
       and in the Tag relation gadget, 
       click on the Paste icon */

    it("AMI-1789:13, Copied relation should get linked to the new object", function(){

        cy.start('AMI-1789:13');
        
        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opened With List");

        // Select Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.type);
        browserGadgetUtils.setStructureType(anyGadget.type);
        cy.addLog(anyGadget.type +" Displayng with List Of Objects");
 
        //Verify its copied in !!Demo Catalog
        cy.addLog("Select any Other Object from Events and Verify")
        browserGadgetUtils.setBrowseContext(anyGadget.browseQaTestAgain);
        browserGadgetUtils.setBrowseContext(anyGadget.browseDemoCatalog);

        //Veirify Cantilever Chair Tag Added 
        cy.wait(2000)
        cy.get(anyGadgetDom.jldSingleIdxArrow).click();
        cy.contains(anyGadget.cantileverChair).should('be.visible');
        cy.addLog("Copied Relation linked to the new Object")

        // Remove tag
        // Select QA Data 2 From Events
        cy.log("Remove tag");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);
    
        cy.wait(2000);
        // cy.get(anyGadgetDom.jldSingleIdxArrow, {timeout:2000}).click();
        cy.get('#idx_805 > .ws-rendered-name').click();
        cy.get(anyGadgetDom.remove).click();
        cy.log("Removed the linked tag relation");

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.addLog('Tag Removed successfully');
    
        cy.finish('AMI-1789:13');
    });
    
});
