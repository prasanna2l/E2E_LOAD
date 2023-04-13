//** QA Test 01 **//

describe("qatest", function() {
	beforeEach(function() {
		cy.visit('https://dev.klaarhq.com')
	}
	)

	//Test 1: Login Test
	it("Login Test", function() {

		//Launch the chrome browser-done from cypress 
		//cy.visit("https://dev.klaarhq.com/");
		//setsize of browser window
		cy.viewport(1024, 746)

		/**possible test cases for the login page**/
		//Header verify with excepted value
		let tit1 = cy.title()
		cy.log(tit1)
		cy.log("Title of the page : ", cy.title()
			.should('eq', 'Klaar'))
		cy.log("Title Matched..!")
		cy.wait(2000)
		//.pause()
		
		//message by TYpeform
		cy.get('.intercom-1epm6qj e4nbtsn3').click({ force: true })
		cy.get('input[class="intercom-1jjndbi e4nbtsn3"]').click()
		cy.wait(3000)
		cy.get('input[class="intercom-13mmd61 e10eojju1"]').click()
		cy.get('input[class="intercom-1dokc79 e1yjlxjt1"]').click()
		cy.get('input[placeholder*="Send a message…"]')
			.type("hi..")
		cy.get('.intercom-1f2urc1 e4nbtsn3').click()

		cy.get('[data-cy="login-forgot-password-link"]').click()
		cy.get('.ant-input ng-pristine ng-invalid ng-star-inserted ant-input-status-error ng-touched')
			.type("mail@gmail.com")
		cy.get('[data-cy="back-to-login-link"]').click()

		cy.get('.ant-checkbox-input ng-pristine ng-valid ng-touched')
			.check()
		cy.get('.ant-checkbox-input ng-pristine ng-valid ng-touched').uncheck()
			.should('not.be.checked')

		//login with google
		//cy.xpath('/html/body/div[1]/app-root/app-sign-in/div/div[2]/div[1]/div/div[1]/a/div/div/div[2]/p').click()
		cy.get('.tw-text-brand0 tw-mb-0 tw-font-bold tw-text-base').click()
		cy.title().should('have.text', 'Sign in – Google accounts')
		cy.go('back')
	});

	//Test 2: Workspace Settings
	it("Workspace Test", function() {

		//Admin Credentials
		//.debug(Cypress.dom.isVisible);
		cy.get('#email-field')
			.type("deepa.nayak@gamma.klaar.team")
		//.should('be.visible')
		cy.get('#password-field')
			.type("Klaar2021")
		cy.get("#login-btn").click()
		//cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-sider/div/div/div/div[2]/ul/div[8]/button/li').click()
		cy.wait(1000)

		//logo&verify
		cy.get('tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ng-star-inserted')
			.click()
		//let workspaceURL1 = "https://dev.klaarhq.com/settings/workspace/details"
		cy.url().
			should('eq', 'https://dev.klaarhq.com/settings/workspace/details')
		cy.get('.ant-btn ant-btn-primary ant-btn-lg ng-star-inserted').click()
			.attachFile("gitlablogo.png"), { subjectType: 'drag-n-drop' };
		//verify
		cy.get('.ant-btn ant-btn-primary ant-btn-lg ng-star-inserted')
			.contains('gitlablogo')
		cy.get('[data-cy="settings-workspace-logo-save-upload-button"]').click()
		//logo saves here
		cy.get('.side-menu-logo').contains('gitlablogo')

		//editlogo
		//const img = "2610426.jpg"
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/div/nz-card[3]/div/div/nz-spin/div/nz-upload/div/div/div/button[2]/i/svg/circle').click()
			.attachFile("2610426.jpg"), { subjectType: 'drag-n-drop' };
		cy.get('[data-cy="settings-workspace-logo-save-upload-button"]').click()
		cy.get('.side-menu-logo').contains('2610426')

		//deletelogo
		cy.xpath("/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/div/nz-card[3]/div/div/nz-spin/div/nz-upload/div/div/div/button[1]/i/svg/circle").click()
		cy.get('[data-cy="settings-workspace-logo-confirm-delete-button"]').click()
		cy.get('.side-menu-logo').contains('KlaarLogoShort')
	});

	//Test 3: Customise modules
	it("Customise modules", function() {
		cy.get('.tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ant-menu-item-selected ng-star-inserted').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-sider/div/div/div[2]/div/ul/div[1]/button/li/div[2]/ul/li[2]/a').click()

		//toogle&profile
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-aspiration-settings/div/nz-card[1]/div[2]/div[1]/div[2]/nz-switch/button').click()
			.wait(3000)
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-aspiration-settings/div/nz-card[1]/div[2]/div[2]/div[2]/nz-switch/button').click()
			.wait(3000)
		cy.get('.tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ng-star-inserted ant-menu-item-selected').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-main/app-page-container/div/div/perfect-scrollbar/div/div[1]/div/div[6]/div[1]/div[2]/div/label')
			.should('not.exist')

		//teams&health-profile,menu
		cy.get('.tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ng-star-inserted')
			.should('exist')
		cy.log("Visible when teams toogle in ON..")
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-aspiration-settings/div/div[2]/div[2]/nz-switch/button').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-aspiration-settings/div/div[5]/div[2]/nz-switch/button').click()
		cy.get('.tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ng-star-inserted')
			.should('not.exist')
			.log("Not Visible on the profile page(side menu)..")
	});

	//Test 4: Add a new user
	it("Add a new user", function() {
		cy.get('.tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ant-menu-item-selected ng-star-inserted').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-sider/div/div/div[2]/div/ul/div[1]/button/li/div[2]/ul/li[3]/a')
			.click()
			.should('have.text', 'All Users')
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[1]/div/div[1]/div[3]/div/button[3]/img').click
		cy.get('[placeholder="e.g. Alex Richards"]').type("prasanna")
		cy.xpath('//*[@id="cdk-overlay-15"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-user-modal/div/nz-spin/div/div/div/form/div/div[3]/nz-form-item/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-placeholder').click()
		cy.get('.ant-select-item-option-content')
			.contains("Engineering").click()
		cy.xpath('//*[@id="cdk-overlay-15"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-user-modal/div/nz-spin/div/div/div/form/div/div[5]/nz-form-item/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input').click()
			.contains("deepa.nayak@gamma.klaar.team (deepa.nayak@gamma.klaar.team)").click()
		cy.get('[placeholder="Enter location here"]')
			.type("Coimbatore")
		cy.xpath('//*[@id="cdk-overlay-15"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-user-modal/div/nz-spin/div/div/div/form/div/div[9]/nz-form-item/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input').click()
			.contains('deepa.nayak@gamma.klaar.team (deepa.nayak@gamma.klaar.team)').click()
		cy.get('[placeholder="e.g. alex@example.com"]').type("prasanna@example.com")
		cy.xpath('//*[@id="cdk-overlay-15"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-user-modal/div/nz-spin/div/div/div/form/div/div[4]/nz-form-item/nz-form-control/div/div/nz-select/nz-select-arrow/i/svg').click()
			.contains("Software Dude").click()
		cy.get('[placeholder="Enter employee id here"]').type("1234")
		cy.xpath('//*[@id="cdk-overlay-15"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-user-modal/div/nz-spin/div/div/div/form/div/div[8]/nz-form-item/div/div[1]/label/span[1]').click()
		//adding user
		cy.get('.ant-btn tw-mr-6 modal-ok-button ant-btn-primary ng-star-inserted').click()
		cy.wait(5000)
		cy.get('[placeholder="settings-edit-user-name-heading-field"]')
			.should('have.text', "prasana")
		cy.get('[placeholder="Search"]').type("prasana")
		cy.wait(4000)
		//verifying by name-all users
		cy.get('.tw-self-center tw-ml-2 tw-truncate')
			.should('have.text', 'prasana')
		cy.get('.tw-self-center tw-ml-2 tw-truncate').click()
		cy.wait(2000)
		//update
		cy.get('[placeholder="Select date"]').click()
			.type("13-04-2001")
		cy.get('[placeholder="e.g. Alex Richards"]').type("prasannay")
		cy.get('[placeholder="e.g. alex@example.com"]').type("prasannay@example.com")
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/div/div/div[2]/div/div/div/form/nz-form-item[4]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-item').click()
		cy.xpath('//*[@id="cdk-overlay-25"]/nz-option-container/div/cdk-virtual-scroll-viewport/div[1]/nz-option-item[2]/div').click()
		cy.get('[placeholder="Enter Work Address here"]')
			.type("Remote")
		//save
		cy.get('[data-cy="settings-edit-user-save-button"]').click()
		//verifying updated user data
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-sider/div/div/div[2]/div/ul/div[1]/button/li/div[2]/ul/li[3]/a')
			.click()
		cy.get('[placeholder="Search"]').type("prasanay")//updated
		cy.wait(4000)
		cy.get('.tw-self-center tw-ml-2 tw-truncate')
			.should('have.text', 'prasanay')
		cy.log('New changes are reflected in the user list table..!!')

	})
	
	// Test 5: User Custom Fields
	it("User Custom Fields", function() {
		cy.get('.tw-h-14 tw-text-center list-item tw-stroke-current hover:tw-text-white tw-rounded-[20px] tw-pt-1 ant-menu-item ant-menu-item-selected ng-star-inserted').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-sider/div/div/div[2]/div/ul/div[1]/button/li/div[2]/ul/li[3]/a')
			.click()
		cy.get('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/nz-tabs-nav/div/div/div[3]/div').click()
		cy.get('.ng-star-inserted').contains('Upload Custom Field Data').click()
		cy.get('.ng-star-inserted').contains('Download CSV File Template').click()
		cy.get('.ng-star-inserted').contains('Upload User Extra Field Data .CSV file').click()
			.attachFile("User_extra_fields.csv"), { subjectType: 'drag-n-drop' };
		cy.screenshot()// new custom field(csv file) added 
		cy.xpath('//*[@id="cdk-overlay-28"]/nz-modal-container/div/div/div/app-modal/div/div[1]/button/i/svg').click()

		//add&update
		cy.get('[data-cy="settings-user-fields-custom-field-name-text-area"]')
			.type("prasannay")
		settings - user - fields - custom - field - save - button
		cy.get('[data-cy="settings-user-fields-custom-field-save-button"]')
			.click()
		cy.wait(3000)
		cy.get('.editable-cell').contains(" prasannay ")
			//.dblclick()
			.get('[data-cy="settings-user-fields-custom-field-edit-button"]')
			.contains("Edit")
			.click()
		cy.get('.editable-cell').contains(" prasannay ").type("prasannaynew")
		cy.get('.ng-star-inserted').contains('Save').click()
		cy.wait(3000)
		cy.get('.editable-cell').should("have.text", "prasannaynew")
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/div[2]/nz-spin/div/nz-table/nz-spin/div/div/nz-table-inner-default/div/table/tbody/tr[4]/td[3]/nz-switch/button/span[1]').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/div[2]/nz-spin/div/nz-table/nz-spin/div/div/nz-table-inner-default/div/table/tbody/tr[4]/td[3]/nz-switch/button/span[1]').click()
		cy.xpath('/html/body/div[1]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/div[2]/nz-spin/div/nz-table/nz-spin/div/div/nz-table-inner-default/div/table/tbody/tr[6]/td[4]/i/svg').click()
		cy.wait(5000)//for deletion
		//cy.waitUntil(() => cy.get('.class="ant-spin-dot ant-spin-dot-spin ng-star-inserted"')
		//);
		cy.get('.editable-cell').should("not.exist", "prasannaynew")

	})

	//Test 6:Workspace settings for non-admin user(headedrun)
	it("Non-admin user", function() {
		cy.get('.user-name').contains("Deepa Nayak")
			.click()
		cy.xpath('//*[@id="cdk-overlay-9"]/div/ul/li[7]/div/div[2]/span').click()
		cy.get('#email-field').type("arya.mahato@gamma.klaar.team")
		//.should('be.visible')
		cy.get('#password-field')
			.type("Klaar2021")
		cy.get("#login-btn").click()
		//for ex difference by mentoring,review setting,access etc..
		cy.get('.menuHeadingText tw-font-medium').contains('PMS')
			.should('not.exist')
		cy.log("Verified Workspace settings are only visible to the admin user and not visible to the non-admin user..!!")

	})
});