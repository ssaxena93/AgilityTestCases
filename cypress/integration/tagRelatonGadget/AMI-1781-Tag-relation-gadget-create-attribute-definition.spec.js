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

    /* Create a Tag relation attribute in Java client,/AMI, Login to webclient,
    go to workspace, select a object from browse gadget and expand
    Tag Relations gadget */

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Tag Relation Gadget Create Attribute Definition");
    
    });

    it("AMI-1781:5, Created Tag relation should display in Tag Relations gadget", function() {

        cy.start('AMI-1781:5');
        
        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        let attribute = amiDom.attribute;

        // Select configuraion Options
        changeDropdownUtils.openConfigurationOptions();

        // Open the Attribute Definition tool.
        configOptionsUtils.selectTool(attribute.tool);

        // Open 'Create Attribute Definition...'
        configOptionsUtils.selectToolMenuItem(attribute.menu);

        // Input attribute name
        cy.get(attribute.inputId).type(amiValue.attribute.name)
        .should('have.value', amiValue.attribute.name);
        
        // Select type of Attribute Value 10 is Tag Relation 
        cy.get(attribute.inputType).select('10');
        
        // Clicking on ok to submit the form
        cy.get(amiDom.amiLogin.ok).click();

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

        // Select gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.name);

        // Browse Gadge
        browserGadgetUtils.setStructureType(amiValue.anyGadget.type);

        // Select Events in Browser Gadget
        browserGadgetUtils.setBrowseContext(amiValue.anyGadget.browseContext);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.tagRelation);

        // Verify new tagRelation
        cy.contains(amiValue.attribute.name).should('be.visible');
        
        // Logout from AMI
        loginUtils.logoutFromAMI();
    
        cy.finish('AMI-1781:5');
        
    });
         
});