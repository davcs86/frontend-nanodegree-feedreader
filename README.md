# Feedreader (javascript testing) project

Project #5 for Udacity's front-end web developer nanodegree program by davcs86.

## Tasklist

1. Download the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader).
1. Review the functionality of the application within your browser.
1. Explore the application's HTML (*./index.html*), CSS (*./css/style.css*) and JavaScript (*./js/app.js*) to gain an understanding of how it works.
1. Explore the Jasmine spec file in *./jasmine/spec/feedreader.js*
1. Edit the allFeeds variable in *./js/app.js* to make the provided test fail and see how Jasmine visualizes this failure in your application.
1. Return the allFeeds variable to a passing state.
1. Write a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
1. Write a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
1. Write a new test suite named "The menu".
1. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
1. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
1. Write a test suite named "Initial Entries".
1. Write a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
1. Write a test suite named "New Feed Selection".
1. Write a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes. Remember, loadFeed() is asynchronous.
1. When complete - all of your tests should pass.

## Changelog

- **Tasks 1-8**: Added a custom matcher for jasmine which loops though the allFeeds items and check if all of them have a specific non-empty property.

```js
var customMatchers = {
    allItemsAreObjectsThatHaveThisMember : function() {
        return {
            /**
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
```
- **Tasks 9-11**: Takes advantage of jasmine-jquery to check if a element has a class, which is used to hide/show the menu.

- **Tasks 12-13**: Takes advantage of the [asynchronous support](http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support) of jasmine to check if loadFeed method is creating the .entry elements.

- **Tasks 14-15**: Uses asynchronous chaining in order to call 2 times loadFeed with different feed each time, then check if executing loadFeed with different argument was resulting in a content change.
