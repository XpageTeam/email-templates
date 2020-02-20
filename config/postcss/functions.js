const color = require('css-color-converter');

module.exports = {
	darken(value, frac) {
		var darken = 1 - parseFloat(frac);
		var rgba = color(value).toRgbaArray();
		var r = rgba[0] * darken;
		var g = rgba[1] * darken;
		var b = rgba[2] * darken;
		return color([r,g,b]).toHexString();
	},
	lighten(value, frac) {
		var darken = 1 + parseFloat(frac);
		var rgba = color(value).toRgbaArray();
		var r = rgba[0] * darken;
		var g = rgba[1] * darken;
		var b = rgba[2] * darken;
		return color([r,g,b]).toHexString();
	},
	rgba(value, frac){
		if (arguments.length != 2)
			return "rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+", "+arguments[3]+")"

		var rgba = color(value).toRgbaArray();
		var r = parseInt(rgba[0] * frac);
		var g = parseInt(rgba[1] * frac);
		var b = parseInt(rgba[2] * frac);

		return "rgba("+r+","+g+","+b+", "+frac+")"

		// return color([r,g,b]).toHexString();
	},

	persent(value, base = 1396){
		return (value / base * 100).toFixed(2) + "%"
	},
	vw(value, base = 1903){
		return (parseInt(value) / base * 100).toFixed(2) + "vw"
	},
	vh(value, base = 968){
		return (parseInt(value) / base * 100).toFixed(2) + "vh"
	},
	lh(pxLh, pxFs){
		return (pxLh / pxFs).toFixed(2)
	},
	em(value, base = 15){
		return (parseInt(value) / base).toFixed(2) + "em"
	},
	rem(value){
		return (parseInt(value) / 16).toFixed(2) + "rem"
	}
};