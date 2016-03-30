module.exports = {
	spine: {
		src: [ "<%= config.build %>/spine.css" ],
		options: {
			"fallback-colors": false,              // unless we want to support IE8
			"box-sizing": false,                   // unless we want to support IE7
			"compatible-vendor-prefixes": false,   // The library on this is older than autoprefixer.
			"overqualified-elements": false,       // We have weird uses that will always generate warnings.
			"known-properties": false,             // Our use of manipulation for touch-action generates an error.
			"display-property-grouping": false,    // We can't guarantee back-compat with this enabled yet.
			"ids": false,
			"regex-selectors": false,              // audit
			"adjoining-classes": false,
			"box-model": false,                    // audit
			"universal-selector": false,           // audit
			"unique-headings": false,              // audit
			"outline-none": false,                 // audit
			"floats": false,
			"font-sizes": false,                   // audit
			"important": false,                    // This should be set to 2 one day.
			"qualified-headings": 2,
			"duplicate-background-images": 2,
			"duplicate-properties": 2,
			"star-property-hack": 2,
			"text-indent": 2,
			"shorthand": 2,
			"empty-rules": 2,
			"vendor-prefix": 2,
			"zero-units": 2
		}
	}
};
