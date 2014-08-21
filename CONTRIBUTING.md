# Contribute to the WSU Spine

## Overview

### Getting Started

1. [Create](https://help.github.com/articles/signing-up-for-a-new-github-account) a GitHub account.

### Submitting patches to change core Spine code

1. [Fork](https://help.github.com/articles/fork-a-repo) this repository to your GitHub account **or**, if you have access, [create a new branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository) on the WSU Spine project.
2. [Clone your fork](https://help.github.com/articles/duplicating-a-repository) or checkout the new branch locally.
3. Make the desired changes to the core code and commit.
4. Push your changes to GitHub and [open a pull request](https://help.github.com/articles/creating-a-pull-request) explaining the changes and the reasoning.

### Submitting feature requests or bug reports

1. Browse the Spine's [current issues](https://github.com/washingtonstateuniversity/WSU-spine/issues) for anything that may be a duplicate of the issue you are reporting.
2. Create a new issue and describe the steps required to reproduce the bug or the details behind the new feature.

## Development Workflow

1. The latest available work is available in the **develop** branch.
	* Any changes merged to this branch are immediately built in a bleeding edge location at `https://repo.wsu.edu/spine/develop/spine.min.css` and `https://repo.wsu.edu/spine/develop/spine.min.js`
	* A demo HTML file is available for testing at [https://repo.wsu.edu/spine/develop/demo.html](https://repo.wsu.edu/spine/develop/demo.html)
1. Changes are made in topical branches for both features and bugs and then merged into **develop**.
	* Only commits related to version bumping and merges are made directly to the develop branch.
	* A fork of the develop branch to your personal account is considered a topical branch.
	* A new branch on this repository is also considered a topical branch.
1. When a release has been prepared as stable in **develop**, it is merged into **master** and tagged with a version number.
1. If a bug is found in a past major version, a branch for that version will be created. Continued stable releases will be tagged on this branch.

### Commits

1. Break commits into logical groups of changes.
2. Format your commit messages with a short title on the first line explaining the commit followed by a full explanation of the decision and reasoning.

````
    A short title describing the issue at hand

    A longer description of what is actually being changed in the commit.
    If possible, each line of this description should be no more than 80
    characters so that it appears correctly in terminal screens and other
    places that kind of expect it that way.

    This is in no way a requirement, just a formatting preference. :)
````

3. Run `grunt dev` to ensure nothing has broken. `grunt prod` can also be used to check the full build process.