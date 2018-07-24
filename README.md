# WSU Spine

[![Build Status](https://travis-ci.org/washingtonstateuniversity/WSU-spine.svg?branch=develop)](https://travis-ci.org/washingtonstateuniversity/WSU-spine)

Visually speaking, the WSU Spine is a 198px wide column that binds together the many websites of wsu.edu. As a framework, the WSU Spine is a minimal template that provides a responsive and flexible grid for every WSU website. With a uniform and global column on the left and a blank, unwritten page to the right, the Spine upholds the unity and diversity of our university.

1. Consistently brands the university across websites and platforms
2. Provides a usable and consistent navigation solution
3. Provides a responsive solution for devices

# Implementation

A typical implementation of the WSU Spine would start with markup from the `spine.html` file in this repository.

1. Customize the `#spine` element by replacing default data with appropriate contact details.
2. Customize the markup in `spine.html` by adding any out-of-the-box modifications, such as changing the color of the spine. Customization options can be found in the comments of `spine.html` and, for some lesser used options, at [brand.wsu.edu](https://brand.wsu.edu).
3. Rebuild the markup in your CMS of choice while taking care to preserve its elements and structure.

## Details

More information is available in this repository's <a href="https://github.com/washingtonstateuniversity/WSU-spine/wiki">Wiki</a>.

# WSU Spine Repository

The Spine framework is made available as part of a central repository at WSU.

Using this repository as an external library in your CMS or the web pages you create will help to ensure you receive the benefits of automatic updates as they are pushed. Visitors to your web pages will also benefit from faster page loads as the Spine files will likely be cached in their browser from other university properties.

Using the current major version build will ensure that you will receive all non-breaking updates automatically. This is the **recommended** method.

* `https://repo.wsu.edu/spine/2/spine.min.css`
* `https://repo.wsu.edu/spine/2/spine.min.js`

As versions change between `2.0.2` to `2.0.3` to `2.1.0`, the files at the above URLs will be automatically built and cached in users' browsers for an hour. A version change to `3.0.0` will result in a new URL and will be communicated at the time.

Specific version builds are also available for every minor version.

* `https://repo.wsu.edu/spine/2.0.2/spine.min.css`
* `https://repo.wsu.edu/spine/2.0.2/spine.min.js`

These have the benefit of being cached in browser for 120 days, though will require attention whenever the Spine is updated.

When following along with development, the following can be used:

* `https://repo.wsu.edu/spine/develop/spine.min.css`
* `https://repo.wsu.edu/spine/develop/spine.min.js`

These are cached in the browser for only 10 minutes and can be considered bleeding edge. This is the first place to test fixed bugs, but may also be considered unstable from time to time.

# Releasing a new version

* `git checkout master` - Check out the master branch locally.
* `git checkout -b release-2.0.2` - Check out a release branch based on `master`.
* `git merge develop` - Merge the `develop` branch into the release branch.
* Resolve any conflicts during the merge process.
* Update `$locality` and `$font_domain` in `styles/sass/vars/_global.scss` to reference the correct version number. These both use `develop` for the `develop` branch and the full, latest version number in the `master` branch.
    * Example: `$locality: 'https://repo.wsu.edu/spine/2.0.2';`
    * Example: `$font_domain: '//repo.wsu.edu/spine/2.0.2';`
* Update the `CHANGELOG.md` file with the upcoming version number, date, and description of changes.
* Update `package.json` version number to the upcoming version number.
* Use `npm install` to automatically update `package-lock.json` with the new version number.
* Commit version number changes to the release branch.
* `git checkout master` - Check out the master branch.
* `git merge release-2.0.2` - Merge the release branch into the master branch.
* `git push origin master` - Push the master branch to GitHub.
* `git checkout develop` - Check out the develop branch.
* `git merge release-2.0.2` - Merge the release branch into the develop branch.
* Update `$locality` and `$font_domain` in `styles/sass/vars/_global.scss` to reference the `develop` version.
    * Example: `$locality: 'https://repo.wsu.edu/spine/develop';`
    * Example: `$font_domain: '//repo.wsu.edu/spine/develop';`
* Commit version changes to the develop branch.
* `git push origin develop` - Push the develop branch to GitHub.
* Use the GitHub release interface to tag a new version number based on the latest position of the `master` branch.

The `master` and `develop` branches should now be different by only one commit, the one used to update the `develop` branch for development again. Use `git fetch --all` to retrieve new tags locally so that you can deploy as needed.

# Deployment at WSU

A `Makefile` is included with the repository to aid in the deployment of the WSU Spine to the server hosting repo.wsu.edu.

For deployment to work, you must be authorized on the wsuwp-indie-p2n01.web.wsu.edu server. This likely means that you are a member of the web team at WSU and have the appropriate network access required.

From a command line within the Spine directory on your local machine:

* `make deploy version=develop` deploys your current branch to the develop directory. `repo.wsu.edu/spine/develop/...`
* `make deploy version=2.0.2` should be used after tagging a release and deploys the current working directory to three different branch directories.
    * `repo.wsu.edu/spine/2.0.2/...`
    * `repo.wsu.edu/spine/2.0/...`
    * `repo.wsu.edu/spine/2/...`

If a version number that is not `develop` or a semver type number is passed, the deployment will fail with an error message.

# Contributing to WSU Spine

Contributions to the WSU Spine project are welcome in the form of discussion (through our [GitHub issues](https://github.com/washingtonstateuniversity/WSU-spine/issues)) or code. To learn more about contributing code, please see our [Contribution Guidelines](https://github.com/washingtonstateuniversity/WSU-spine/blob/develop/CONTRIBUTING.md).
