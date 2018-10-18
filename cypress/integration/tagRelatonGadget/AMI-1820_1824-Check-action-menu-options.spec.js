// Check Action Menu options Test Case from AMI-1820:44 to AMI-1824:48 

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe('Check Action Menu Options in Tag Relation Gadgets', function() {

  before("Adding log header", function() {

    // Adding Heading of Test Scenario 
    cy.logHeader("Check action menu options");

  });
  
  /* Verifying Action menu functionality 
     Click on Action Menu */

  let anyGadget = amiValue.anyGadget;

  it("AMI-1820:44, Lock to Current Object, Copy, Paste, Unlink, Reoder "+ 
      "Options, refresh and Help options should be present", function() {
      
    cy.start('AMI-1820:44');

    // login in AMI
    loginUtils.loginToAMI(amiValue.amiLogin.username);

    // Changing the dropdown workspace
    changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);

    // Browse Gadget Menu
    anyGadgetUtils.openGadgetOrGroup(anyGadget.name);

    // Select Events
    browserGadgetUtils.setStructureType(anyGadget.type);

    // Select QA Data 2 From Events
    browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

    // Open Tag Relations Gadget
    anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);

    // Veiryfying All tagRealtion toolbar options (Recently removed)
    // cy.wrap(amiValue.toolbarVerifyAction).each(elem => {
    //   cy.get(elem.id).should('be.visible').then(() => {
    //       cy.log(`${elem.title} is present`);
    //     });
    // });

    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();
    
    // Lock the Current Object 
    cy.contains('Lock to Current Object').click();

    // Again Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();

    // Veiryfying All tagRealtion Index Menu Options
    cy.wrap(amiValue.indexMenuIconVerifyActionById).each(id => {
      cy.get(id.id).should('be.visible').then(() => {
          cy.log(`${id.title} is present`);
        });
    });

    cy.get('#IndexGadget > .ws-gadget-content').click();

    cy.finish('AMI-1820:44');
    
  });

  /* Select Options */

  it("AMI-1821:45, Tag Relation Gadget Options window should open with Only "+  
      "show paste dialog when auto map fails checkbox, OK, cancel buttons, "+
      "Close icon", function() {

    cy.start('AMI-1821:45');

    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();
        
    // Click on options in Menu
    cy.get(amiDom.tagRelationGadget.indexMenuOptions).click();

    // Displaying tag relation gadget options and verifying 
    cy.contains('Only show Paste dialog when auto map fails').should('be.visible');
    cy.get(amiDom.tagRelationGadget.optionsPopUp).find('input[type="checkbox"]').should('be.visible');
    cy.get(amiDom.amiLogin.ok).should('be.visible');
    cy.get(amiDom.amiLogin.cancel).should('be.visible');

    cy.finish('AMI-1821:45');
  });

  /* Click on Cancel Close icon */

  it("AMI-1822:46, Tag Relation Gadget Options should get closed", function() {
    
    cy.start('AMI-1822:46');

    // Click on Cancel 
    cy.get(amiDom.amiLogin.cancel).click();

    cy.finish('AMI-1822:46');
  });

  /* Uncheck/check Only show paste dialog when auto map fails 
    checkbox and click on OK button */

  it("AMI-1823:47, Options is saved", function() {
 
    cy.start('AMI-1823:47');
    
    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();
        
    // Click on options in Menu
    cy.get(amiDom.tagRelationGadget.indexMenuOptions).click();

    // Check the Only show Paste dialog when auto map fails checkbox
    cy.get(amiDom.tagRelationGadget.optionsCheckBox).check().should('be.checked');

    // Click ok option saved
    cy.get(amiDom.amiLogin.ok).click();

    cy.finish('AMI-1823:47');
  });

  /* Select objects linked to the Multi-instance tag relation 
     and click on re-order option */

  it("AMI-1824:48, Reorder window opens, where on reordering the objects linked "+ 
     "and click on OK button, re-orders the objects beneath the Tag relation", function() {

    cy.start('AMI-1824:48');
      
    // Check the Multi-instance tag relation
    cy.get(amiDom.anyGadget.cypressRelationTagCheck).check();

    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();

    // Click on the re-order in menu
    cy.get(amiDom.tagRelationGadget.indexMenuReorder).click();

    // Click on reverse button on the pop up
    cy.get(amiDom.tagRelationGadget.reorderReverse).click();
    
    // Submit changes
    cy.get(amiDom.amiLogin.ok).click();

    // Logout from AMI
    loginUtils.logoutFromAMI();

    cy.finish('AMI-1824:48');
    
  });

});
