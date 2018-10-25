// Work list gadget Test Cases with apply to list dropdown from AMI-2031:38

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

    /* 	Click on cancel button in Add object window */

    it("AMI-2031:38,Add object window should get closed.", function() {

        cy.start('AMI-2031:38');

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

        // Open QA Working List Gadget (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Workspace to "+ amiValue.amiLogin.workListGadget);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.workListGadget);
        cy.addLog(amiValue.amiLogin.workListGadget+ " Changed Successfully");
 
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
        cy.addLog("Select Add object")

        // Add object Window Should Displayed
        cy.contains(amiValue.workListGadget.AddObjectWindow).should('be.visible');
        cy.addLog("Displaying Add Object Window");

        // Enter Any name
        cy.get(amiDom.workListGadget.AddObjectName).clear().type(amiValue.workListGadget.addObjectValue)
        .should('have.value', amiValue.workListGadget.addObjectValue);
        cy.addLog("Enter any value in Add object Name : "+ amiValue.workListGadget.addObjectValue);

        // Click on cancel to close 
        cy.get(amiDom.amiLogin.cancel).should('exist');
        cy.get(amiDom.amiLogin.cancel).click();
        cy.addLog("Select Cancel to Close/Exit");

        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

        cy.finish('AMI-2031:38');

    });
});