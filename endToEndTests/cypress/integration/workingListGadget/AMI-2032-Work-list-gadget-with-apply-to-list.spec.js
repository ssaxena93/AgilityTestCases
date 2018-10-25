// Work list gadget Test Cases with apply to list dropdown from AMI-2032:39

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Work list gadget Test Cases with apply to list dropdown", function() {

    let workListGadgetDom =  amiDom.workListGadget;

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Work List Gadget with apply to list dropdown");
    
    });

    /* 	1.In Add object window, enter Name, select object type. 
        2.Select 'Add and then select' checkbox. Click Ok. 
    */

    it("AMI-2032:39, The newly created object should get highlighted in list structure "+
       "and object specified in the 'List of Objects' field should get linked to it.", function() {

        cy.start('AMI-2032:39');

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

        // Select New option from Apply list Drop Down
        cy.get(workListGadgetDom.applyListDropDown).select(amiValue.workListGadget.new)
        .should("have.value", amiValue.workListGadget.new);
        cy.addLog("Select Apply list DropDown Value : "+ amiValue.workListGadget.new);

        // Open Browse Gadget
        cy.get(amiDom.workListGadget.browserIcon).click();
        cy.addLog("Open Browser and Displaying Contents");

        // Select Lists
        browserGadgetUtils.setStructureType(amiValue.anyGadget.list);
        cy.addLog('Select List Displaying all Objects');

        // Select QA List Test From lists
        browserGadgetUtils.setBrowseContext(amiValue.workListGadget.qaListTest);
        cy.addLog("Select Object has Children : "+ amiValue.workListGadget.qaListTest);

        // Select Browser menu icon
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.addLog("Select Browser Menu");

        // Select Add Object
        cy.contains(amiValue.workListGadget.browserAddObject).click();
        cy.addLog("Select Add object");

        // Add object Window Should Displayed
        cy.contains(amiValue.workListGadget.AddObjectWindow).should('be.visible');
        cy.addLog("Displaying Add Object Window");

        // Enter Any name
        cy.get(amiDom.workListGadget.AddObjectName).clear().type(amiValue.workListGadget.addObjectValue)
        .should('have.value', amiValue.workListGadget.addObjectValue);
        cy.addLog("Enter any value in Add object Name : "+ amiValue.workListGadget.addObjectValue);

        // Select new object type
        cy.get(amiValue.workListGadget.addObjectType).check().should('be.checked')
        cy.addLog('Select object type');
        
        // Select add and then select check box
        cy.get(amiDom.workListGadget.AddObjectSelect).check().should('be.checked');
        cy.addLog("Checked on add and then select check box");

        // Click Ok
        cy.get(amiDom.amiLogin.ok).click({force:true});

        // Verify child object added 
        cy.contains(amiValue.workListGadget.addObjectValue).should('be.visible');
        cy.addLog(amiValue.workListGadget.addObjectValue+ " Object Added Under "+ amiValue.workListGadget.qaListTest);

        //Remove The object
        cy.get(amiDom.anyGadget.browserIcon).click();
        cy.contains("Delete...").click();
        cy.get(amiDom.amiLogin.ok).click();

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");
        
        cy.finish('AMI-2032:39');

    });

});