module.exports = {
	spine: {
		src: [ "<%= config.build %>/spine.css" ],
		options: {
			"fallback-colors": false, // unless we want to support IE8
			"box-sizing": false,      // unless we want to support IE7
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
			"star-property-hack": 2,
			"text-indent": true,
			"font-sizes": true,
			"display-property-grouping": true,
			"shorthand": false,                    // true
			"duplicate-properties": false,         // true
			"compatible-vendor-prefixes": false,   // The library on this is older than autoprefixer.
			"overqualified-elements": false,       // 2
			"duplicate-background-images": false,  // 2
			"important": false,                    // 2
			"empty-rules": false,                  // 2
			"vendor-prefix": 2,
			"zero-units": 2
		}
	}
};