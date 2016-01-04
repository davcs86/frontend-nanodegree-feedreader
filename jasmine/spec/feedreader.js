/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/**
 * Object with a custom matcher which loops though the allFeeds items and check if all of them have a specific non-empty property.
 */
var customMatchers = {
    allItemsAreObjectsThatHaveThisMember : function() {
        return {
            /**
             * Validates if all the objects, in the array "actual", have a non-empty property and it's named as "expected".
             * Returns an object with the result of the comparison test. If the property 'pass' is false, the test failed. The object also contains
             * a message to describe the reason of the failure.
             * @param {array} actual - Array of objects that is going to be tested
             * @param {string} expected - Name of the property that is going to be searched in the objects
             */
            compare: function(actual, expected) {
                var result = {};
                result.pass = true;
                result.message = 'All items of ' + JSON.stringify(actual) + ' have a non-empty property called '+ expected;
                if (Object.prototype.toString.call( actual ) !== '[object Array]'){
                    // Check if the parameter "actual" is an array
                    result.pass = false;
                    result.message = JSON.stringify(actual) + ' is not an array';
                } else if (typeof expected !== 'string'){
                    // Check if the name of the property is a string
                    result.pass = false;
                    result.message = JSON.stringify(expected) + ' is not a string';
                } else {
                    // If "actual" is an array and "expected" is a string
                    for(var i = 0; i < actual.length; i++) {
                        // Iterates over the "actual" array, then check if has a string property named as "expected" and if it's non-empty.
                        if (typeof(actual[i][expected]) !== 'string' || (typeof(actual[i][expected]) === 'string' && actual[i][expected] === '')) {
                            result.pass = false;
                            result.message = 'The item ' + JSON.stringify(actual[i]) + ' does not have a non-empty property called ' + expected;
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
    /**
     * This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    /**
     * Test suite 'RSS Feeds'
     */
    describe('RSS Feeds', function() {
        // Add the custom matchers
        beforeEach(function(){
            jasmine.addMatchers(customMatchers);
        });

        /**
         * This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            // Check if the allFeeds variable is defined
            expect(allFeeds).toBeDefined();
            // Check if the allFeeds variable is not empty
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have an URL defined and that the URL is not empty', function() {
            // Check if the all the objects in allFeeds has a property named 'url' and it's not empty
            expect(allFeeds).allItemsAreObjectsThatHaveThisMember('url');
        });

        /**
         * Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and that the name is not empty', function() {
            // Check if the all the objects in allFeeds has a property named 'name' and it's not empty
            expect(allFeeds).allItemsAreObjectsThatHaveThisMember('name');
        });
    });
    /**
     * Test suite 'The menu'
     */
    describe('The menu', function() {
        /**
         * Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            // Check if the body element has the class 'menu-hidden', which is used to hide the menu
            expect($('body')).toBeMatchedBy('.menu-hidden');
        });

        /**
         * Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
        */
        it('changes when the menu icon is clicked', function() {
            // Check if the body element has the class 'menu-hidden' (menu is hidden)
            expect($('body')).toBeMatchedBy('.menu-hidden');
            // Trigger a click over the menu icon.
            $('.menu-icon-link').trigger('click');
            // Check if the body element didn't have the class 'menu-hidden' (menu is shown)
            expect($('body')).not.toBeMatchedBy('.menu-hidden');
            // Trigger a click over the menu icon.
            $('.menu-icon-link').trigger('click');
            // Check if the body element has the class 'menu-hidden' (menu is hidden)
            expect($('body')).toBeMatchedBy('.menu-hidden');
        });
    });
    /**
     * Test suite 'Initial Entries'
     */
    describe('Initial Entries', function() {
        /**
         * Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            /**
             * Call asynchronously the method loadFeed, when this finishes
             * it will execute the next beforeEach / it method through the callback parameter 'done'
             */
            loadFeed(0, done);
        });
        it('are created asynchonously by loadFeed', function(){
            // Check if the feed container (.feed) has at least one child element (.entry)
            expect($('.feed')).toContainElement('.entry');
        });
    });
    /**
     * Test suite 'New Feed Selection'
     */
    describe('New Feed Selection', function() {
        /**
         * Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var previousState;
        beforeEach(function(done) {
            /**
             * Call asynchronously the method loadFeed for the first feed (index 0),
             * when this finishes it will execute the next beforeEach / it method through the callback parameter 'done'
             */
            loadFeed(0, done);
        });
        beforeEach(function(done) {
            /**
             * Call asynchronously the method loadFeed for the second feed (index 1),
             * but before saves the current state in the variable "previousState"
             * when this finishes it will execute the next beforeEach / it method through the callback parameter 'done'
             */
            previousState = $('.feed').html();
            loadFeed(1, done);
        });
        it('changes the content', function(){
            var finalState = $('.feed').html();
            // Check if the content after executing loadFeed(0) is different of the current value after executing loadFeed(1)
            expect(finalState).not.toEqual(previousState);
         });
    });
}());
