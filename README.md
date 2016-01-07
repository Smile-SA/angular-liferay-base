# angular-liferay-base

This project aims to ease working with Angular applications into a Liferay portlet.
It will take care of the initialization (boostrap) and expose some Liferay utils in an Angular compatible way (promise on Liferay services or handy constants).



## Documentation

Everything should be in the wiki =)



## Release History

- 0.1.0 : initial version



## Development



### How to release

Before release, don't forget to do a full build:

	grunt

The project use [grunt-release](https://github.com/geddski/grunt-release) for its versionning an tag process:

	grunt release --no-write

If everything seems fine:

	grunt release
