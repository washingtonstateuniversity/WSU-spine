# WSU Spine Changelog

## 1.4.6 (May 1, 2017)

* Fix incorrect tag.

## 1.4.5 (May 1, 2017)

### Bug Fixes

* Add a title attribute to the Spine search input.
* Add a title attribute to the Menu button.
* Assign a background color to `#glue` unless using vellum.
* Remove unnecessary prevention of click/touchend on search input.
* Fix contrast issue for non-focused text inputs.

## 1.4.4 (April 7, 2017)

### Enhancmenets

* Introduce stylelint as a replacement for csslint. See [#398](https://github.com/washingtonstateuniversity/WSU-spine/pull/398)
* Update the signature SVGs for the `.darker` Spine to be fully accessible. See [#399](https://github.com/washingtonstateuniversity/WSU-spine/pull/399)
* Remove unused signature SVGs. See [#366](https://github.com/washingtonstateuniversity/WSU-spine/issues/366)

### Bug Fixes

* Add a space before generated postal code HTML. See [#393](https://github.com/washingtonstateuniversity/WSU-spine/issues/393)
* Update HTML5 shiv URL to new CDN location. See [#389](https://github.com/washingtonstateuniversity/WSU-spine/issues/389)
* Remove cursor override for active parents. See [#391](https://github.com/washingtonstateuniversity/WSU-spine/issues/391)

## 1.4.3 (June 7, 2016)

### Enhancements

* Adjust Spine colors for various themes and nav elements. See [#353](https://github.com/washingtonstateuniversity/WSU-spine/issues/353) for the discussion and [#381](https://github.com/washingtonstateuniversity/WSU-spine/pull/381)
* Allow multiple nav sections to be open at the same time in the Spine. See [#367](https://github.com/washingtonstateuniversity/WSU-spine/issues/367)
* Allow the current nav section to be toggled closed. See [#386](https://github.com/washingtonstateuniversity/WSU-spine/pull/386)
* Several adjustments to test HTML markup to help better describe expected conditions of the Spine.

### Bug Fixes

* Only apply box shadow to `#glue` on `.spine-mobile-open`. See [#374](https://github.com/washingtonstateuniversity/WSU-spine/pull/374)
* Remove `spine-mobile-open` from `html` on resize to full screen. See [#375](https://github.com/washingtonstateuniversity/WSU-spine/pull/375)
* Apply a max width of 100% to `figure`. See [#382](https://github.com/washingtonstateuniversity/WSU-spine/pull/382)
* Allow other HTML tags inside anchor elements in the Spine navigation. See [#385](https://github.com/washingtonstateuniversity/WSU-spine/pull/385)

## 1.4.2 (March 31, 2016)

### Bug Fixes

* Process couplets into Overview anchors before checking their active state so that a child's parent's Overview link doesn't show as active because of an over-eager clone.

### Enhancements

* Short circuit Overview creation if a parent has a `#` href, speeding up the processing of large, multi-level menus.

## Bug Fixes

* Some horizontal mobile signatures were not being applied correctly. Our test HTML assigned the signature class to `html`, but code in the wild assigns these classes to `body` instead. We should handle both scenarios. See [#361](https://github.com/washingtonstateuniversity/WSU-spine/pull/361).
* One of the Health Sciences Spokane marks was missing, and has likely been missing for a long time. See [#364](https://github.com/washingtonstateuniversity/WSU-spine/pull/364).

## 1.4.0 (March 30, 2016)

### Enhancements

This release refactors how the Spine is handled on mobile devices. Previously, we shared the logic used on larger views for calculating the heights of and resizing `#glue` and `main` as the browser resized or the document scrolled. Not using a `position: fixed` header had a tendency to cause issues when scrolling through the menu on both iOS and Android devices. Android devices had troubles scrolling at all.

We now move elements in the DOM around a bit when a mobile view is detected. The Spine's header becomes a fixed element at the top of the screen. The `#glue` is moved into its own `#scroll` element that is allowed to scroll separately from the document as a whole. The navigation appears and disappears [smoothly](http://apeatling.com/building-smooth-sliding-mobile-menu/) and is much more useable on iOS and Android devices.

This is all handled in JavaScript, yet significantly reduces the amount of Spine JavaScript necessary on mobile devices. No change in markup is necessary on individual pages, it will just work.

See [#314](https://github.com/washingtonstateuniversity/WSU-spine/pull/314), [#318](https://github.com/washingtonstateuniversity/WSU-spine/pull/318), [#332](https://github.com/washingtonstateuniversity/WSU-spine/pull/332), [#333](https://github.com/washingtonstateuniversity/WSU-spine/pull/333), [#334](https://github.com/washingtonstateuniversity/WSU-spine/pull/334), and [#337](https://github.com/washingtonstateuniversity/WSU-spine/pull/337) for the majority of mobile related changes.

### Framework Fixes

* Treat mobile navigation the same in Fluid, Hybrid, and Fixed grid layouts. 990px is the mark at which we show mobile navigation. See [#338](https://github.com/washingtonstateuniversity/WSU-spine/pull/338).
* Refactor how `#glue` positioning is handled on scroll. This fixes a bug where the navigation could appear jumpy at certain spots depending on the size of the document and the size of the window. See [#342](https://github.com/washingtonstateuniversity/WSU-spine/pull/342).
* Along with that, simplify how `min-height` is calculated for `main`. See [#343](https://github.com/washingtonstateuniversity/WSU-spine/pull/343).
* Calculate the height of the area exposed by the Spine action links based on `window`, not `main` so that things don't disappear in a strange way. See [#341](https://github.com/washingtonstateuniversity/WSU-spine/pull/341).
* Improve the focus state of Spine action items. Previously they would get lost if navigated through by keyboard. See [#340](https://github.com/washingtonstateuniversity/WSU-spine/pull/340).
* Provide explicit button types for `button` elements added to the DOM by the Spine. See [#347](https://github.com/washingtonstateuniversity/WSU-spine/pull/347).
* Remove a `line-height: 1em` rule applied to `figcaption` that squashed text in captions.
* Simplify and document scripting to add `active`, `dogeared` to nav. See [#328](https://github.com/washingtonstateuniversity/WSU-spine/pull/328).

### Removed

* Remove unused implementation of Spine analytics in favor of jTrack. See [#326](https://github.com/washingtonstateuniversity/WSU-spine/pull/326).
* Remove the `dump` function that was provided to aid in code debugging. This was not in use anywhere in the Spine. See [#327](https://github.com/washingtonstateuniversity/WSU-spine/pull/327).
* Remove a series of unused SVG assets. See [#325](https://github.com/washingtonstateuniversity/WSU-spine/pull/325).
* Remove our custom Open Sans fonts. This font should be loaded via Google's CDN instead. See [#309](https://github.com/washingtonstateuniversity/WSU-spine/pull/309).

### Development Changes

* Apply an initial JSCS configuration based on the [jQuery style guide](https://contribute.jquery.org/style-guide/js/). All JavaScript code must now conform to these standards. See [#348](https://github.com/washingtonstateuniversity/WSU-spine/pull/348).
* Introduce CSS linting. The [configuration file](https://github.com/washingtonstateuniversity/WSU-spine/blob/develop/tasks/options/csslint.js) explains this best.
* Use PostCSS to apply vendor prefixes. See the [configuration file](https://github.com/washingtonstateuniversity/WSU-spine/blob/develop/tasks/options/postcss.js).
* Replace the Ruby based `grunt-contrib-sass` with the much faster `grunt-sass`. See [#322](https://github.com/washingtonstateuniversity/WSU-spine/pull/322).
* Revisit and clarify JSHint rules. See [#335](https://github.com/washingtonstateuniversity/WSU-spine/pull/335).

## 1.3.1 (August 31, 2015)

### Framework Fixes

* Fix an issue where Spine search input text was clipping in Firefox and IE.

### Miscellaneous

* Adjust recommended jQuery and jQuery UI versions in Spine HTML.

## 1.3.0 (August 3, 2015)

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
