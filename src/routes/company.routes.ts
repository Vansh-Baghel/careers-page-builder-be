import express from "express";
import { publicCareers } from "../controllers/company-public.controller";
import { auth } from "../middleware/auth";
import { getPreview, updatePreview } from "../controllers/company-preview.controller";

const router = express.Router();

// Recruiter
router.get("/:companySlug/preview", auth, getPreview);
router.patch("/:companySlug/edit", auth, updatePreview);
// router.patch("/publish/:companySlug", auth, updateDraft);

// Public
router.get("/public/:companySlug/careers", publicCareers);

export default router;
