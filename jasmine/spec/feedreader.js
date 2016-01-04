/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

var customMatchers = {
    allItemsAreObjectAndHaveThisMember : function() {
        return {
            compare: function(actual, expected) {
                var result = {};
                result.pass = true;
                result.message = "All items of " + JSON.stringify(actual) + " have a non-empty member called "+ expected;
                if (Object.prototype.toString.call( actual ) !== '[object Array]'){
                    result.pass = false;
                    result.message = JSON.stringify(actual) + " is not an array";
                } else if (typeof expected !== 'string'){
                    result.pass = false;
                    result.message = JSON.stringify(expected) + " is not a string";
                } else {
                    for(var i = 0; i < actual.length; i++) {
                        if (typeof(actual[i][expected]) !== 'string' || (typeof(actual[i][expected]) === 'string' && actual[i][expected] === '')) {
                            result.pass = false;
                            result.message = "The item " + JSON.stringify(actual[i]) + " does not have a non-empty member called "+ expected;
                            break;
                        }
                    }
                }
                return result;
            }
        }
    }
}

$(function() {
    beforeEach(function(){
        jasmine.addMatchers(customMatchers);
    });
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have an URL defined and that the URL is not empty', function() {
            expect(allFeeds).allItemsAreObjectAndHaveThisMember('url');
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and that the name is not empty', function() {
            expect(allFeeds).allItemsAreObjectAndHaveThisMember('name');
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    });


    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
