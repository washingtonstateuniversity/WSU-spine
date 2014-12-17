# WSU Spine Changelog

## 1.3.0 (In progress)

## 1.2.2 (TBD)
* Fix issues #168, #169, #186, #189, #191, #194
* Add `autoprefixing` to `grunt` build process
* Change build process to use custom test page task
* Update tests units

## 1.2.1 (December 4, 2014)

* Fix an issue where the mobile menu icon was not appearing on some devices.

## 1.2.0 (November 6, 2014)

### Framework Changes

* Remove `.gutless` synonym, which was likely never used.
* Update orange accent hex per brand changes.
* Add social icons for Google Plus, Instagram, Vine, Vimeo, GitHub, and Flickr
* Add `margin-left` and `margin-right` layouts to `gutter`
* Correct campus zipcode to 99164
* Adds new function `$.observeDOM()` which will allow someone to watch for changes to the dom and then react.  Look to the wiki for more information
* Abstracts the code that applies change to the nav based on user action in `$.spine.setup_spine()` to a new function `$.spine.apply_nav_func()`
* Adds a `$.spine.nav_state`

### Development Changes

* Break `gruntfile.js` into smaller options files for better management.
* Introduce CONTRIBUTING document explaning development workflow.
* Remove most compiled files from the repository.
* Refactor build process to support multiple versions in production.
* Refactor development workflow to use `develop` branch.
* Allows one to set the base url for the test units via `--setbase` ex: `grunt watch --setbase=E:\_GIT\WSU-spine\build\` when local

## 1.1.0 (August 20, 2014)


## 1.0.0 (June 30, 2014)

* Initial launch of the Spine Framework.
