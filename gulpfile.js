"use strict";

const $ = require("gulp-load-plugins")(),
	gulp = require("gulp"),
	browserSync = require("browser-sync").create(),
	gutil = require("gulp-util"),
	sourcemaps = require("gulp-sourcemaps"),
	ftp = require("vinyl-ftp"),
	emailBuilder = require("gulp-email-builder");

let connectionSettings = require("./accesses/accesses.js");

const xpager_conn = ftp.create({
	host:      connectionSettings.xpager.host,
	user:      connectionSettings.xpager.user,
	password:  connectionSettings.xpager.password,
	parallel: 2,
	log: gutil.log
});

gulp.task('browser-sync', () =>  {
	browserSync.init({
		server: {
			baseDir: 'docs'
		},
		notify: false
	});

	browserSync.watch([
		"docs/css/*.css",
		"docs/*.html",
	]).on("change", browserSync.reload);
});

gulp.task("postcss", _ => 
	gulp.src([
			"src/sss/main.sss", 
		])
		.pipe(sourcemaps.init())
		.pipe($.postcss([
			require("postcss-nesting"),
			require("postcss-nested"),
		], {parser: require("sugarss")})).on("error", $.notify.onError())
		.pipe($.rename(path => {
			path.extname = path.extname == ".sss" ? ".css" : path.extname;
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("docs/css"))
);

gulp.task("pug", _ => 
	gulp.src("src/pug/*.pug")
		.pipe($.pug({pretty: true}))
		.pipe(gulp.dest("docs"))
);

gulp.task("make:mail", () => 
	gulp.src("docs/*.html")
		.pipe(emailBuilder().build())
		.pipe(gulp.dest("docs/"))
);

gulp.task('imagemin', () =>  
	gulp.src([
			'src/img/**/*',
			'!src/img/**/*.mp4'
			], {since: gulp.lastRun("imagemin")})
		 .pipe($.cache($.imagemin([
				$.imagemin.jpegtran({
					progressive: true,
				}),
				require("imagemin-jpeg-recompress")({
					loops: 1,
					min: 80,
					max: 95,
					quality: "high"
				}),
				// $.imagemin.svgo(),
				$.imagemin.optipng({optimizationLevel: 3}),
	      		//require("imagemin-pngquant")({quality: '75-85', speed: 5})
			],{
	     		verbose: true
	    	})
		 ))
		.pipe(gulp.dest('docs/img'))
);

gulp.task("deploy:docs", _ => 
	gulp.src("docs/**/*.*", {buffer: false})
		.pipe(xpager_conn.dest(connectionSettings.xpager.dirName))
);

gulp.task("deploy", gulp.series(gulp.parallel("postcss", "pug", "imagemin"), "make:mail", "deploy:docs"));


const local = _ => {
	gulp.watch(["src/sss/*.sss"], gulp.series("postcss"));
	gulp.watch('src/pug/**/*', gulp.series("pug"));
	gulp.watch("src/img/**/*", gulp.series("imagemin"));
};

gulp.task("default", gulp.series(gulp.parallel("postcss", "pug", "imagemin"), gulp.parallel(local, "browser-sync")))

gulp.task('clearcache', (callback) => { $.cache.clearAll(); callback();});