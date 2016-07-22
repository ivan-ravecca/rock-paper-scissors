exports.config = {
    allScriptsTimeout: 99999,

    // The address of a running selenium server.
    // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    // The location of the selenium standalone server .jar file, relative
    // to the location of this config. If no other method of starting selenium
    // is found, this will default to
    // node_modules/protractor/selenium/selenium-server...
    seleniumServerJar: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar',

    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort: 4444,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000/',

    framework: 'cucumber',

    // Spec patterns are relative to the current working directly when protractor is called.
    specs: [
        'e2e-tests/**/*.feature'
    ],

    // Options to be passed to Cucumber.
    cucumberOpts: {
        // Require files before executing the features.
        require: [
            'node_modules/angular-protractor-cucumber/src/step-definitions/**/*.js',
            'node_modules/angular-protractor-cucumber/src/support/**/*.js',
            'e2e-tests/step-definitions/**/*.js',
            'e2e-tests/pages/**/*.js'
        ],
        // Only execute the features or scenarios with tags matching @dev.
        // This may be an array of strings to specify multiple tags to include.
        // tags: '@dev',
        // How to format features (progress, summary, pretty, json)
        format: 'pretty',
    },

    resultJsonOutputFile: './reports/results.json'
};