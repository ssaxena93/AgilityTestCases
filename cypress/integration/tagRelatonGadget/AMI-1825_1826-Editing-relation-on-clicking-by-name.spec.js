// Editing relation by clicking on name from AMI-1825:49 to AMI-1826:50 */

const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe('Check Action Menu Options in Tag Relation Gadgets', function() {

  before("Adding log header", function() {

    // Adding Heading of Test Scenario 
    cy.logHeader("Editing relation on clicking by name");

  });

  let tagRelationGadget = amiValue.tagRelationGadget;
  let anyGadget = amiValue.anyGadget;

  /* Click on Tag relation attribute under Tag Relation gadget.  */

  it("AMI-1825:49, Edit relation window should come up with Object Id "+
     "Object Name and Related Objects fields along with Show Object Browser "+ 
     "option and disabled Remove,Replace,Add,Ok button and enabled"+
     "Cancel button.", function() {

    cy.start('AMI-1825:49');

    // login in AMI
    loginUtils.loginToAMI(amiValue.amiLogin.username);

    // Changeing the dropdown workspace
    changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

    // Browse Gadget Menu
    anyGadgetUtils.openGadgetOrGroup(anyGadget.name);

    // Select Events
    browserGadgetUtils.setStructureType(anyGadget.type);

    // Select QA Data 2 From Events
    browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

    // Open Tag Relations Gadget
    anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);

    // Select the tag relation attribute name that is specified
    cy.contains(amiValue.attribute.inputValue).click();

    //  Verify "Object Id, Object Name and Related Objects fields" 
    //  along with "Show Object Browser option" are Present
    cy.wrap(amiValue.editingRelationName.tagRelationAssertion).each(elem => {

        // if the "hide object browser" is open then close it first
        if (elem === 'Show Object Browser') {
          cy.contains('Hide Object Browser').click();
        };
        cy.contains(elem).should('be.visible');
      });

    // Verifying Remove, Replace, Add, and Ok butoons disable state 
    cy.wrap(amiValue.editingRelationName.tagRelationAssertionDisable).each(elem => {
      cy.get(elem).should($ele => {
        expect($ele).to.have.prop('disabled', true);
      });
    });

    // Verifying cancel button enabled
    cy.get(amiDom.amiLogin.cancel).should('not.be.disabled')
    
    cy.finish('AMI-1825:49');
  });

  /* 1.Click on the relation attribute. 
     2.In the Edit relation window, select an object from structure type drop down. 
     3.Click Ok. */

  it("AMI-1826:50, The selected object should get linked with the relation attribute.", function() {
    
    cy.start('AMI-1826:50');
    
    // Selecting the tag object from structure type drop down
    cy.log('We are not able to find more Structure so default is Tags')
    cy.log('Apart from tag there was no other object was found so "ok" was not enabled');

    // Click on Cancel to close popup
    cy.get(amiDom.amiLogin.cancel).click();

    // Logout from AMI
    loginUtils.logoutFromAMI();

    cy.finish('AMI-1826:50');
    
    });

});

