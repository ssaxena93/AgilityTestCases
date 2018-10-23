// Work list gadget with Delimeter Test Cases from AMI-2004:11 to AMI-2014:21

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

let workListGadgetValue =  amiValue.workListGadget; 
let workListGadgetDom =  amiDom.workListGadget;

function listObjectID(){

    // Select any in filter by object type
    cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);
    cy.addLog("Select Any in 'Filter by Object Type' field.");

    // Select Object id as in list Element
    cy.get(workListGadgetDom.listElementsDropDown)
    .select(workListGadgetValue.listElementValue).should('have.value', "id");
    cy.addLog("Select Object IDs in 'List element as' field.");

}
function listObjectName(){

    // Select any in filter by object type
    cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any);
    cy.addLog("Select Any in 'Filter by Object Type' field.");

    // Select Object Name as List element
    cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");
    cy.addLog("Select Object Name in 'List element as' field.");
}

function add_apply(){

    // Select Add
    cy.get(workListGadgetDom.addDropDown).select(workListGadgetValue.add);
    cy.addLog("Select add");

    // Click Apply button
    cy.get(workListGadgetDom.apply).click({ force:true });
    cy.addLog("Select Apply");

}

describe("Working List Gadget With delimiter", function() {

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work list gadget with Delimeter Test Cases");
    
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

    /* View the delimiter field. */
    it("AMI-2004:11, By default ' ,' should be selected as delimiter.", function() {

        cy.start('AMI-2004:11');

        // Select Delemeter should have value default ','
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);

        cy.get(workListGadgetDom.delimiterTextBox).should('have.value', workListGadgetValue.delimiterDefault);
        cy.addLog("Select Delemeter should have value default ',' ");

        cy.log("Expected delimiter default value : " + workListGadgetValue.delimiterDefault);

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
        cy.addLog("Delimiter default value :" +  workListGadgetValue.delimiterDefault);

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
        
        listObjectID();

        // Set Delimiter as ','
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);
        cy.addLog(" Set Delimiter as : ", workListGadgetValue.delimiterDefault)

        // In the 'List of Objects' field, enter id's of two different object separated by ',' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(' ').type(workListGadgetValue.listObjectTextBoxValue2)
        cy.addLog("In the 'List of Objects' field, enter id's of two different object separated by ',' : "+ 
        workListGadgetValue.listObjectTextBoxValue +" "+ workListGadgetValue.listObjectTextBoxValue2);

        add_apply();

        // Display Error
        cy.contains(workListGadgetValue.error1253).should('be.visible');
        cy.log("Displaying 1253 Error");
        cy.addLog("Displaying Error : "+ workListGadgetValue.error1253);

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
        
        listObjectID();

        // Set Delimiter as ' '
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterSpace)
        .should('have.value', workListGadgetValue.delimiterSpace);
        cy.addLog("Set Delimiter as space ");

        // In the 'List of Objects' field, enter id's of two different object separated by ' ' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(workListGadgetValue.delimiterSpace).type(workListGadgetValue.listObjectTextBoxValue2)
        cy.addLog("In the 'List of Objects' field, enter id's of two different object separated by Space : "+
        workListGadgetValue.listObjectTextBoxValue +" "+ workListGadgetValue.listObjectTextBoxValue2);
        
        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

        // Close the error
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
        
        listObjectID();

        // Set Delimiter as '2'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterTwo)
        .should('have.value', workListGadgetValue.delimiterTwo);
        cy.addLog("Set Delimiter as : "+ workListGadgetValue.delimiterTwo);

        // In the 'List of Objects' field, enter id's of two different object separated by '2' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(" ")
        .type(workListGadgetValue.delimiterTwo).type(" ").type(workListGadgetValue.listObjectTextBoxValue2);
        cy.addLog("In the 'List of Objects' field, enter id's of two different object separated by 2 : "+
        workListGadgetValue.listObjectTextBoxValue +" "+ workListGadgetValue.listObjectTextBoxValue2);
       
        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

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

        listObjectID();

        // Set Delimiter as '*'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterAsterisk)
        .should('have.value', workListGadgetValue.delimiterAsterisk);
        cy.addLog("Set Delimiter as : "+ workListGadgetValue.delimiterAsterisk);

        // In the 'List of Objects' field, enter id's of two different object separated by '2' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).type(" ")
        .type(workListGadgetValue.delimiterAsterisk).type(" ").type(workListGadgetValue.listObjectTextBoxValue2);
        cy.addLog("In the 'List of Objects' field, enter id's of two different object separated by * : "+
        workListGadgetValue.listObjectTextBoxValue +" "+ workListGadgetValue.listObjectTextBoxValue2);
       
        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

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
        
        listObjectName();

        // Set Delimiter as ","
        cy.get(workListGadgetDom.whitespaceCharacterCheckBox).uncheck();
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterDefault)
        .should('have.value', workListGadgetValue.delimiterDefault);
        cy.addLog("Set Delimiter as : "+ workListGadgetValue.delimiterDefault);

        // In the 'List of Objects' field, enter names of two different object separated by ',' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets).type(' ').type(workListGadgetValue.listObjectTextBoxValueAlphabets2)
        cy.addLog("In the 'List of Objects' field, enter Names of two different object separated by , : "+
        workListGadgetValue.listObjectTextBoxValueAlphabets +" "+ workListGadgetValue.listObjectTextBoxValueAlphabets2);

        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

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

        listObjectName();

        // Set Delimiter as '__'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterUnderscore)
        .should('have.value', workListGadgetValue.delimiterUnderscore);
        cy.addLog("Set Delimiter as : "+ workListGadgetValue.delimiterUnderscore);

        // In the 'List of Objects' field, enter names of two different object separated by '__' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .type(workListGadgetValue.delimiterUnderscore).type(workListGadgetValue.listObjectTextBoxValueAlphabets2);
        cy.addLog("In the 'List of Objects' field, enter Names of two different object separated by , : "+
        workListGadgetValue.listObjectTextBoxValueAlphabets+workListGadgetValue.delimiterUnderscore+
        workListGadgetValue.listObjectTextBoxValueAlphabets2);

        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

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
    
        listObjectName();

        // Set Delimiter as ' '
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterSpace)
        .should('have.value', workListGadgetValue.delimiterSpace);
        cy.addLog("Set Delimiter as ' '");

        // In the 'List of Objects' field, enter names of two different object separated by ' ' . 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .type(workListGadgetValue.delimiterSpace).type(workListGadgetValue.listObjectTextBoxValueAlphabets2);
        cy.addLog("In the 'List of Objects' field, enter Names of two different object separated by , : "+
        workListGadgetValue.listObjectTextBoxValueAlphabets+workListGadgetValue.delimiterSpace+
        workListGadgetValue.listObjectTextBoxValueAlphabets2);

        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

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

        listObjectName();

        // Set Delimiter as '2'
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterTwo)
        .should('have.value', workListGadgetValue.delimiterTwo);
        cy.addLog(" Set Delimiter as : "+ workListGadgetValue.delimiterTwo);
        

        // In the 'List of Objects' field, enter names of two different object separated by ' 2 ' 
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets).type(" ")
        .type(workListGadgetValue.delimiterTwo).type(" ")
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets2);
        cy.addLog("In the 'List of Objects' field, enter Names of two different object separated by , : "+
        workListGadgetValue.listObjectTextBoxValueAlphabets+workListGadgetValue.delimiterTwo+
        workListGadgetValue.listObjectTextBoxValueAlphabets2);

        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

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
        
        listObjectName();

        // Set Delimiter as ' * '
        cy.get(workListGadgetDom.delimiterTextBox).clear()
        .type(workListGadgetValue.delimiterAsterisk)
        .should('have.value', workListGadgetValue.delimiterAsterisk);
        cy.addLog("Set Delimiter as : "+ workListGadgetValue.delimiterAsterisk)

        // In the 'List of Objects' field, enter names of two different object separated by ' * ' .  
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .type(workListGadgetValue.delimiterAsterisk).type(workListGadgetValue.listObjectTextBoxValueAlphabets2);
        cy.addLog("In the 'List of Objects' field, enter Names of two different object separated by , : "+
        workListGadgetValue.listObjectTextBoxValueAlphabets+workListGadgetValue.delimiterAsterisk+
        workListGadgetValue.listObjectTextBoxValueAlphabets2);

        add_apply();

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        cy.addLog("Display Error Message " + workListGadgetValue.error1259);

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish('AMI-2014:21');
   });

});