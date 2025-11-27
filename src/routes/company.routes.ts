import express from "express";
import { updateDraft } from "../controllers/company-edit.controller";
import { previewCompany } from "../controllers/company-preview.controller";
import { publicCareers } from "../controllers/company-public.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

// Recruiter
router.patch("/:companySlug/edit", auth, updateDraft);
router.get("/:companySlug/preview", auth, previewCompany);

// Public
router.get("/public/:companySlug/careers", publicCareers);

export default router;
