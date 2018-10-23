// Checking Menu Options Copy icon state From AMI-1783:7 to AMI-1784:8

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
    let anyGadget = amiValue.anyGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Checking Menu Options Copy Icon State");
    
    });

    /* Select any Tag relation by selecting checkbox beside the Tag relation */

    it("AMI-1783:7, Copy option should be disable state", function() {

        cy.start('AMI-1783:7');

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
        
        // Check on JLD Single Index
        cy.addLog("Check on JlD Single Index");
        cy.get(amiDom.anyGadget.jldSingleIdxId).check().should('be.checked');
        cy.addLog("JLD Single Index Successfully");
        
        // Copy Option should be disable State
        cy.addLog("Verify Tag relation Menu Copy Options Should be Disable State");
        cy.get(tagRelationGadgetDom.menuCopy, { force: true}).should('not.be.enabled');
        cy.addLog("Menu Copy is Disabale State");

        cy.finish('AMI-1783:7');
        
    });

    /* Select any object which is linked to Tag relation by selecting checkbox beside the Object */
    
    it("AMI-1784:8, Copy option should be in enabled state", function() {

        cy.start('AMI-1784:8');
        
        // Select QA Index
        cy.addLog("Select QA Index  and Check on Inside object");
        cy.get(amiDom.anyGadget.qaIndexId).click();
        
        // Check on Chair
        cy.get(amiDom.anyGadget.qaIndexChair).check().should('be.checked');
        cy.addLog("Checked Object in Qa Index");

        // Verify Copy option should be enable state
        cy.addLog("Verify Copy Option Should be Enable State");
        cy.get(tagRelationGadgetDom.menuCopy).should('not.be.disabled');

        // Verify copy option enable state in menu
        cy.get(tagRelationGadgetDom.menuIcon).click();

        cy.get(tagRelationGadgetDom.indexMenuCopy).should('be.visible');
        cy.addLog("Copy Option is Enabled Successfully");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1784:8');
        
    });

});