const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const apiRoutes = require("./api");

// Set up the base paths for each group of routes
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
