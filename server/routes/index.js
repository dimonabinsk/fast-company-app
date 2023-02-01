const express = require("express");
const router = express.Router({ mergeParams: true });


// /api/auth
router.use("/auth", require("./auth.routes"));

// /api/comment
router.use("/comment", require("./auth.routes"));

// /api/profession
router.use("/profession", require("./auth.routes"));

// /api/quality
router.use("/quality", require("./auth.routes"));

// /api/user
router.use("/user", require("./auth.routes"));

module.exports = router;
