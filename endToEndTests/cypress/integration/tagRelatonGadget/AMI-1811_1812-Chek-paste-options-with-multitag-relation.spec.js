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
    let anyGadget = amiValue.anyGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Check paste Options with multitag relation");
    
    });

    /* Copy 2 objects, select a Multi Tag relation and select Paste icon */
    /* Copy a object and link it to a Tag relation. Copy another object and link it to same Tag relation */
    
    it("AMI-1811:35 & AMI-1812:36, Both the objects should linked to multi tag relation "+
       "and First object should replace with second object", function() {
           
        cy.start("AMI-1811:35 & AMI-1812:36");

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
        
        // Click on tags
        cy.addLog("Select "+ anyGadget.tags);
        browserGadgetUtils.setStructureType(anyGadget.tags);

        // Select Any Browser Object from Browser gadget
        cy.addLog("Select any Browse Gadget");
        browserGadgetUtils.setBrowseContext("QA Index/Pomme");
        cy.contains("Pomme").click();

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");

        // Select copy option on Browser Gadget menu
        cy.addLog("Select Copy on Browser Options");
        cy.get(anyGadgetDom.browserIconCopy).click();

        // Click on tags to minimize
        cy.addLog('Select '+ anyGadget.tags +"to Minimize");
        browserGadgetUtils.setStructureType(anyGadget.tags);

        // Select Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.type);
        browserGadgetUtils.setStructureType(anyGadget.type);
        cy.addLog(anyGadget.type, " Displayng with List Of Objects");

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext);
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Copy object and Select multi tags
        cy.addLog("Check Multi Child Objects, Do Copy & Paste");
        cy.wait(2000);
        cy.get('#check-idx_1219').check().should('be.checked');
        cy.get('#check-idx_1191').check().should('be.checked');

        // Select Paste icon 
        cy.get(amiDom.tagRelationGadget.menuPaste).click();

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.addLog("Select Ok to Submit");
        cy.wait(1000);

        // Verify Presence
        cy.contains("Pomme").should('be.visible');

        // Select tag gadget
        cy.addLog("Select any tag gadget and Add New Child Object");
        cy.contains(amiValue.attribute.inputValue).click();

        // Click On Main Index Terms
        cy.get(anyGadgetDom.mainIndexTermsId).click();

        // Select Cantilever Chair
        cy.contains(anyGadget.cantileverChair).click();

        // Replace with Exisiting one
        cy.get(anyGadgetDom.replace).click();

        // Click ok submit
        cy.get(amiDom.amiLogin.ok).click();
        cy.wait(1000);
        cy.addLog('Should be replace with New child');

        // Replace Tag Should be visible
        cy.contains(anyGadget.cantileverChair).should('be.visible');
        cy.addLog("Relace Child : "+ anyGadget.cantileverChair);

        // Select tag gadget Again
        cy.contains(amiValue.attribute.inputValue).click();

        // Remove tag
        cy.addLog('Remove Cretaed Childs')
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
        cy.addLog("Childs are Removed");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-1811:35 & AMI-1812:36');
        
    });
   
});