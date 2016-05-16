# Game of Drones
This is a demo app

## Run the Application

By running those commands you'll install build and start the app at _http://localhost:8000/

```
npm install
npm node-server-all
```

### Run e2e tests
Once you get up & running you can run the following command which _will drive you along the entire app flow_ as long as the tests runs

```
npm run protractor
```

## Notice
Since this an demo app and the seed's skeleton brings more tools than needed, it could be possible to find extra configuration/scripts that may not apply/work. **I ask to not add focus on those**.

## The game

It's intended the user to go along the whole flow, from the start, not refreshing the page, in that situation the app will reset the data.
Since this _is a demo_ nor is covered the permanent storing of the data nor some rules over user restrictions are implemented; also the design _was not polished_ in favor of time, instead it's provided a basic clean design based on known tools such bootstrap and font awesome (game icons).

### Rules

Rules can change, the only needed is to change in **service/src/rules.js** the order, dependency or even add multiple elements that could be defeated by one element. The keys are string based.
If you want to add more elements, you need to add them in the rules module and in the html to be handled (no extra configuration).

### What's used

- CSS
	- _No use of pre-processors_ for the very small set of styles needed
	- **Flexbox** in a couple of components

- Javascript
	- All the logic enclosed in the **app.game** module name.
	- **Route provider** for views (states [ui-router] it would be much better option if this will be a large app, ~~or have more time to add fancy stuff in this project~~).
	- Skeleton, instead of build views & components i've decided to go along classic strucure (templates, directive, controller, service, etc folders) to make it clear and easy to find. Downside, this will be harder to package if that's the intention.
	- Elements:
		- Controllers: one per view, to simplify
		- Service: A single service to connect to a "_game status machine_" in the server side.
		- Directive: a couple of small directives, in favor to show the use of it; one used **watcher and emits** the option.
		- Misc: 
			- Use of **$destroy** to cleanup data once directive/controller not longer used.
			- Use of **promises**, most of them are single calls.
			- No use of ES6 to not configure tools for compiling.
		- Tests: 
			- I've only focused in a sub set of **e2e tests** to show some examples of testing, basic implementation (didn't split them or use "page" helpers to navigate) - see at _e2e-tests/scenarios.js_
			- I've added a few browser.sleep() so you can see it navigating though app
- Node
	- Basic server usind express as a framework for REST apis.
	- A couple of modules to handle rules logic and game logic.

##Dependencies
- This is forked by https://github.com/angular/angular-seed
- Bootstrap
- Font Awesome
- [bower]: http://bower.io
- [npm]: https://www.npmjs.org/
- [node]: http://nodejs.org
- [express]: http://expressjs.com
- [protractor]: https://github.com/angular/protractor
- [jasmine]: http://jasmine.github.io
- [karma]: http://karma-runner.github.io
- [travis]: https://travis-ci.org/
- [http-server]: https://github.com/nodeapps/http-server
