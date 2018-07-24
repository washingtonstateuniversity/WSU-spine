# The deploy action expects a "version" variable with a value of
# either the word "develop" or a semver formatted version number
# such as 1.2.3.
major := $(shell echo $(version) | cut -f1 -d.)
minor := $(shell echo $(version) | cut -f2 -d.)
patch := $(shell echo $(version) | cut -f3 -d.)
dots := $(shell echo $(version) | awk -F"." '{print NF-1}')

deploy:
	grunt
ifeq ($(version),develop)
	echo "Deploying development build"
	rsync -rvzh --delete ./build/ wsuwp-indie-p2n01.web.wsu.edu:/var/www/repo.wsu.edu/spine/develop
else ifneq ($(dots),2)
    $(error Incorrect version format. The version should be "develop" or a full semantic version number (x.y.z))
else
	@echo "Deploying version $(major)"
	rsync -rvzh --delete ./build/ wsuwp-indie-p2n01.web.wsu.edu:/var/www/repo.wsu.edu/spine/$(major)
	@echo "Deploying version $(major).$(minor)"
	rsync -rvzh --delete ./build/ wsuwp-indie-p2n01.web.wsu.edu:/var/www/repo.wsu.edu/spine/$(major).$(minor)
	@echo "Deploying version $(major).$(minor).$(patch)"
	rsync -rvzh --delete ./build/ wsuwp-indie-p2n01.web.wsu.edu:/var/www/repo.wsu.edu/spine/$(major).$(minor).$(patch)
endif
