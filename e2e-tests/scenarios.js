'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

	afterEach(function() {
		browser.sleep(500); // so you can see what's going on
	});


	it('should navigate to entry point', function() {
		browser.get('index.html');
		expect(browser.getLocationAbsUrl()).toMatch("/entry");
	});


	describe('[Entry]', function() {
		// It's used to have this kind of helpers in a "page" file 
		// But for simplicity i'll leave them here
		var playerA = element(by.model('players.playerA.name'));
		var playerB = element(by.model('players.playerB.name'));
		var okButton = element(by.css('button'));

		it('should render entry when user navigates to /entry', function() {
			element.all( by.css('input[ng-model]') ).first().getAttribute('placeholder').then(function(value){
				expect(value).toMatch('Enter Player\'s 1 name');
			});
		});

		it('should render ok button as disabled', function() {
			okButton.getAttribute('disabled').then(function(value){
				expect(value).toBeTruthy();
			});
		});

		it('should enable ok button when data in', function() {
			playerA.sendKeys('AAA');
			playerB.sendKeys('BBB');
			playerA.getAttribute('value').then(function(value){
				expect(value).toMatch('AAA');
				playerB.getAttribute('value').then(function(value){
					expect(value).toMatch('BBB');
					okButton.getAttribute('disabled').then(function(value){
						expect(value).toBeNull();
					});
				});
			});
		});

		it('should login the game', function() {
			okButton.click().then(function(){
				expect(browser.getLocationAbsUrl()).toMatch("/play");
			});
		});
	});

	describe('[Playing]', function() {
		// elements
		var scoreTable = by.css('.score ul li');
		var turnTable = by.css('.col-xs-6.col-md-6');
		
		// options
		var rock = element(by.css('.fa-hand-rock-o'));
		var paper = element(by.css('.fa-hand-paper-o'));
		var scissors = element(by.css('.fa-hand-scissors-o'));

		var button = element(by.css('button'));

		it('should render score empty box', function() {
			element.all(scoreTable).last().getText().then(function(value){
				expect(value).toEqual('Nobody has played yet');
			});
		});

		it('should render options', function() {
			expect(rock).toBeDefined();
			expect(paper).toBeDefined();
			expect(scissors).toBeDefined();

			rock.getAttribute('title').then(function(value){
				expect(value).toEqual('Rock');
				paper.getAttribute('title').then(function(value){
					expect(value).toEqual('Paper');
					scissors.getAttribute('title').then(function(value){
						expect(value).toEqual('Scissors');
					});
				});
			});
		});

		describe('[Turn 1 - player A]', function() {
			it('should show ok button as disabled', function() {
				button.getAttribute('disabled').then(function(value){
					expect(value).toBeTruthy();
				});
			});

			it('should show Round 1', function() {
				element(turnTable).element(by.tagName('h2')).getText().then(function(value){
					expect(value).toEqual('Round 1');
				});
			});

			it('should show player A as first playing', function() {
				element(turnTable).element(by.tagName('span')).getText().then(function(value){
					expect(value).toEqual('AAA');
				});
			});

			it('should perform turn', function() {
				rock.click().then(function() {
					rock.element(by.tagName('input')).getAttribute('checked').then(function(value){
						expect(value).toBeTruthy();
						button.getAttribute('disabled').then(function(value){
							expect(value).toBeFalsy();
						});
					});
				});
			});

			it('should change player', function() {
				button.click().then(function() {
					rock.element(by.tagName('input')).getAttribute('checked').then(function(value){
						expect(value).toBeFalsy();
						button.getAttribute('disabled').then(function(isDisabled){
							expect(isDisabled).toBeTruthy();
						});
					});
				});
			});
		});

		describe('[Turn 1 - player B]', function() {
			it('should show player B as first playing', function() {
				element(turnTable).element(by.tagName('span')).getText().then(function(value){
					expect(value).toEqual('BBB');
				});
			});

			it('should perform turn', function() {
				paper.click().then(function() {
					paper.element(by.tagName('input')).getAttribute('checked').then(function(value){
						expect(value).toBeTruthy();
						button.getAttribute('disabled').then(function(value){
							expect(value).toBeFalsy();
						});
					});
				});
			});

			it('should change player', function() {
				button.click().then(function() {
					paper.element(by.tagName('input')).getAttribute('checked').then(function(value){
						expect(value).toBeFalsy();
						button.getAttribute('disabled').then(function(value){
							expect(value).toBeTruthy();
						});
					});
				});
			});

			it('should render score with B as winner round 1', function() {
				element.all(scoreTable).last().getText().then(function(value){
					expect(value).toContain('BBB');
				});
			});
		});

		describe('[Turn 2 & 3 - automatics]', function() {
			/**
			* This is not intended to test, just add data (because no mocked data)
			* THIS IS NOT OK, it's only to demo pourposes
			*/
			it('NO TEST JUST SPEEDING UP THINGS', function() {
				// player A ~ Rock
				rock.click().then(function() {
					button.click().then(function() {
						// player B ~ Rock
						rock.click().then(function() {
							button.click().then(function() {
								element.all(scoreTable).last().getText().then(function(value){
									// Result Even
									expect(value).toContain('Even');
									// player A ~ Rock
									rock.click().then(function() {
										button.click().then(function() {
											// player B - Paper
											paper.click().then(function() {
												button.click().then(function() {
													element.all(scoreTable).last().getText().then(function(value){
														// Result Player B
														expect(value).toContain('BBB');
														// player A ~ Rock
														rock.click().then(function() {
															button.click().then(function() {
																// player B - Paper
																paper.click().then(function() {
																	expect(true).toBeTruthy();
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});

		describe('[WON]', function() {

			it('Should navigate once it player wins', function() {
				button.click().then(function() {
					browser.sleep(500);
					expect(browser.getLocationAbsUrl()).toMatch("/won");
				});
			});

			it('Should Show Player BBB as winner', function() {
				var winner = element(by.css('.winner span'));
				expect(winner.getText()).toContain('BBB');
			});

			it('Should Show Button for play again', function() {
				var winner = element(by.css('.winner button'));
				expect(winner.getText()).toContain('Play again');
			});

			it('Should navigate to landing view once button is pressed', function() {
				var winner = element(by.css('.winner button'));
				winner.click().then(function() {
					browser.sleep(500);
					expect(browser.getLocationAbsUrl()).toMatch("/entry");
				});
			});
			
		});

	});

});
