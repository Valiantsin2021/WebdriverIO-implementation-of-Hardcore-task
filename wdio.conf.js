const url = require('./utils/url')
const ENV = process.env.ENV
const brows = require('./utils/browsers.js')
const BROWSER = process.env.BROWSER
let caps
if (!ENV || !['dev', 'qa', 'stage', 'prod'].includes(ENV)) {
  console.log('please use the correct ENV value: dev | qa | stage | prod')
  process.exit()
}
if (!BROWSER || !['chrome', 'msedge'].includes(BROWSER)) {
  console.log(
    'Starting Chrome. For other browser - please add ENV and run with\
     "npm run clean && npx cross-env ENV=(chrome | edge) npm run wdio -- --suite (e2e | criticalPath | smoke)"'
  )
  caps = brows['chrome']
} else {
  caps = brows[process.env.BROWSER]
}
const allure = require('allure-commandline')
const { ReportAggregator, HtmlReporter } = require('wdio-html-nice-reporter')
let reportAggregator = ReportAggregator

exports.config = {
  specs: ['./tests/*.js'],
  suites: {
    smoke: ['./tests/SmokeCalculator.test.js'],
    criticalPath: ['./tests/CriticalPathCalculator.test.js'],
    end2end: ['./tests/End2EndCalculator.test.js']
  },
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 5,

  capabilities: [caps],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'warn',

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  // baseUrl: 'http://localhost',
  baseUrl: url[process.env.ENV],
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 20000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [['selenium-standalone', 'edgedriver', 'geckodriver']],

  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //

  reporters: [
    'spec',

    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false
      }
    ],
    [
      'html-nice',
      {
        outputDir: './report/html-reports/',
        filename: 'report.html',
        reportTitle: 'Test Report Title',
        linkScreenshots: true,
        //to show the report in a browser when done
        showInBrowser: true,
        collapseTests: false,
        //to turn on screenshots after every test
        useOnAfterCommandForScreenshot: true

        //to initialize the logger
        // LOG: log4j.getLogger("default")
      }
    ],

    [
      'junit',
      {
        outputDir: './report/junit',
        outputFileFormat: function (options) {
          // optional
          return `results-${options.cid}.${options.capabilities.browserName}.xml`
        }
      }
    ]
  ],
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  onPrepare: function (config, capabilities) {
    reportAggregator = new ReportAggregator({
      outputDir: './report/html-reports/',
      filename: 'master-report.html',
      reportTitle: 'Master Report',
      browserName: capabilities.browserName,
      collapseTests: true
    })
    reportAggregator.clean()
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {Number} exitCode 0 - success, 1 - fail
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {Number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  beforeSuite: function () {
    browser.addCommand(
      'waitAndClick',
      async function () {
        await this.waitForDisplayed()
        await this.click()
      },
      true
    )
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: function () {
    const chai = require('chai')
    const chaiWebdriver = require('chai-webdriverio').default

    chai.use(chaiWebdriver(browser))

    global.assert = chai.assert
    // global.expect = chai.expect
    global.should = chai.should
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {Object}  test             test object
   * @param {Object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {Any}     result.result    return object of test function
   * @param {Number}  result.duration  duration of test
   * @param {Boolean} result.passed    true if test has passed, otherwise false
   * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */

  afterTest: async function (step, scenario, { error }) {
    if (error) {
      const timestamp = new Date().toString().replace(/[^\w]/g, '')
      await browser.saveScreenshot(
        `./screenshots/errors/test_failed${timestamp}.png`
      )
    } else {
      await browser.takeScreenshot()
    }
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  //     browser.close()
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function () {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      await reportAggregator.createReport()
    })()
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 10000)

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)

        if (exitCode !== 0) {
          return reject(reportError)
        }

        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
}
