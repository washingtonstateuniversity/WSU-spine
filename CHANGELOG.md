# WSU Spine Changelog

## 1.3.0 (In progress)

## 1.2.2 (December 22, 2014)

### Framework Changes
* Deprecate `.size-smallish` class for fixed behavior in favor of `.size-intermediate`
* Fix an issue where the Spine would not resize when using an in page anchor link. (#169)
* Fix an issue where the shelved hamburger button would appear on a non-mobile view with a cropped Spine. (#189)
* Fix an issue where Spine tools disappeared in a mobile, unshelved state. (#186)
* Fix an issue where wrappers were padded by `50px` in some views. (#168)
* Show related search items by default, as opposed to unrelated search items. (#194)
* While wildly resizing a window, it was possible for multiple `min-height` transitions to start occurring. (#205)
* Resolve a namespace issue between `margin-right` as layout and `margin-right` for margining. Use for layout only. (#191)

### Development Changes
* Add `autoprefixing` to `grunt` build process to automatically add vendor prefixes to CSS for increased cross browser support. (#171)
* Change build process to use a custom test page task.
* Update tests units.

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
