const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController");

router.get("/create", courseController.create);
router.post("/action", courseController.action);
router.get("/:slug", courseController.show);
router.get("/:id/edit", courseController.edit);
router.post("/store", courseController.store);
router.put("/:id/update", courseController.update);
router.patch("/:id/trash-restore", courseController.trash_restore);
router.delete("/:id/delete", courseController.delete);
router.delete("/:id/trash-delete", courseController.trash_delete);
module.exports = router;
