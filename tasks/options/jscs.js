module.exports = {
    spine_files : {
        src: "scripts/*.js",
        options: {
            preset: "jquery",
            verbose: true,                                 // Display the rule name with the warning.
            requireCamelCaseOrUpperCaseIdentifiers: false, // We rely on name_name too much to change them all.
            maximumLineLength: 250,                        // temporary
        }
    }
};
