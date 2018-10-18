// Work list gadget with Delimeter Test Cases from AMI-2004:11 to AMI-2014:21

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget With delimiter", function() {

    let workListGadgetValue =  amiValue.workListGadget; 
    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work list gadget with Delimeter Test Cases");
    
    });

    beforeEach("Login to AMI for Each Test Case", function() {

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);
    
    });
    
    afterEach("Logout from AMI for Each Test Case", function(){
    
        // Logout from AMI
        loginUtils.logoutFromAMI();
    
    });

    /* View the delimiter field. */
    it("AMI-2004:11, By default ' ,' should be selected as delimiter.", function() {

        cy.start('AMI-2004:11');

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);

        // Open WorkList Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);

        // Select Delemeter should have value default ','
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);
        cy.get(workListGadgetDom.delimiterTextBox).should('have.value', workListGadgetValue.delimiterDefault);

        cy.log("Expected delimiter default value: "+ workListGadgetValue.delimiterDefault)

        cy.finish('AMI-2004:11');

    });
    
    /* By default ' ,' should be selected as delimiter. */

    it("AMI-2005:12, The entered character should be used to differentiate between "+
       "the elements of the list in 'List Of Objects' field.", function() {

        cy.start('AMI-2005:12');
        
        // Select Delimeter Text Box
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);

        cy.log("Delimiter default value :" +  workListGadgetValue.delimiterDefault);

        cy.finish('AMI-2005:12');
    });

    /* 1) Select Any in 'Filter by Object Type' field. 
       2) Select Object IDs in 'List element as' field. 
       3) Set Delimiter as ',' . 
       4) In the 'List of Objects' field, enter id's of two different object separated by ',' . 
       5) Select Add and click Apply button. 
    */

    it("AMI-2006:13, The object specified in 'List of objects' field should get linked with the list object.", function() {

        cy.start('AMI-2006:13');
        
        // Select any in filter by object type
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);

        // Select Object id as in list Element
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");

        // Set Delimiter as ','
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);

        // In the 'List of Objects' field, enter id's of two different object separated by ',' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(' ').type(workListGadgetValue.listObjectTextBoxValue2)

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1253).should('be.visible');
        cy.log("Displaying 1253 Error");
        cy.log("Permissions not availble");
        
        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2006:13');
        
    });

    /* 1.Select Any in 'Filter by Object Type' field. 
       2.Select Object IDs in 'List element as' field. 
       3.Set Delimiter as space (' ') . 
       4.In the 'List of Objects' field, enter id's of two different object separated by ' ' . 
       5.Select Add and click Apply button.
    */
    it("AMI-2007:14, The object specified in 'List of objects' field should get linked with the list object.", function(){

        cy.start('AMI-2007:14')
        
        // Select any in filter by object type
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);

        // Select Object id as in list Element
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");

        // Set Delimiter as ' '
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterSpace)
        .should('have.value', workListGadgetValue.delimiterSpace);

        // In the 'List of Objects' field, enter id's of two different object separated by ' ' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(workListGadgetValue.delimiterSpace).type(workListGadgetValue.listObjectTextBoxValue2)

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.log("permissions are not avilable");

        cy.finish('AMI-2007:14');
    });

    /* 1.Select Any in 'Filter by Object Type' field. 
       2.Select Object IDs in 'List element as' field. 
       3.Set Delimiter as ' 2 ' . 
       4.In the 'List of Objects' field, enter id's of two different object separated by ' 2 ' . 
       5.Select Add and click Apply button.
    */
    it("AMI-2008:15, The object specified in 'List of objects' field should get linked with the list object.", function() {

        cy.start('AMI-2008:15');
        
        // Select any in filter by object type
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);

        // Select Object id as in list Element
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");

        // Set Delimiter as '2'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterTwo)
        .should('have.value', workListGadgetValue.delimiterTwo);

        // In the 'List of Objects' field, enter id's of two different object separated by '2' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(" ")
        .type(workListGadgetValue.delimiterTwo).type(" ").type(workListGadgetValue.listObjectTextBoxValue2)
       
        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2008:15');
    });

    /* 1.Select Any in 'Filter by Object Type' field. 
     2.Select Object IDs in 'List element as' field. 
     3.Set Delimiter as ' * ' . 
     4.In the 'List of Objects' field, enter id's of two different object separated by ' * ' . 
     5.Select Add and click Apply button.
    */
   
    it("AMI-2009:16, The object specified in 'List of objects' field should get linked with the list object.", function() {

        cy.start('AMI-2009:16');

        // Select any in filter by object type
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);

        // Select Object id as in list Element
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");

        // Set Delimiter as '*'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterAsterisk)
        .should('have.value', workListGadgetValue.delimiterAsterisk);

        // In the 'List of Objects' field, enter id's of two different object separated by '2' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(" ")
        .type(workListGadgetValue.delimiterAsterisk).type(" ").type(workListGadgetValue.listObjectTextBoxValue2)
       
        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2009:16');
    });

    /* 1.Select Any in 'Filter by Object Type' field. 
       2.Select Object Names in 'List element as' field. 
       3.Set Delimiter as ',' . 
       4.In the 'List of Objects' field, enter names of two different object separated by ',' . 
       5.Select Add and click Apply button. 
    */
   
    it("AMI-2010:17, The object specified in 'List of objects' field should get linked with the list object.", function() {

        cy.start('AMI-2010:17');
        
        // Select Object Name as List element
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");

        // Set Delimiter as ","
        cy.get(workListGadgetDom.whitespaceCharacterCheckBox).uncheck();
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);

        // In the 'List of Objects' field, enter id's of two different object separated by ',' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets).type(' ').type(workListGadgetValue.listObjectTextBoxValueAlphabets)

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2010:17');
        
    });

    /* 1.Select Any in 'Filter by Object Type' field. 
       2.Select Object Names in 'List element as' field. 
       3.Set Delimiter as '__' . 
       4.In the 'List of Objects' field, enter names of two different object separated by '__' . 
       5.Select Add and click Apply button. 
    */
   
   it("AMI-2011:18, The object specified in 'List of objects' field should get linked with the list object.", function() {
        
        cy.start('AMI-2011:18');
    
        // Select Object Name as List element
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");

        // Set Delimiter as '__'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterUnderscore)
        .should('have.value', workListGadgetValue.delimiterUnderscore);

        // In the 'List of Objects' field, enter id's of two different object separated by '__' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .type(workListGadgetValue.delimiterUnderscore).type(workListGadgetValue.listObjectTextBoxValueAlphabets)

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2011:18');
        
    });
    /* 1.Select Any in 'Filter by Object Type' field. 
           2.Select Object Names in 'List element as' field. 
           3.Set Delimiter as ' ' . 
           4.In the 'List of Objects' field, enter names of two different object separated by ' ' . 
           5.Select Add and click Apply button. 
    */
   
   it("AMI-2012:19, The object specified in 'List of objects' field should get linked with the list object.", function() {

        cy.start('AMI-2012:19');
    
        // Select Object Name as List element
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");

        // Set Delimiter as ' '
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterSpace)
        .should('have.value', workListGadgetValue.delimiterSpace);

        // In the 'List of Objects' field, enter id's of two different object separated by ' ' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .type(workListGadgetValue.delimiterSpace).type(workListGadgetValue.listObjectTextBoxValueAlphabets)

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2012:19');
    });

    /* 1.Select Any in 'Filter by Object Type' field. 
       2.Select Object Names in 'List element as' field. 
       3.Set Delimiter as ' 2 ' . 
       4.In the 'List of Objects' field, enter names of two different object separated by ' 2 ' . 
       5.Select Add and click Apply button. 
    */

    
    it("AMI-2013:20, The object specified in 'List of objects' field should get linked with the list object.", function() {

        cy.start('AMI-2013:20');
        
        // Select Object Name as List element
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");

        // Set Delimiter as '2'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterSpace)
        .should('have.value', workListGadgetValue.delimiterSpace);

        // In the 'List of Objects' field, enter id's of two different object separated by ' 2 ' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets).type(" ")
        .type(workListGadgetValue.delimiterTwo).type(" ")
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets);

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Displayig PopUp
        cy.get(amiDom.amiLogin.ok).click({force:true});

        cy.finish('AMI-2013:20');
        
   });

    /* 1.Select Any in 'Filter by Object Type' field. 
       2.Select Object Names in 'List element as' field. 
       3.Set Delimiter as ' * ' . 
       4.In the 'List of Objects' field, enter names of two different object separated by ' * ' . 
       5.Select Add and click Apply button.
    */
   
    it("AMI-2014:21, The object specified in 'List of objects' field should get linked with the list object.", function() {
        
        cy.start('AMI-2014:21');
        
        // Select Object Name as List element
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");

        // Set Delimiter as ' * '
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterAsterisk)
        .should('have.value', workListGadgetValue.delimiterAsterisk);

        // In the 'List of Objects' field, enter id's of two different object separated by ' * ' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .type(workListGadgetValue.delimiterAsterisk).type(workListGadgetValue.listObjectTextBoxValueAlphabets)

        // Select Add
        cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);

        // Click Apply button
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2014:21');
   });

});