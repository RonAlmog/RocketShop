var assert = require("assert");
var MembershipApplication = require("../models/membership_application");


describe("Membership application requirements", function(){
	var validApp;

	before(function(){
		validApp=new MembershipApplication({
			first: "Test",
			last: "User",
			email: "test@test.com",
			age: 30,
			height: 66,
			weight: 180
		}); 


	});

	describe("Application valid if...", function(){
		it("all validators successful", function(){
			assert(validApp.isValid(), "Not Valid");
		});

	

		it("email is 4 or more chars, and contains @", function(){
			assert(validApp.emailIsValid());
		});
		it("height is between 60 and 75 inches", function(){
			assert(validApp.heightIsValid());
		});
		it("age is between 15 and 100", function(){
			assert(validApp.ageIsValid());
		});
		it("weight is between 100 and 300", function(){
			assert(validApp.weightIsValid());
		});
		it("first and last name are provided", function(){
			assert(validApp.nameIsValid());
		});

	});

	describe("application invalid if...", function(){
		it("is expired", function(){
			var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")});
			assert(app.expired());
		});

		it("email is 4 chars or less", function(){
			var app = new MembershipApplication({email: 'dd'});
			assert(!app.emailIsValid());
		});
		it("email does not contains @", function(){
			var app = new MembershipApplication({email: 'dd.com'});
			assert(!app.emailIsValid());
		});
		it("email is ommited", function(){
			var app = new MembershipApplication({});
			assert(!app.emailIsValid());
		});
		it("height is less than 60", function(){
			var app = new MembershipApplication({height: '50'});
			assert(!app.heightIsValid());
		});
		it("height is more than 75", function(){
			var app = new MembershipApplication({height: '90'});
			assert(!app.heightIsValid());
		});
		it("height is ommited", function(){
			var app = new MembershipApplication({});
			assert(!app.heightIsValid());
		});
		it("age is less than 15", function(){
			var app = new MembershipApplication({age: '5'});
			assert(!app.ageIsValid());
		});
		it("age is more than 100", function(){
			var app = new MembershipApplication({age: '910'});
			assert(!app.ageIsValid());
		});
		it("age is ommited", function(){
			var app = new MembershipApplication({});
			assert(!app.ageIsValid());
		});
	});

});