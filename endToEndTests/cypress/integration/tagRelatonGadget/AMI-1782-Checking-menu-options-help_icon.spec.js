// Checking Menu Options Help Icon From AMI-1782:6

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values File
const amiValue = require('../../fixtures/amiDataValue');

// AMI DOM Elements File
const amiDom = require('../../fixtures/amiDomElements');

describe("Checking Menu Options in Tag Relations Gadget", function() {

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Checking Menu Options Help Icon");
    
    });
    
    /* Click on Help icon */ 

    it("AMI-1782:6, Help window should be displayed", function() {

        cy.start('AMI-1782:6');
        
        let anyGadget = amiValue.anyGadget;

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login")
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully")

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Worksapce to "+ amiValue.amiLogin.changeWorkspace);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
        cy.addLog(amiValue.amiLogin.changeWorkspace+ " Changed Successfully");

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation+ " Attribute");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext+ " Objects in "+ anyGadget.tagRelation+ " Atrribute");

        // Click On Help Icon
        cy.log("Help icon will be open in  new window tab, cypress don't have support for multitabs");

        // Verify Help option availble in menu
        cy.addLog("Verify And Select Help Icon in Tag Relation Attribute");
        cy.get(amiDom.tagRelationGadget.menuIcon).click();
        cy.get(amiDom.tagRelationGadget.indexMenuHelp).should('exist')
        cy.get(amiDom.tagRelationGadget.menuHelp).click();
        cy.addLog("Help Window opened successfuly");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1782:6');
        
    });

        
});

