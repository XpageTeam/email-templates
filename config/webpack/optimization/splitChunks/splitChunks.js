module.exports = {
    cacheGroups: {
        vendors: {
            test: /^.*node_modules((?!imask|dom7|ssr-window|swiper).)*$/,
            // test: /(node_modules)/,
            name: 'vendors',
            enforce: true,
            chunks: 'all',
        },
        // lol: {
        //     test: /(jquery.fancybox.js|jquery.fancybox.css)/,
        //     name: 'vendors',
        //     enforce: true,
        //     chunks: 'all'
        // },
        // preloader: {
        // 	test: "/(preloader.ts)/",
        // 	name: "js/preloader",
        // 	enforce: true,
        //     chunks: 'all',
        // },
        xpage: {
            test: /^.*xpage((?!index|select|mobileMenu).)*$/,
            name: 'xpage',
            enforce: true,
            chunks: 'all'
        }
    }
}