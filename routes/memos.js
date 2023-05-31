const express = require("express");
const router = express.Router();
const {
  getAllMemos,
  createMemo,
  getSingleMemo,
  updateMemo,
  deleteMemo
} = require("../controllers/memos")

router.get("/", getAllMemos);
router.post("/", createMemo);
router.get("/:id", getSingleMemo);
router.patch("/:id", updateMemo);
router.delete("/:id", deleteMemo);

module.exports = router;