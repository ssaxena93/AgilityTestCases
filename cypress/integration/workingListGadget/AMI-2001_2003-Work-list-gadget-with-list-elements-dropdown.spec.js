//Working list gadget with list elements dropdown Test Cases from AMI-2001:8 to AMI-2003:10

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');


// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget with List Elements DropDown", function() {

    let workListGadgetValue =  amiValue.workListGadget; 
    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Working list gadget with list elements dropdown Test Cases");
    
    });

    /* Click on 'List element as:' drop down.  */

    it("AMI-2001:8, 'List element as:' should consists of Object IDs, Object Names.", function() {

        cy.start('AMI-2001:8');

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);

        // Open WorkList Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);
        
        // Should consist of list elements id
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementValue).should('have.value', "id");

        // Should consit of object Names
        cy.get(workListGadgetDom.listElementsDropDown)
        .select(workListGadgetValue.listElementName).should('have.value', "name");

        cy.finish('AMI-2001:8');

    });

    /* Select Object IDs in 'List element as' field and enter Object Name in 'List of Objects' field. */
    it("AMI-2002:9, 'Non-numeric characters found in the list of IDs.Object IDs must be numeric' message should be displayed.", function() {

        cy.start('AMI-2002:9');
        
        // Select id as list elmennt
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementValue).should('have.value', "id");

        // Enter Alphabets only in list object's field
        cy.get(workListGadgetDom.listObjectTextBox).clear().type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .should('have.value', workListGadgetValue.listObjectTextBoxValueAlphabets);

        // Click apply to submit
        cy.get(workListGadgetDom.apply).click({ force:true })

        // Should display error
        cy.contains(workListGadgetValue.error1253).should('be.visible');

        // close the error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        // Logout to AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-2002:9');
    
    });

    /* Select Object Names in 'List element as' field and enter Object id in 'List of Objects' field. */

    it("AMI-2003:10, 'No matching objects found' message should be displayed.", function() {
        
        cy.start('AMI-2003:10');
        
        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        
        // Select Object Name as List element
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementName).should('have.value', "name");

        // Enter any Alphabets only
        cy.get(workListGadgetDom.listObjectTextBox).clear().type(workListGadgetValue.listObjectTextBoxValueAlphabets)
        .should('have.value', workListGadgetValue.listObjectTextBoxValueAlphabets);

        // Click apply to submit
        cy.get(workListGadgetDom.apply).click({ force:true })

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");

        // Logout to AMI
        loginUtils.logoutFromAMI();

        cy.finish('AMI-2003:10');
    });
});