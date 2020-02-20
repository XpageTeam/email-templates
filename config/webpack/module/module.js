module.exports = (mode, buildType) => ({
    rules: require("./rules/rules.js")(mode, buildType)
})