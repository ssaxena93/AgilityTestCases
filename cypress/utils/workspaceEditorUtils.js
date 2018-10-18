// Utility functions for the workspace editor.

// TODO: Move in the workspace editor functions from anyGadgetUtils.js and changeDropdownUtils.js, BUT WAIT UNTIL THE VENDOR POV IS FINISHED.

/**
 * Close the workspace editor. Assumes that editor is currently open.
 */
function closeWorkspaceEditor() {
    cy.log('Closing the workspace editor');
    cy.get('#ed-edit-ok').click();

    // Confirm workspace selector has reappeared.
    cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 10000}).should('be.visible');
}

/**
 * Try to close the workspace editor. Assumes that editor is currently open, and that the close attempt will fail.
 */
function attemptToCloseWorkspaceEditor() {
    cy.log('Attempting to close the workspace editor');
    cy.get('#ed-edit-ok').click();
}

/**
 * Cancel out of the workspace editor. Assumes that editor is currently open.
 */
function cancelWorkspaceEditor() {
    cy.log('Cancelling out of the workspace editor');
    cy.get('#ed-edit-cancel').click();

    // Confirm workspace selector has reappeared.
    cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 10000}).should('be.visible');
}

module.exports = {
    closeWorkspaceEditor: closeWorkspaceEditor,
    attemptToCloseWorkspaceEditor: attemptToCloseWorkspaceEditor,
    cancelWorkspaceEditor: cancelWorkspaceEditor
};
