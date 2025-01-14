/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {
	var time = new Date().getTime();
	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?v='+ time +'"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
				'views/**/*.html': require('../pipeline').jsFilesToInject,
				'views/**/*.ejs': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?v='+ time +'"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
				'views/**/*.html': require('../pipeline').jsFilesToInject,
				'views/**/*.ejs': require('../pipeline').jsFilesToInject
			}
		},

		prodJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?v='+ time +'"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.js']
			}
		},

		prodJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?v='+ time +'"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.js']
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: `<link rel="stylesheet" href="%s?v=${time}">`,
				appRoot: '.tmp/public'
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: `<link rel="stylesheet" href="%s?v=${time}">`,
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssFilesToInject
			}
		},

		prodStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: `<link rel="stylesheet" href="%s?v=${time}">`,
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: `<link rel="stylesheet" href="%s?v=${time}">`,
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTpl: {
			options: {
				startTag: '<!--TEMPLATES-->',
				endTag: '<!--TEMPLATES END-->',
				fileTmpl: `<script type="text/javascript" src="%s?v=${time}"></script>`,
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/jst.js'],
				'views/**/*.html': ['.tmp/public/jst.js'],
				'views/**/*.ejs': ['.tmp/public/jst.js']
			}
		},

		devJsPug: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: `script(src="%s?v=${time}")`,
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.pug': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelativePug: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: `script(src="%s?v=${time}")`,
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.pug': require('../pipeline').jsFilesToInject
			}
		},

		prodJsPug: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: `script(src="%s?v=${time}")`,
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.pug': ['.tmp/public/min/production.min.js']
			}
		},

		prodJsRelativePug: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: `script(src="%s?v=${time}")`,
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.pug': ['.tmp/public/min/production.min.js']
			}
		},

		devStylesPug: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: `link(rel="stylesheet", href="%s?v=${time}")`,
				appRoot: '.tmp/public'
			},

			files: {
				'views/**/*.pug': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelativePug: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: `link(rel="stylesheet", href="%s?v=${time}")`,
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'views/**/*.pug': require('../pipeline').cssFilesToInject
			}
		},

		prodStylesPug: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: `link(rel="stylesheet", href="%s?v=${time}")`,
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.pug': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelativePug: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: `link(rel="stylesheet", href="%s?v=${time}")`,
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.pug': ['.tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTplPug: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: `script(type="text/javascript", src="%s?v=${time}")`,
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.pug': ['.tmp/public/jst.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};
