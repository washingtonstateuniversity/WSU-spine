# WSU Spine

[![Build Status](https://travis-ci.org/washingtonstateuniversity/WSU-spine.svg?branch=develop)](https://travis-ci.org/washingtonstateuniversity/WSU-spine)

Visually speaking, the WSU Spine is a 198px wide column that binds together the many websites of wsu.edu. As a framework, the WSU Spine is a minimal template that provides a responsive and flexible grid for every WSU website. With a uniform and global column on the left and a blank, unwritten page to the right, the Spine upholds the unity and diversity of our university.

1. Consistently brands the university across websites and platforms
2. Provides a usable and consistent navigation solution
3. Provides a responsive solution for devices

# Implementation

A typical implementation of the WSU Spine would start with markup from spine.html.

1. Customize #spine by replacing default data with the appropriate contact details.
2. Customize the markup in spine.html by adding any out-of-the-box modifications, such as changing the color of the spine. Customization options can be found in the comments of spine.html and, for some lesser used options, at [brand.wsu.edu](https://brand.wsu.edu).
3. Rebuild the markup in your CMS of choice while taking care to preserve its elements and structure.

## Details

More information is available in this repository's <a href="https://github.com/washingtonstateuniversity/WSU-spine/wiki">Wiki</a>.

# WSU Spine Repository

The Spine framework is made available as part of a central repository at WSU.

Using this repository as an external library in your CMS or the web pages you create will help to ensure you receive the benefits of automatic updates as they are pushed. Visitors to your web pages will also benefit from faster page loads as the Spine files will likely be cached in their browser from other university properties.

Using the current major version build will ensure that you will receive all non-breaking updates automatically. This is the **recommended** method.

* `https://repo.wsu.edu/spine/1/spine.min.css`
* `https://repo.wsu.edu/spine/1/spine.min.js`

As versions change between `1.2.4` to `1.2.5` to `1.3.0`, the files at the above URLs will be automatically built and cached in users' browsers for an hour. A version change to `2.0.0` will result in a new URL and will be communicated at the time.

Specific version builds are also available for every minor version.

* `https://repo.wsu.edu/spine/1.4.6/spine.min.css`
* `https://repo.wsu.edu/spine/1.4.6/spine.min.js`

These have the benefit of being cached in browser for 120 days, though will require attention whenever the Spine is updated.

When following along with development, the following can be used:

* `https://repo.wsu.edu/spine/develop/spine.min.css`
* `https://repo.wsu.edu/spine/develop/spine.min.js`

These are cached in the browser for only 10 minutes and can be considered bleeding edge. This is the first place to test fixed bugs, but may also be considered unstable from time to time.

# Contributing to WSU Spine

Contributions to the WSU Spine project are welcome in the form of discussion (through our [GitHub issues](https://github.com/washingtonstateuniversity/WSU-spine/issues)) or code. To learn more about contributing code, please see our [Contribution Guidelines](https://github.com/washingtonstateuniversity/WSU-spine/blob/develop/CONTRIBUTING.md).
