const express = require('express');
const router = express.Router();

const auth = require('../routes/auth');
const client = require('../routes/client');
const order = require('../routes/order');
const sys = require('../routes/system');
const wpp = require('../routes/integracao');


router.use("/auth", auth);
router.use("/client", client);
router.use("/order", order);
router.use("/system/params", sys);
router.use("/int/wpp", wpp);

module.exports = router;