// Working List Gadget with Filter By object Type Test Cases from AMI-1998:5 to AMI-2000:7

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Working List Gadget with Filter By object Type", function() {

    let workListGadgetValue =  amiValue.workListGadget;
    let workListGadgetDom = amiDom.workListGadget;

    before("Adding log header", function() {

        cy.logHeader("Working List Gadget with Filter By object Type");
    
    });

    /* Select Filter by Object drop down. */
    it("AMI-1998:5, Filter by Object drop down should display all the object types "+
       "and sub-types present in the database.", function(){

        cy.start("AMI-1998:5");

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);

        // Open WorkList Gadget
        anyGadgetUtils.openGadgetOrGroup(amiValue.anyGadget.workListGadget);

        // Select filter by objects dropdown
        cy.get(workListGadgetDom.filterByObjectDropDown).should('have.value', '');
        
        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish("AMI-1998:5");

    });

    /* 1.Select 'Group' in Filter by object Type field, Object ID in List element as: field. 
    2.Enter id's of object other than Group type in List of Objects field. Click Apply. */

    it("AMI-1999:6, 'No matching object found' message should be displayed.", function() {

        cy.start("AMI-1999:6");

        // login in AMI
        loginUtils.loginToAMI(amiValue.amiLogin.username);

        // Select group in filter by object type field 
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.group).should('have.value', '1');

        // Select list element as object id
        cy.get(workListGadgetDom.listElementsDropDown).select(workListGadgetValue.listElementValue).should('have.value', 'id');

        // Clear Delimeter textbox
        // cy.get(workListGadgetDom.delimeterTextBox).clear();

        // Type random any value
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).should('have.value', workListGadgetValue.listObjectTextBoxValue);

        // Click apply to submit
        cy.get(workListGadgetDom.apply).click({ force:true })

        // Display message No Matching Object found
        cy.contains(workListGadgetValue.error1259).should('be.visible');
        cy.log("Displaying 1259 Error");
        
        // Close the Error
        cy.get(amiDom.amiLogin.errorClose).click( {force:true});

        cy.finish("AMI-1999:6")

    });

    /* 1.Select Any in Filter by object Type field, Object ID in List element as: field.
       2.Enter id's of object other than Group type in List of Objects field. 
       Click Apply.
    */
   
    it("AMI-2000:7, The objects should get linked with the List objects.", function() {

        cy.start("AMI-2000:7");
        
        // Select any in filter by object type field 
        cy.get(workListGadgetDom.filterByObjectDropDown).select(workListGadgetValue.any).should('be.visible');

        // Enter id's of object other than Group type in List of Objects field.

        // Type random any value
        cy.get(workListGadgetDom.listObjectTextBox).clear()
        .type(workListGadgetValue.listObjectTextBoxValue).should('have.value', workListGadgetValue.listObjectTextBoxValue);

        // Click apply to submit
        cy.get(workListGadgetDom.apply).click({ force:true });

        // Logout from AMI
        loginUtils.logoutFromAMI();

        cy.finish("AMI-2000:7");

    });

});

