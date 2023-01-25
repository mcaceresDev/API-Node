const express = require("express")
const router = express.Router()
//Controllers
const itemController = require("../controllers/item.controller")

router.get("/all", itemController.getItems)
router.get("/id", itemController.getItem)
router.post("/new", itemController.addNew)
router.put("/put/:id", itemController.updateItem)
router.delete("/del/:id", itemController.deleteItem)

module.exports = router;