import express from "express";
import { getPreview, updatePreview, getPublished } from "../controllers/company-preview.controller";
import { auth } from "../middleware/auth";
import { publishCompany } from "../controllers/company-publish.controller";

const router = express.Router();

// Recruiter
router.get("/:companySlug/preview", auth, getPreview);
router.get("/:companySlug/get-published", auth, getPublished);
router.patch("/:companySlug/edit", auth, updatePreview);

export default router;
