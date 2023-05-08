const { Router } = require('express');
const router = Router();
const dogRouter = require("./dogs")
const temperamentRouter = require("./temperaments")

router.use('/', dogRouter)
router.use('/', temperamentRouter)



module.exports = router;