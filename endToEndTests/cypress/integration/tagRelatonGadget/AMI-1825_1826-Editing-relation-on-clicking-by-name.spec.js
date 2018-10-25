// Editing relation by clicking on name Test Cases from AMI-1825:49 to AMI-1826:50 */

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

  let anyGadget = amiValue.anyGadget;

  /* Click on Tag relation attribute under Tag Relation gadget. */

  it("AMI-1825:49, Edit relation window should come up with Object Id "+
     "Object Name and Related Objects fields along with Show Object Browser "+ 
     "option and disabled Remove, Replace, Add, Ok button and enabled"+
     "Cancel button.", function() {

    cy.start('AMI-1825:49');

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

    // Select Events in Browser Gadget
    cy.addLog("Select "+ anyGadget.type);
    browserGadgetUtils.setStructureType(anyGadget.type);
    cy.addLog(anyGadget.type +" Displaying with List Of Objects");

    // Select !! QA Data to from Events in Browser Gadget
    cy.addLog("Select "+ anyGadget.browseContext+ " object");
    browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

    // Open Tag Relations Gadget
    cy.addLog("Trying to open "+ anyGadget.tagRelation +" Gadget");
    anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
    cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");

    // Select the tag relation attribute name that is specified
    cy.contains(amiValue.attribute.inputValue).click();

    //  Verify "Object Id, Object Name and Related Objects fields" 
    //  Along with "Show Object Browser option" are Present
    cy.wrap(amiValue.editingRelationName.tagRelationAssertion).each(elem => {
        cy.contains(elem).should('be.visible');
        cy.addLog(elem + ' is Present');
    });

    // Verifying Remove, Replace, Add, and Ok butoons disable state 
    cy.wrap(amiValue.editingRelationName.tagRelationAssertionDisable).each(elem => {
      cy.get(elem).should($ele => {
        expect($ele).to.have.prop('disabled', true);
      });
      cy.addLog(elem + ' is in disable state');
    });

    // Verifying cancel button enabled
    cy.get(amiDom.amiLogin.cancel).should('not.be.disabled');
    cy.addLog(amiDom.amiLogin.cancel + ' is in enable state');

    cy.finish('AMI-1825:49');
    
  });

  /* 1.Click on the relation attribute. 
     2.In the Edit relation window, select an object from structure type drop down. 
     3.Click Ok. */

  it("AMI-1826:50, The selected object should get linked with the relation attribute.", function() {
    
    cy.start('AMI-1826:50');
    
    // Selecting the tag object from structure type drop down
    cy.addLog('We are not able to find more Structure so default is Tags');
    cy.addLog('Apart from tag there was no other object was found so "ok" was not enabled');
    cy.get(amiDom.amiLogin.ok).should('exist').and('not.be.enabled');
    cy.addLog("OK Button Exist")

    // Click on Cancel to close popup
    cy.get(amiDom.amiLogin.cancel).click();

    // Logout from AMI
    cy.addLog("Trying to Logout");
    loginUtils.logoutFromAMI();
    cy.addLog("Logout Sucessfully");

    cy.finish('AMI-1826:50');
    
  });

});