import homeRouter from "./homeRouter.js";
import iphoneRouter from "./iphone.js";
import ipadRouter from "./ipad.js";
import macRouter from "./mac.js";
import registerRouter from "./registerRouter.js";

function route(app) {
    app.use("/", homeRouter);
    app.use("/iphone", iphoneRouter);
    app.use("/ipad", ipadRouter);
    app.use("/mac", macRouter);
    app.use("/register", registerRouter);
}

export default route;
