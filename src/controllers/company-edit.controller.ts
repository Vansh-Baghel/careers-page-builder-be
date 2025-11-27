import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";
import { deleteFromCloudinary } from "../utils/cloudinary-delete";

export const updateDraft = async (req: Request, res: Response) => {
  const { companySlug } = req.params;
  const {
    draft_sections,
    logo_url,
    logo_public_id,
    banner_url,
    banner_public_id,
    brand_color,
    culture_video_url,
    culture_video_public_id,
  } = req.body;

  const repo = AppDataSource.getRepository(Company);
  const company = await repo.findOneBy({ slug: companySlug });

  if (!company) return res.status(404).json({ message: "Company Not Found" });

  // 🔥 DELETE old logo if replaced
  if (
    logo_url &&
    company.logo_public_id &&
    company.logo_public_id !== logo_public_id
  ) {
    await deleteFromCloudinary(company.logo_public_id);
  }

  // 🔥 DELETE old banner if replaced
  if (
    banner_url &&
    company.banner_public_id &&
    company.banner_public_id !== banner_public_id
  ) {
    await deleteFromCloudinary(company.banner_public_id);
  }

  // 🔥 DELETE old video if replaced
  if (
    culture_video_url &&
    company.culture_video_public_id &&
    company.culture_video_public_id !== culture_video_public_id
  ) {
    await deleteFromCloudinary(company.culture_video_public_id);
  }

  // update only provided fields
  if (draft_sections) company.draft_sections = draft_sections;
  if (logo_url) company.logo_url = logo_url;
  if (banner_url) company.banner_url = banner_url;
  if (brand_color) company.brand_color = brand_color;
  if (culture_video_url) company.culture_video_url = culture_video_url;

  await repo.save(company);

  res.json({ message: "Draft updated successfully" });
};
