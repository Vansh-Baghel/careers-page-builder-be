import { Router } from "express";
import authRouter from "./auth.routes";
import companyRouter from "./company.routes";
import fileUploadRouter from "./fileUpload.routes";
import publishRouter from "./publish.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/company", companyRouter);
router.use("/publish", publishRouter);
router.use("/file-upload", fileUploadRouter);

export default router;