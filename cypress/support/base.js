import 'cypress-file-upload';

Cypress.Commands.add('launchApp', function ()  {
        cy.viewport(Cypress.env('viewport_settings'))
        cy.fixture('urls').then( (data) => {
                cy.visit(data[Cypress.env('execution_environment')].dental_reborn_endpoint)
        })
        Cypress.config('defaultCommandTimeout', Cypress.env('cypress_timeout'));
})