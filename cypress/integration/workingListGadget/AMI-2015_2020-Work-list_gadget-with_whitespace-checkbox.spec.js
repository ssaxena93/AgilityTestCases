// Work list gadget with whitespace characters as delimiter Test Cases from AMI-2015:22 to AMI-2020:27

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget with Use whitespace characters as delimiter?", function() {

  let workListGadgetValue =  amiValue.workListGadget; 
  let workListGadgetDom =  amiDom.workListGadget;

  before("Adding log header", function() {

    // Adding Heading of Test Scenario 
    cy.logHeader("Work list gadget with whitespace characters as delimiter");

  });

  beforeEach("Login to AMI for Each Test Case", function() {

    // login in AMI
    cy.addLog("Launch Browser with URL and trying to Login");
    loginUtils.loginToAMI(amiValue.amiLogin.username);
    cy.addLog("Browser Launched with URL and Logged in Successfully");

    // Open QA Working List Gadget (this workspace has the required browser gadgets)
    cy.addLog("Trying to Change Worksapce to "+ amiValue.amiLogin.workListGadget);
    changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);
    cy.addLog(amiValue.amiLogin.workListGadget +" Changed Successfully");

    // Open WorkList Gadget
    cy.addLog("Open "+ amiValue.anyGadget.workListGadget);
    anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);
    cy.addLog(amiValue.anyGadget.workListGadget +" Opened Successfully");

  });

  afterEach("Logout from AMI for Each Test Case", function(){

    // Logout from AMI
    cy.addLog("Trying to Logout");
    loginUtils.logoutFromAMI();
    cy.addLog("Logout Sucessfully");
  
  });

  /* Check Use Whitespace characters as delimiter checkbox. . */
  
  it("AMI-2015:22, When checked, tabs or newlines (but not space) should be treated as delimiter..", function() {

    cy.start('AMI-2015:22');

    // Check on White Space Charater as delimiter
    cy.addLog("Check on White Space Charater as delimiter")
    cy.get(workListGadgetDom.whitespaceCharacterCheckBox).check().should('be.checked');

    // delimiter should be disabled
    cy.get(workListGadgetDom.delimiterTextBox).should('be.disabled');
    cy.addLog("Checked White Space Charater as delimiter & Delimiter is Disabled");

    cy.finish('AMI-2015:22');
    
  });

  /*1.Enter the two object id's in two different column of excel. 
    2.Select 'Object ids' in List element as field. 
    3.Check 'Use whitespace characters as delimiter'. 
    4.Copy both the object id's from excel and paste it in the 'List of objects' field. 
    5.The object id's are separated by tabs. 
    6.Select Add and click on Apply. 
  */
  it("AMI-2016:23, The specified object should get linked with list object.", function() {

    cy.start('AMI-2016:23');

    // Enter the two object id's in two different column of excel. 
    cy.log('Cypress is not suporting Excel');

    // Select Object id as in list Element
    cy.get(workListGadgetDom.listElementsDropDown)
    .select(workListGadgetValue.listElementValue).should('have.value', "id");
    cy.addLog("Select List Elements DropDown as Object Id");

    // White Space Charater as delimiter shoud be checked
    cy.get(workListGadgetDom.whitespaceCharacterCheckBox).should('be.checked');
    cy.addLog("checked White Space Charater as delimiter");

    // In the 'List of Objects' field, enter id's of two different object separated by tabs
    cy.get(workListGadgetDom.listObjectTextBox).clear()
    .type(workListGadgetValue.listObjectTextBoxValue).type('    ').type(workListGadgetValue.listObjectTextBoxValue2);
    cy.addLog("Enter Two Different Values in list object Text Box Sepertaed by Tabs : "+ 
    workListGadgetValue.listObjectTextBoxValue +" "+ workListGadgetValue.listObjectTextBoxValue2);
    
    // Select Add
    cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

    // Click Apply button
    cy.get(workListGadgetDom.apply).click({ force:true });
    cy.addLog("Select Add & Apply");

    cy.finish('AMI-2016:23');
  });

  /*1.Enter the two object id's in two different rows of excel. 
    2.Select 'Object ids' in List element as field. 
    3.Check 'Use whitespace characters as delimiter'. 
    4.Copy both the object id's from excel and paste it in the 'List of objects' field. 
    5.The object id's are copied in two different lines. 
    6.Select Add and click on Apply.
  */
  
  it("AMI-2017:24, The specified object should get linked with list object.", function() {

    cy.start('AMI-2017:24');

    // In the 'List of Objects' field, enter id's of two different object separated by tabs
    cy.get(workListGadgetDom.listObjectTextBox).clear()
    .type(workListGadgetValue.listObjectTextBoxValue).type(' ').type(workListGadgetValue.listObjectTextBoxValue2);
    cy.addLog("Enter Two Different Values in list object Text Box Sepertaed by Space : "+
    workListGadgetValue.listObjectTextBoxValue +" "+ workListGadgetValue.listObjectTextBoxValue2);

    // Select Add
    cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

    // Click Apply button
    cy.get(workListGadgetDom.apply).click({ force:true });
    cy.addLog("Select Add & Apply");


    // Display message No Matching Object found
    cy.contains(workListGadgetValue.error1259).should('be.visible');
    cy.log("Displaying 1259 Error");
    cy.addLog("Displayig Error : "+ workListGadgetValue.error1259);

    // close the error
    cy.get(amiDom.amiLogin.errorClose).click( {force:true});

    cy.finish('AMI-2017:24');
  });

  /*1.Enter the two different object names in two different column of excel. 
    2.Select 'Object Names' in List element as field. 
    3.Check 'Use whitespace characters as delimiter'. 
    4.Copy both the object names from excel and paste it in the 'List of objects' field. 
    5.The object names are separated by tabs. 
    6.Select Add and click on Apply. 
  */
 
  it("AMI-2018:25, The specified object should get linked with list object.", function() {

    cy.start('AMI-2018:25');
    
    cy.log("Cypress is not supporting Excel");

    // Select Object Name as List element
    cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");
    cy.addLog("Select List Elements DropDown as Object Names");
    
    // Check 'Use whitespace characters as delimiter'
    cy.get(workListGadgetDom.whitespaceCharacterCheckBox).should('be.checked');
    cy.addLog("Cheked on whitespace characters as delimiter");

    // Add two Objects are seperated by tabs
    cy.get(workListGadgetDom.listObjectTextBox).clear()
    .type(workListGadgetValue.listObjectTextBoxValueAlphabets).type('    ').type(workListGadgetValue.listObjectTextBoxValueAlphabets2)
    cy.addLog("Enter Two Different Values in list object Text Box Sepertaed by tabs : "+ 
    workListGadgetValue.listObjectTextBoxValueAlphabets +" "+ workListGadgetValue.listObjectTextBoxValueAlphabets2);

    // Select Add
    cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

    // Click Apply button
    cy.get(workListGadgetDom.apply).click({ force:true });
    cy.addLog("Select Add & Apply");

    // Display message No Matching Object found
    cy.contains(workListGadgetValue.error1259).should('be.visible');
    cy.addLog("Displayig Error : "+ workListGadgetValue.error1259);
    cy.log("Displaying 1259 Error");

    // close the error
    cy.get(amiDom.amiLogin.errorClose).click( {force:true});

    cy.finish('AMI-2018:25');
  
  });

  /*1.Enter the two different object names in two different rows of excel. 
    2.Select 'Object Names' in List element as field. 
    3.Check 'Use whitespace characters as delimiter'. 
    4.Copy both the object names from excel and paste it in the 'List of objects' field. 
    5.The object names are copied in two different lines. 
    6.Select Add and click on Apply.
  */
  
  it("AMI-2019:26, The specified object should get linked with list object.", function() {

    cy.start('AMI-2019:26');
    
    cy.log("Cypress is not supporting Excel");

    // Select Object Name as List element
    cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");
    cy.addLog("Select List Elements DropDown as Object Names");

    // Check 'Use whitespace characters as delimiter'
    cy.get(workListGadgetDom.whitespaceCharacterCheckBox).should('be.checked');
    cy.addLog("Cheked on whitespace characters as delimiter");

    // Add two Objects are seperated by enter key
    cy.get(workListGadgetDom.listObjectTextBox).clear()
    .type(workListGadgetValue.listObjectTextBoxValueAlphabets).type('{enter}').type(workListGadgetValue.listObjectTextBoxValueAlphabets)
    cy.addLog("Enter Two Different Values in list object Text Box Sepertaed by lines : "+ 
    workListGadgetValue.listObjectTextBoxValueAlphabets +" "+ workListGadgetValue.listObjectTextBoxValueAlphabets2);

    // Select Add
    cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

    // Click Apply button
    cy.get(workListGadgetDom.apply).click({ force:true });
    cy.addLog("Select Add & Apply");


    cy.finish('AMI-2019:26');
    
  });

  /* Uncheck Use Whitespace characters as delimiter checkbox. */

  it("AMI-2020:27, When unchecked, delimiter specified in the 'Delimiter' field should be treated as delimiter.", function() {

    cy.start('AMI-2020:27');
    
    // Un check Use whitespace characters as delimiter checkbox
    cy.get(workListGadgetDom.whitespaceCharacterCheckBox).uncheck().should('not.be.checked');
    cy.addLog("Uncheck whitespace characters as delimiter checkbox")

    // delimiter should be enabled
    cy.get(workListGadgetDom.delimiterTextBox).should('be.enabled');
    cy.addLog("Delimiter Should be Enabled");

    cy.finish('AMI-2020:27');
    
  });

});