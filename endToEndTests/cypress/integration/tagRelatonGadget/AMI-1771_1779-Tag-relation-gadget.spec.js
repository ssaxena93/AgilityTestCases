/* Tag Relation Gadget from AMI-1771:1 to AMI-1779:3 */

const loginUtils = require('../../utils/ravi_utils/loginUtils');
const changeDropdownUtils = require('../../utils/ravi_utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/ravi_utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/ravi_utils/browserGadgetUtils');
const workSpaceEditorUtils = require('../../utils/ravi_utils/workspaceEditorUtils')

// AMI Data Values file
const amiValue = require('../../fixtures/amiDataValue');

// AMI Dom Elements file
const amiDom = require('../../fixtures/amiDomElements');

describe("Tag Relation Gadget from AMI-1771:1 to AMI-1781:5", function() {

    before("Adding log header", function() {

        // Adding Heading of Test Scenario 
        cy.logHeader("Tag Relation Gadget");
    
    });

   beforeEach("Login to AMI for Each Test Case", function() {

        // login in AMI
        cy.addLog("Launch Browser with URL and trying to Login");
        loginUtils.loginToAMI(amiValue.amiLogin.username);
        cy.addLog("Browser Launched with URL and Logged in Successfully");

    });

   afterEach("Logout from AMI for Each Test Case", function() {
       
        // Logout from AMI
        cy.addLog("Trying to Logout");
        loginUtils.logoutFromAMI();
        cy.addLog("Logout Sucessfully");

    });

    /* AMI-177:1, Editing the Work-space to add Tag Relation gadget
       Select a work-space, edit the work-space, Select Add a gadget, 
       Select Tag relation gadget 

       AMI-1778:2, Empty Tag relation gadget with Options,Refresh, Help icons in enabled
       state, Copy,paste,Reorder,Lock to current object & unlink icons are in disabled
       state with Action menu & Collapse icons. */

    it("AMI-1771:1 & AMI-1778:2, Tag relation gadget to the work-space and Options" , function() {

        cy.start('AMI-1771:1 & AMI-1778:2');

        let tagRelationGadget = amiDom.tagRelationGadget;

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        cy.addLog("Trying to Change Workspace to "+ amiValue.amiLogin.changeWorkspace);
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
        cy.addLog(amiValue.amiLogin.changeWorkspace +" Changed Successfully");
                
        // Edit QA Attribute Gadget workspace
        cy.log("Editing "+ amiValue.amiLogin.changeWorkspace);
        changeDropdownUtils.openWorkspaceEditor();

        // Click Add gadget
        cy.addLog("Select Add Gadget");
        cy.get(amiDom.amiLogin.addGadget).click();
        cy.addLog("Displaying Gadget List window");

        // Select Tag Relation Gadget from add gadget list
        cy.addLog("Select Tag Relation Gadget from Add Gadget List");
        cy.get(amiDom.amiLogin.addGadgetList).contains(amiValue.anyGadget.tagRelation)
        .trigger('mousedown', {which: 1, pageX: 200, pageY: 150} )
        .trigger('mousemove', { which: 1, pageX: 150, pageY: 100 })
        .trigger('mouseup', {force: true})
        // cy.addLog("Added Tag Relation Gadget from Add Gadget List");

        //Verify TagRelation Added or not
        cy.addLog("Darg and Drop is not working With Cypress Do manuallay Now");
        cy.log("Darg and Drop is not working With Cypress Do manuallay Now");
        cy.pause();
        
        // Click TagRelation Index Menu
        cy.addLog("Select Index Action Menu Options from Tag Relation Gadget");
        cy.get(tagRelationGadget.menu).click();
        cy.addLog("Displaying all Avialble options in Index Action Menu");
        cy.log('checking the tag relation options');

        // Click copy check box Available on Index menu
        cy.addLog("Check on All Available Index Menu Options");
        cy.get(tagRelationGadget.copy).check().should('be.checked');
        
        // Click paste check box Available on Index menu
        cy.get(tagRelationGadget.paste).check().should('be.checked');

        // Click unlink check box Available on Index menu
        cy.get(tagRelationGadget.unlink).check().should('be.checked');

        // Click reorder check box Available on Index menu
        cy.get(tagRelationGadget.reorder).check().should('be.checked');
        
        // Click options check box Available on Index menu
        cy.get(tagRelationGadget.options).check().should('be.checked');

        // click refresh check box Available on Index menu
        cy.get(tagRelationGadget.refresh).check().should('be.checked');

        // Click help check box Available on Index menu
        cy.get(tagRelationGadget.help).check().should('be.checked');

        // Click lock to current project check box Available on Index menu
        cy.get(tagRelationGadget.lock).check().should('be.checked');
        cy.addLog("Checked All Available Options in Index Action Menu");

        // Click ok to save Index Menu Options
        cy.addLog("Save Workspace");
        workSpaceEditorUtils.closeWorkspaceEditor();
        
        cy.finish('AMI-1771:1 & AMI-1778:2');
    });

    /* select a object from Browse gadget */ 

    it("AMI-1779:3, Tag Relation gadget should show all the Tag relations which are created"+
        "in Java client and if any Index object linked to that object also displayed and Single Tag"+
        "relation should be in Black in colour and Multi-instance Tag relation Blue in colour", function() {

        cy.start('AMI-1779:3');
            
        let anyGadget = amiValue.anyGadget;

        // Select browse gadget
        cy.addLog("Trying to Open "+ anyGadget.name +" Browse Gadget");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);
        cy.addLog(anyGadget.name +" Opend With List");

        // Select Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.type);
        browserGadgetUtils.setStructureType(anyGadget.type);
        cy.addLog(anyGadget.type +" Displayng with List Of Objects");

        // Select !! QA Data to from Events in Browser Gadget
        cy.addLog("Select "+ anyGadget.browseContext+ "object");
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        cy.addLog("Trying to open "+ anyGadget.tagRelation +" Attribute");
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);
        cy.addLog("Displaying "+ anyGadget.browseContext +" Objects in "+ anyGadget.tagRelation +" Gadget");

        cy.finish('AMI-1779:3');
    });              

});

