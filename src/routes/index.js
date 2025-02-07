const homeRouter = require("./home");
const iphoneRouter = require("./iphone");
const ipadRouter = require("./ipad");
const macRouter = require("./mac");

function route(app) {
    app.use("/", homeRouter);
    app.use("/iphone", iphoneRouter);
    app.use("/ipad", ipadRouter);
    app.use("/mac", macRouter);
}

module.exports = route;
