/// <reference types="cypress" />

import { curryRight } from 'lodash'
import generateInput from '../../../utils/generateInput'

describe('Basic Page Test', () => {
    beforeEach(() => {
            cy.launchApp()
            cy.fixture('dental-reborn-elements').as('dental_reborn_elements')
        })


    it('Ensure Job Details Present Properly', function () { 
        cy.get(this.dental_reborn_elements.job_description_div).should('have.text', 'Dentist, Dentist - Dental Public Health phoenix, AZ')
        cy.get(this.dental_reborn_elements.job_title).should('have.text', 'Dental Reborn')
    })

    it('Ensure All Default params of Form present as expected', function () { 
        cy.get(this.dental_reborn_elements.first_name_label_text).should('have.text', 'First Name *')
        cy.get(this.dental_reborn_elements.last_name_label_text).should('have.text', 'Last Name *')
        cy.get(this.dental_reborn_elements.email_label_text).should('have.text', 'Email *')
        cy.get(this.dental_reborn_elements.phone_label_text).should('have.text', 'Phone *')
        cy.get(this.dental_reborn_elements.resume_div_txt).should('have.text', 'Resume ')
        cy.get(this.dental_reborn_elements.user_occupation_input).should('have.value', 'Dental Services (DDS, Technician, Hygienist, etc.)')
        cy.get(this.dental_reborn_elements.user_specialities_input).should('have.value', 'Dentist')
        cy.get(this.dental_reborn_elements.user_state_input).should('have.value', 'AZ - Arizona')
        cy.get(this.dental_reborn_elements.apply_now_lbl).should('have.text', 'Apply Now') 
    })

    it('Fill all the params in the form and sumbit - Random Generated string with Special characters', function () {
        cy.get(this.dental_reborn_elements.first_name_input).type(generateInput.generate_random_string())
        cy.get(this.dental_reborn_elements.last_name_input).type(generateInput.generate_random_string())
        cy.get(this.dental_reborn_elements.email_input).type(generateInput.generate_random_string(40,true,false)+'@gmail.com')
        cy.get(this.dental_reborn_elements.phone_input).type(generateInput.generate_random_string(10,false,false))
        cy.get(this.dental_reborn_elements.apply_now_btn).click()
        cy.get(this.dental_reborn_elements.applied_btn).should('exist')
        cy.get(this.dental_reborn_elements.applied_btn).should('have.text', 'Applied')
        cy.get(this.dental_reborn_elements.applied_btn).should('have.css', 'background-color', 'rgb(76, 175, 80)')
    })

    it('Enter only FirstName and Application not submitted', function () {
        cy.get(this.dental_reborn_elements.first_name_input).type(generateInput.generate_random_string())
        cy.get(this.dental_reborn_elements.apply_now_btn).click()
        cy.get(this.dental_reborn_elements.apply_now_lbl).should('have.text', 'Apply Now') 
        cy.get(this.dental_reborn_elements.applied_btn).should('have.css', 'background-color', 'rgb(228, 96, 168)')
    })

    it('Fill all the params in the form and sumbit - With Resume upload', function () {
        cy.get(this.dental_reborn_elements.first_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.last_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.email_input).type(generateInput.generate_random_string(40,true,false)+'@gmail.com')
        cy.get(this.dental_reborn_elements.phone_input).type(generateInput.generate_random_string(10,false,false))
        cy.get(this.dental_reborn_elements.file_upload_input).attachFile('test_data/VIGNESH_THANGARAJ.pdf')
        cy.get(this.dental_reborn_elements.apply_now_btn).click()
        cy.get(this.dental_reborn_elements.applied_btn).should('exist')
        cy.get(this.dental_reborn_elements.applied_btn).should('have.text', 'Applied')
        cy.get(this.dental_reborn_elements.applied_btn).should('have.css', 'background-color', 'rgb(76, 175, 80)')
    })

    it('Enter valid Firstname, lastname, gmail and invalid Phonenumber', function () {
        cy.get(this.dental_reborn_elements.first_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.last_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.email_input).type(generateInput.generate_random_string(40,true,false)+'@gmail.com')
        cy.get(this.dental_reborn_elements.phone_input).type(generateInput.generate_random_string(10,true,false))
        cy.get(this.dental_reborn_elements.apply_now_btn).click()
        cy.get(this.dental_reborn_elements.apply_now_lbl).should('have.text', 'Apply Now') 
        cy.get(this.dental_reborn_elements.applied_btn).should('have.css', 'background-color', 'rgb(228, 96, 168)')
    })

    it('Enter valid Firstname, lastname, phonenumber and invalid Email', function () {
        cy.get(this.dental_reborn_elements.first_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.last_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.email_input).type(generateInput.generate_random_string(40,true,false))
        cy.get(this.dental_reborn_elements.phone_input).type(generateInput.generate_random_string(10,true,false))
        cy.get(this.dental_reborn_elements.apply_now_btn).click()
        cy.get(this.dental_reborn_elements.apply_now_lbl).should('have.text', 'Apply Now') 
        cy.get(this.dental_reborn_elements.applied_btn).should('have.css', 'background-color', 'rgb(228, 96, 168)')
    })


    it('Update Occupation, speciality and state and submit it - Enter everything in the form with valid information', function () {
        cy.get(this.dental_reborn_elements.first_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.last_name_input).type(generateInput.generate_random_string(50,true,false))
        cy.get(this.dental_reborn_elements.email_input).type(generateInput.generate_random_string(40,true,false)+'@gmail.com')
        cy.get(this.dental_reborn_elements.phone_input).type(generateInput.generate_random_string(10,false,false))
        cy.get(this.dental_reborn_elements.file_upload_input).attachFile('test_data/VIGNESH_THANGARAJ.pdf')
        cy.get(this.dental_reborn_elements.occupation_button).click()
        cy.get(this.dental_reborn_elements.occupation_option).click()
        cy.get(this.dental_reborn_elements.speciality_button).click()
        cy.get(this.dental_reborn_elements.speciality_option).click()
        cy.get(this.dental_reborn_elements.state_button).click()
        cy.get(this.dental_reborn_elements.state_option).click()
        cy.get(this.dental_reborn_elements.apply_now_btn).click()
        cy.get(this.dental_reborn_elements.applied_btn).should('exist')
        cy.get(this.dental_reborn_elements.applied_btn).should('have.text', 'Applied')
        cy.get(this.dental_reborn_elements.applied_btn).should('have.css', 'background-color', 'rgb(76, 175, 80)')
    })

    it('validate copy link button contains valid Endpoint to Navigate', function(){
        cy.get(this.dental_reborn_elements.copy_link_btn).click()
        cy.wrap(Cypress.automation('remote:debugger:protocol', {
            command: 'Browser.grantPermissions',
            params: {
              permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
              origin: window.location.origin,
            },
          }))
          cy.window().its('navigator.clipboard').invoke('readText').should('contain', 'https://staging.directshifts.com/jobs/p/dental-reborn-7000')
    })

    it('Test share on Facebook button', function(){
        cy.get(this.dental_reborn_elements.share_on_facebook_btn).invoke('removeAttr', 'target').click()
        console.log(cy.url())
    })




    




})