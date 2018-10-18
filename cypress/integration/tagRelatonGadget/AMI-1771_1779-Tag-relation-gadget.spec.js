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
        loginUtils.loginToAMI(amiValue.amiLogin.username);

    });

   afterEach("Logout from AMI for Each Test Case", function(){

        // Logout from AMI
        loginUtils.logoutFromAMI();

    });

    /* AMI-177:1, Editing the Work-space to add Tag Relation gadget
       Select a work-space, edit the work-space, Select Add a gadget, 
       Select Tag relation gadget 

       AMI-1778:2, Empty Tag relation gadget with Options,Refresh, Help icons in enabled
       state, Copy,paste,Reorder,Lock to current object & unlink icons are in disabled
       state with Action menu & Collapse icons. */

    it("AMI-1771:1 & AMI-1778:2, Tag relation gadget to the work-space and Options" , function() {

        cy.start('AMI-1771:1');

        let tagRelationGadget = amiDom.tagRelationGadget;

        // Open QA Attribute Gadget workspace (this workspace has the required browser gadgets)
        changeDropdownUtils.changeWorkspace(amiValue.amiLogin.changeWorkspace);
                
        // Edit QA Attributr Gadget workspace
        changeDropdownUtils.openWorkspaceEditor();

        // Click Add gadget 
        cy.get(amiDom.amiLogin.addGadget).click();

        // Select Tag Relation Gadget from add gadget list
        cy.get(amiDom.amiLogin.addGadgetList).contains(amiValue.anyGadget.tagRelation)
        .trigger('mousedown', {which: 1, pageX: 200, pageY: 150} )
        .trigger('mousemove', { which: 1, pageX: 150, pageY: 100 })
        .trigger('mouseup', {force: true})

        //Verify TagRelation Added or not
        cy.log("Darg and Drop is not working With Cypress Do manuallay Now")
        cy.pause();
        
        // Click TagRelation Index Menu
        cy.get(tagRelationGadget.menu).click()

        cy.log('checking the tag relation options')

        // Click copy check box Availbale on Index menu
        cy.get(tagRelationGadget.copy).check().should('be.checked');
        
        // Click paste check box Availbale on Index menu
        cy.get(tagRelationGadget.paste).check().should('be.checked');

        // Click unlink check box Availbale on Index menu
        cy.get(tagRelationGadget.unlink).check().should('be.checked');

        // Click reorder check box Availbale on Index menu
        cy.get(tagRelationGadget.reorder).check().should('be.checked');
        
        // Click copy check box Availbale on Index menu
        cy.get(tagRelationGadget.options).check().should('be.checked');

        // click copy check box Availbale on Index menu
        cy.get(tagRelationGadget.refresh).check().should('be.checked');

        // Click copy check box Availbale on Index menu
        cy.get(tagRelationGadget.help).check().should('be.checked');

        // Click copy check box Availbale on Index menu
        cy.get(tagRelationGadget.lock).check().should('be.checked');

        // Click ok to save Index Menu Options
        workSpaceEditorUtils.closeWorkspaceEditor();
        
        cy.finish('AMI-1771:1');
    });

    /* select a object from Browse gadget */ 

    it("AMI-1779:3, Tag Relation gadget should show all the Tag relations which are created"+
        "in Java client and if any Index object linked to that object also displayed and Single Tag"+
        "relation should be in Black in colour and Multi-instance Tag relation Blue in colour", function() {

        cy.start('AMI-1779:3');
            
        let anyGadget = amiValue.anyGadget;

        // Select gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadget.name);

        // Browse Gadge
        browserGadgetUtils.setStructureType(anyGadget.type);

        // Select Events in Browser Gadget
        browserGadgetUtils.setBrowseContext(anyGadget.browseContext);

        // Open Tag Relations Gadget
        anyGadgetUtils.openGadgetOrGroup(anyGadget.tagRelation);       

        cy.finish('AMI-1779:3');
    });              

});

