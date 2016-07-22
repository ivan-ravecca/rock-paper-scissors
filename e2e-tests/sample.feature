Feature: As a good developer i want to test my angular app in BDD

Scenario: I want to see the home page
Given I am on the "home"
When I fill "userA" field with "TestUserA"
And I fill "userB" field with "TestUserB"
And I click on the button "start"
Then I should be redirected on "play"