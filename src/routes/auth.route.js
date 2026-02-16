const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {});
router.post("/register", (req, res) => {});
router.post("/logout", (req, res) => {});
router.post("/forgot-password", (req, res) => {});

// Renew Token

router.post("/refresh", (req, res) => {});

export default router;
