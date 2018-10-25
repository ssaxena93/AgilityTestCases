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
    cy.addLog(anyGadget.name +" Opened With List");

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

    // Click on index menu icon
    cy.addLog("Trying to lock the Current Object");
    cy.get(amiDom.tagRelationGadget.menuIcon).click();
    
    // Lock the Current Object 
    cy.contains('Lock to Current Object').click();
    cy.addLog("Locked the Current Object");

    // Again Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();

    // Veiryfying All tagRealtion Index Menu Options
    cy.addLog("Veiryfying All tagRealtion Index Menu Options");
    cy.wrap(amiValue.indexMenuIconVerifyActionById).each(id => {
      cy.get(id.id).should('be.visible').then(() => {
          cy.log(`${id.title} is present`);
          cy.addLog(`${id.title} is present`);
        });
    });
    cy.addLog("All tagRealtion Index Menu Options are Available");

    cy.get('#IndexGadget > .ws-gadget-content').click();

    cy.finish('AMI-1820:44');
    
  });

  /* Select Options */
  
  it("AMI-1821:45, Tag Relation Gadget Options window should open with Only "+  
     "show paste dialog when auto map fails checkbox, OK, cancel buttons, "+
     "Close icon", function() {
       
    cy.start('AMI-1821:45');
      
    cy.addLog("Trying to open Tag Relation Gadget Options");

    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();
          
    // Click on options in Menu
    cy.get(amiDom.tagRelationGadget.indexMenuOptions).click();
    cy.addLog("Tag Relation Gadget Options opened")

    // Displaying tag relation gadget options and verifying 
    cy.contains('Only show Paste dialog when auto map fails').should('be.visible');
    cy.addLog("Only show Paste dialog when auto map fails is present");
    cy.get(amiDom.tagRelationGadget.optionsPopUp).find('input[type="checkbox"]').should('be.visible');
    cy.addLog("Checkbox is present");
    cy.get(amiDom.amiLogin.ok).should('be.visible');
    cy.addLog('Ok is present');
    cy.get(amiDom.amiLogin.cancel).should('be.visible');
    cy.addLog('Cancel is present');

    cy.finish('AMI-1821:45');

  });

  /* Click on Cancel Close icon */

  it("AMI-1822:46, Tag Relation Gadget Options should get closed", function() {
    
    cy.start('AMI-1822:46');

    cy.addLog("Trying to close Tag Relation Gadget Options");
    // Click on Cancel 
    cy.get(amiDom.amiLogin.cancel).click();
    cy.addLog("Tag Relation Gadget Options closed");

    cy.finish('AMI-1822:46');

  });

  /* Uncheck/check Only show paste dialog when auto map fails 
    checkbox and click on OK button */

  it("AMI-1823:47, Options is saved", function() {
 
    cy.start('AMI-1823:47');
    
    cy.addLog("Trying to Check the Only show Paste dialog when auto map fails checkbox");

    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();
        
    // Click on options in Menu
    cy.get(amiDom.tagRelationGadget.indexMenuOptions).click();

    // Check the Only show Paste dialog when auto map fails checkbox
    cy.get(amiDom.tagRelationGadget.optionsCheckBox).check().should('be.checked');
    cy.addLog("Check the Only show Paste dialog when auto map fails");

    // Click ok option saved
    cy.get(amiDom.amiLogin.ok).click();

    cy.finish('AMI-1823:47');

  });

  /* Select objects linked to the Multi-instance tag relation 
     and click on re-order option */

  it("AMI-1824:48, Reorder window opens, where on reordering the objects linked "+ 
     "and click on OK button, re-orders the objects beneath the Tag relation", function() {

    cy.start('AMI-1824:48');
      
    cy.addLog("Trying to check Multi-instance tag relation");
    
    // Check the Multi-instance tag relation
    cy.get(amiDom.anyGadget.cypressRelationTagCheck).check();
    cy.addLog("Multi-instance tag relation is checked");

    cy.addLog("Trying to re-order the objects beneath the Tag relation");
    // Click on index menu icon
    cy.get(amiDom.tagRelationGadget.menuIcon).click();

    // Click on the re-order in menu
    cy.get(amiDom.tagRelationGadget.indexMenuReorder).click();

    // Click on reverse button on the pop up
    cy.get(amiDom.tagRelationGadget.reorderReverse).click();
    
    // Submit changes
    cy.get(amiDom.amiLogin.ok).click();
    cy.addLog("Re-order the objects beneath the Tag relation is done");

    // Logout from AMI
    cy.addLog("Trying to Logout");
    loginUtils.logoutFromAMI();
    cy.addLog("Logout Sucessfully");

    cy.finish('AMI-1824:48');
    
  });

});