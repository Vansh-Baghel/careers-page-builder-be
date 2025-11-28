import express from "express";
import { publishCompany } from "../controllers/company-publish.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.patch("/:companySlug", auth, publishCompany);

export default router;
