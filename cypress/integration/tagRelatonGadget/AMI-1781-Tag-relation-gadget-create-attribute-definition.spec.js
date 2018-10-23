/* Tag Relation Gadget with create attribute definition AMI-1781:5 */

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/ravi_utils/configOptionsUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');

// AMI Data Values File
const amiValue = require('../../fixtures/amiDataValue');

// AMI DOM Elements File
const amiDom = require('../../fixtures/amiDomElements');

describe("Tag Relation Gadget Create Attribute Definition AMI-1781:5", function() {

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Tag Relation Gadget Create Attribute Definition");
    
    });

    /* Create a Tag relation attribute in Java client,/AMI, Login to webclient,
       go to workspace, select a object from browse gadget and expand
       Tag Relations gadget 
    */

    it("AMI-1781:5, Created Tag relation should display in Tag Relations gadget", function() {

        cy.start('AMI-1781:5');
        
        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        let attribute = amiDom.attribute;
        let anyGadget = amiValue.anyGadget;

        // Select configuraion Options
        cy.addLog("Select Configuration Options");
        changeDropdownUtils.openConfigurationOptions();
        cy.addLog("Should Displays Configuration Options with all Tools");

        // Open the Attribute Definition tool.
        cy.addLog("Display "+ attribute.tool);
        configOptionsUtils.selectTool(attribute.tool);
        cy.addLog("Select "+ attribute.tool);

        // Open 'Create Attribute Definition...'
        cy.addLog("Create an Attribute")
        configOptionsUtils.selectToolMenuItem(attribute.menu);

        // Input attribute name
        cy.get(attribute.inputId).type(amiValue.attribute.name)
        .should('have.value', amiValue.attribute.name);
        
        // Select type of Attribute Value 10 is Tag Relation 
        cy.get(attribute.inputType).select(amiValue.attribute.inputTypeValue);
        
        // Clicking on ok to submit the form
        cy.get(amiDom.amiLogin.ok).click();
        cy.addLog(amiValue.attribute.name +" Attribute Created");

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

        // Verify new atribute
        cy.addLog("Verifying Created Attribute");
        cy.contains(amiValue.attribute.name).should('be.visible');
        cy.addLog("Displaying "+ amiValue.attribute.name);
        
        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");
    
        cy.finish('AMI-1781:5');
        
    });
         
});