import homeRouter from "./homeRouter.js";
import iphoneRouter from "./iphone.js";
import ipadRouter from "./ipad.js";
import macRouter from "./mac.js";
import registerRouter from "./registerRouter.js";
import productRouter from "./productDetail.js";
import loginRouter from "./loginRouter.js";
import logoutRouter from './logout.js';
import profileRouter from './profileRouter.js';
import searchRoute from "./searchRoute.js";
import breadcrumbRouter from "./breadcrumbRoute.js";
import reviewRoutes from './reviewRouter.js';


function route(app) {
    app.use("/", homeRouter);
    app.use("/iphone", iphoneRouter);
    app.use("/ipad", ipadRouter);
    app.use("/mac", macRouter);
    app.use("/register", registerRouter);
    app.use("/login", loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/profile', profileRouter);
    app.use("/search", searchRoute);
    app.use('/search/search-suggestions', searchRoute);
    app.use("/", productRouter);
    app.use("/breadcrumb", breadcrumbRouter);
    app.use('/reviews', reviewRoutes);

}

export default route;
