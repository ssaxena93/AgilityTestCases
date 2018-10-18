// Work list gadget with list of objects Test Cases from AMI-2021:28 to AMI-2023:30

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget With List of objects", function() {

  let workListGadgetValue =  amiValue.workListGadget; 
  let workListGadgetDom =  amiDom.workListGadget;

  before("Adding log header", function() {

    // Adding Heading of Test Scenario 
    cy.logHeader("Work list gadget with list of objects");

  });
  
  /* In List of Objects field, enter object id's or object names's separated by the delimiter specified. */
  
  it("AMI-2021:28, Apply button should get enabled.", function() {

    cy.start('AMI-2021:28');

    // login in AMI
    loginUtils.loginToAMI(amiValue.amiLogin.username);

    // Open QA Working List Gadget (this workspace has the required browser gadgets)
    changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);

    // Open WorkList Gadget
    anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);

    // Select any in filter by object type
    cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);

    // Select Object id as in list Element
    cy.get(workListGadgetDom.listElementsDropDown)
    .select(workListGadgetValue.listElementValue).should('have.value', "id");

    // Un check Use whitespace characters as delimiter checkbox
    cy.get(workListGadgetDom.whitespaceCharacterCheckBox).uncheck().should('not.be.checked');

    // Select Delimeter Text Box
    cy.get(workListGadgetDom.delimiterTextBox).clear()
    .type(workListGadgetValue.delimiterDefault)
    .should('have.value', workListGadgetValue.delimiterDefault);

    // In the 'List of Objects' field, enter any value 
    cy.get(workListGadgetDom.listObjectTextBox).clear().type(workListGadgetValue.listObjectTextBoxValue)
    .should('have.value', workListGadgetValue.listObjectTextBoxValue);

    // Apply button should be enable
    cy.get(workListGadgetDom.apply).should('be.enabled');    

    cy.log("Apply is enabled")
    
    cy.finish('AMI-2021:28');
    
  });

  /* Set List of Objects field blank. */

  it("AMI-2022:29, Apply button should get disabled.", function() {

    cy.start('AMI-2022:29');
    
    // In the 'List of Objects' field, enter any value 
    cy.get(workListGadgetDom.listObjectTextBox).clear();

    // Apply button should be disabled
    cy.get(workListGadgetDom.apply).should('be.disabled');

    cy.log("Apply is disabled");

    cy.finish('AMI-2022:29');
    
  });

  /*1.In List of Objects field, enter object id's or object names's separated by the delimiter specified. 
    2.Click on Apply button.
  */
  it("AMI-2023:30, The Objects should get linked with the selected list object.", function() {

    cy.start('AMI-2023:30');

    // In the 'List of Objects' field, enter any value 
    cy.get(workListGadgetDom.listObjectTextBox).clear()
    .type(workListGadgetValue.listObjectTextBoxValue).type(' ').type(workListGadgetValue.listObjectTextBoxValue2);

    // Set Delimiter as ","
    cy.get(workListGadgetDom.delimiterTextBox).clear()
    .type(workListGadgetValue.delimiterDefault)
    .should('have.value', workListGadgetValue.delimiterDefault);

    // Apply button should be disabled
    cy.get(workListGadgetDom.apply).click({force:true});

    // Display message No Matching Object found
    cy.contains(workListGadgetValue.error1253).should('be.visible');
    cy.log("Displaying 1253 Error");

    // logout from AMI
    loginUtils.logoutFromAMI();

    cy.finish('AMI-2023:30');
    
  });

});

