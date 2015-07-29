# WSU Spine Changelog

## 1.x.x (TBD)

### Framework Fixes

* Remove `.unset` nots - `:not(.unset)` - to clarify CSS and its specificity.
* Adjust the specificity of main header padding.

### Enhancements

* Add self-descriptive classes to aid in background positioning: `.background-size-contain`, `.background-size-cover`, `.background-repeat-no-repeat`, `.background-position-center`, `.background-position-center-top`, `.background-position-right-top`, `.background-position-right-center`, `.background-position-right-bottom`, `.background-position-center-bottom`, `.background-position-left-bottom`, `.background-position-left-center`, `.background-position-left-top`
* Add class to aid with non repeating backgrounds: `.background-repeat-no-repeat`
* Add classes to aid with sizing video containers at different aspect ratios:
	* `.aspect-ratio-22-10`
	* `.aspect-ratio-16-9`, which replaces the existing `.iframe-16-9`
	* `.aspect-ratio-4-3`, which replaces the `.iframe-4-3`
	* `.aspect-ratio-3-4`
	* `.aspect-ratio-1-1`

### Marks and Signatures

* Add and update Foundation signatures.
* Update all Zzusis references to use myWSU and https://my.wsu.edu.

## 1.2.4 (April 16, 2015)

### Framework Fixes

* Use CSS borders to construct menu icon, remove menu.svg. See #216.
* Improve math around thirds and quarters to have a better chance at equal sizing of columns and their padding in those layouts.
* Opened tabs in the Spine persist as "x" rather than only on hover.
* On a root domain (wsu.edu), show external link indicators for subdomains.
* Add specificity for signature size on smaller devices.
* Make a fluid row full width *only* when not also a column.

### Enhancements

* Add `.clear` and `.clear-both` as classes available for assigning `clear: both;`.
* Add `.clear-important` and `.clear-both-important` as classes for assigning `clear: both !important;`.
* Add `.clear-left` and `.clear-left-important` for assigning `clear: left;`.
* Add `.clear-right` and `.clear-right-important` for assinging `clear: right;`.
* Enable column by column cancellation of gutters via `.gutterless`
* Support `.equalize-medium` and `.equalize-small` as indicators that an area should be equalized intentionally at smaller screen sizes. See #226.
* Extend social sharing channels to include Google and LinkedIn.

### Marks and Signatures

* Add the WSU 125 Mark (for use in very specific scenarios).
* Add a horizontal Campaign signature (for use in very specific scenarios).
* Add grey and white Campaign signatures.
* Improvements to the Health Sciences signatures.

## 1.2.3 (January 8, 2015)

### Framework Changes

* Add further support for `.size-intermediate`.
* Add more explicit support for the override of default `spineoptions` object with `window.spineoptions`.

### Temporary Changes

* Options for `share_text`, `twitter_handle`, and `twitter_text` are now available for override.
    * This naming is not finalized and will be changed without deprecation notice.
    * Please leave a note on [#230](https://github.com/washingtonstateuniversity/WSU-spine/issues/230) to express interest in these options.

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
