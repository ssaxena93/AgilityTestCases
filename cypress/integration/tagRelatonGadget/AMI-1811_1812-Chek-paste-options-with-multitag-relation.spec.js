// Check paste icon options in tag relations gadget from AMI-1811:35 to AMI-1812:36

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

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste Options with multitag relation");
    
    });

    /* Copy 2 objects, select a Multi Tag relation and select Paste icon */
    /* Copy a object and link it to a Tag relation. Copy another object and link it to same Tag relation */
    it("AMI-1811:35 & AMI-1812:36, Both the objects should linked to multi tag relation "+
        "and First object should replace with second object", function() {

        cy.start("AMI-1811:35");

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.tagRelation);

        // Browse Gadget Menu
        anyGadgetUtils.openGadgetOrGroup(anyGadgetValue.name);
        
        // Click on tags
        browserGadgetUtils.setStructureType(anyGadgetValue.tags);

        // Select Any Browser Object from Browser gadget
        browserGadgetUtils.setBrowseContext('QA Index/Pomme');
        cy.contains("Pomme").click();

        // Select copy option on Browser Gadget menu
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Click on tags to minimize
        browserGadgetUtils.setStructureType(anyGadgetValue.tags);

        // Select Events
        browserGadgetUtils.setStructureType(anyGadgetValue.type);

        // Select QA Data 2 From Events
        browserGadgetUtils.setBrowseContext(anyGadgetValue.browseContext);

        // Copy object and Select multi tags
        cy.wait(2000);
        cy.get('#check-idx_1219').check().should('be.checked');
        cy.get('#check-idx_1191').check().should('be.checked');

        // Select Paste icon 
        cy.get(amiDom.tagRelationGadget.menuPaste).click();

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.wait(1000);

        // Verify Presence
        cy.contains("Pomme").should('be.visible');

        // Select tag gadget 
        cy.contains(amiValue.attribute.inputValue).click();

        // Click On Main Index Terms
        cy.get(anyGadgetDom.mainIndexTermsId).click();

        // Select Cantilever Chair
        cy.contains(anyGadgetValue.cantileverChair).click();

        // Replace with Exisiting one
        cy.get(anyGadgetDom.replace).click();

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.wait(1000);

        // Replace Tag Should be visible
        cy.contains(anyGadgetValue.cantileverChair).should('be.visible');

        // Select tag gadget Again
        cy.contains(amiValue.attribute.inputValue).click();

        // Remove tag
        cy.get(anyGadgetDom.remove).click();

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.wait(1000);

        // Select another tag gadget Again
        cy.contains(amiValue.attribute.attributeName).click();

        // Remove tag
        cy.get(anyGadgetDom.remove).click();

        cy.log("Removed the linked tag relation");

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-1811:35');
        
    });
   
});