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
        
        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.tagRelation);

        // Click On Help Icon
        cy.log("Help icon will be open in  new window tab, cypress don't have support for multitabs");

        // Verify Help option availble in menu
        cy.get(amiDom.tagRelationGadget.menuIcon).click();
        cy.get(amiDom.tagRelationGadget.indexMenuHelp).should('exist')
        cy.get(amiDom.tagRelationGadget.menuHelp).click();

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1782:6');
        
    });

        
});

