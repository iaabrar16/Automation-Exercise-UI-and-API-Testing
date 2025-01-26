describe('UI & API Testing', () => {
    it('Should log in, expand the Men category, click on a subcategory, interact with a product, and click a button', () => {

        cy.visit('https://automationexercise.com/login');

        Cypress.on('uncaught:exception', () => false);


        cy.get('[data-qa="signup-name"]')
            .type('Ismail Aabrar')
            .should('have.value', 'Ismail Aabrar');

        cy.get('[data-qa="signup-email"]')
            .type('iaa20@gmail.com') // try your own email
            .should('have.value', 'iaa20@gmail.com');  // try your own email

        cy.get('[data-qa="signup-button"]')
            .click()
            .should('be.visible');


        cy.get('#id_gender1').click();

        cy.get('[data-qa="name"]').type('Your Name');
        cy.get('[data-qa="password"]').type('YourPassword123');


        cy.get('[data-qa="days"]').select('12');
        cy.get('[data-qa="months"]').select('October');
        cy.get('[data-qa="years"]').select('2005');

        cy.get('#newsletter').click();
        cy.get('#optin').click();


        cy.get('[data-qa="first_name"]').type('John');
        cy.get('[data-qa="last_name"]').type('Doe');
        cy.get('[data-qa="address"]').type('123 Main St');
        cy.get('[data-qa="state"]').type('California');
        cy.get('[data-qa="city"]').type('Los Angeles');
        cy.get('[data-qa="zipcode"]').type('90001');
        cy.get('[data-qa="mobile_number"]').type('1234567890');


        cy.get('[data-qa="create-account"]').click();

        cy.get('[data-qa="continue-button"]')
            .click()
            .should('be.visible');

        cy.visit('https://automationexercise.com/products');

        cy.get(':nth-child(2) > .panel-heading > .panel-title > a > .badge > .fa')
            .should('be.visible')
            .click();

        cy.get('#Men > .panel-body > ul > :nth-child(2) > a')
            .should('be.visible')
            .click();

        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a')
            .should('be.visible')
            .click();

        cy.get('#quantity')
            .clear()
            .type('2');

        cy.get(':nth-child(5) > .btn')
            .should('be.visible')
            .click();

        cy.get('u')
            .first()
            .click();

        cy.get('.col-sm-6 > .btn')
            .should('be.visible')
            .click();

        cy.get(':nth-child(7) > .btn')
            .should('be.visible')
            .click();

        cy.get('[data-qa="name-on-card"]').type('aa');

        cy.get('[data-qa="card-number"]').type('123');

        cy.get('[data-qa="cvc"]').type('01');

        cy.get('[data-qa="expiry-month"]').type('12');

        cy.get('[data-qa="expiry-year"]').type('1999');

        cy.get('[data-qa="pay-button"]')
            .should('be.visible')
            .click();

        cy.get(':nth-child(9) > a')
            .should('be.visible')
            .click();

        cy.get('[data-qa="name"]').type('aab');

        cy.get('[data-qa="email"]').type('a@gmail.com');

        cy.get('[data-qa="subject"]').type('h');

        cy.get('[data-qa="message"]').type('adsasdsadsad');

        cy.get(':nth-child(6) > .form-control')
            .attachFile('file.txt');

        cy.get('[data-qa="submit-button"]').click();


    });

    it('Validate Brand List', () => {
        cy.request('GET', `https://automationexercise.com/api/brandsList`).then((response) => {
            expect(response.status).to.eq(200);

            const brands = response.body;
            expect(brands).to.include('Polo');
            expect(brands).to.include('Babyhug');
            expect(brands).to.include('Biba');

            expect(brands).to.not.include('Heineken');
            expect(brands).to.not.include('BMW');
            expect(brands).to.not.include('Razor');
        });
    });

    it('Test case for POST request', function () {
        cy.request('POST', 'https://automationexercise.com/api/verifyLogin', {
            "email": "iaaabrar19@gmail.com",
            "password": "YourPassword123"
        }).then(function (response) {
            expect(response.status).to.eq(200);
        });
    });
});


