module.exports = {
	spine: {
		src: [ "<%= config.build %>/spine.css" ],
		options: {
			"fallback-colors": false,              // unless we want to support IE8
			"box-sizing": false,                   // unless we want to support IE7
			"compatible-vendor-prefixes": false,   // The library on this is older than autoprefixer.
			"ids": false,
			"regex-selectors": false,
			"adjoining-classes": false,
			"box-model": false,          // audit
			"universal-selector": false, // audit
			"unique-headings": false,    // audit
			"qualified-headings": false, // audit
			"outline-none": false,       // audit
			"known-properties": false,
			"floats": false,
			"font-sizes": false,
			"overqualified-elements": false,       // 2
			"duplicate-background-images": false,  // 2
			"important": false,                    // 2
			"duplicate-properties": 2,
			"star-property-hack": 2,
			"text-indent": 2,
			"display-property-grouping": 2,
			"shorthand": 2,
			"empty-rules": 2,
			"vendor-prefix": 2,
			"zero-units": 2
		}
	}
};