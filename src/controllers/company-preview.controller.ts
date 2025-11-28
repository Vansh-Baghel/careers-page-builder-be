import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company, Section } from "../entities/company";
import { deleteFromCloudinary } from "../utils/cloudinary-delete";
import { CompanyPreview } from "../entities/company-previews";

export const updatePreview = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const {
    sections,
    logo_url,
    logo_public_id,
    banner_url,
    banner_public_id,
    brand_color,
    culture_video_url,
    culture_video_public_id,
  } = req.body;

  const companyRepo = AppDataSource.getRepository(Company);
  const previewRepo = AppDataSource.getRepository(CompanyPreview);

  // Find company with preview relation
  const company = await companyRepo.findOne({
    where: { slug: companySlug },
    relations: ["preview"],
  });

  if (!company) {
    return res.status(404).json({ message: "Company Not Found" });
  }

  // Create preview row if missing
  let preview = company.preview;

  if (!preview) {
    const preview = previewRepo.create({
      company,
      sections: [] as Section[],
    });

    await previewRepo.save(preview);
  }

  // --- CLEAN UP OLD ASSETS IF REPLACED ---
  if (
    logo_public_id &&
    preview.logo_public_id &&
    preview.logo_public_id !== logo_public_id
  ) {
    await deleteFromCloudinary(preview.logo_public_id);
  }

  if (
    banner_public_id &&
    preview.banner_public_id &&
    preview.banner_public_id !== banner_public_id
  ) {
    await deleteFromCloudinary(preview.banner_public_id);
  }

  if (
    culture_video_public_id &&
    preview.culture_video_public_id &&
    preview.culture_video_public_id !== culture_video_public_id
  ) {
    await deleteFromCloudinary(preview.culture_video_public_id);
  }

  // --- UPDATE PREVIEW FIELDS ---
  if (sections !== undefined) preview.sections = sections;

  if (logo_url !== undefined) {
    preview.logo_url = logo_url;
    preview.logo_public_id = logo_public_id ?? preview.logo_public_id;
  }

  if (banner_url !== undefined) {
    preview.banner_url = banner_url;
    preview.banner_public_id = banner_public_id ?? preview.banner_public_id;
  }

  if (brand_color !== undefined) {
    preview.brand_color = brand_color;
  }

  if (culture_video_url !== undefined) {
    preview.culture_video_url = culture_video_url;
    preview.culture_video_public_id =
      culture_video_public_id ?? preview.culture_video_public_id;
  }

  await previewRepo.save(preview);

  res.json({ message: "Preview saved" });
};

export const getPreview = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const repo = AppDataSource.getRepository(Company);

  const company = await repo.findOne({
    where: { slug: companySlug },
    relations: ["preview"],
  });

  if (!company) return res.status(404).json({ message: "Company Not Found" });

  const preview = company.preview;

  return res.json({
    name: company.name,
    logo_url: preview?.logo_url || null,
    banner_url: preview?.banner_url || null,
    brand_color: preview?.brand_color || null,
    culture_video_url: preview?.culture_video_url || null,
    sections: preview?.sections || [],
  });
};

export const getPublished = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const repo = AppDataSource.getRepository(Company);

  const company = await repo.findOne({
    where: { slug: companySlug },
  });

  if (!company) return res.status(404).json({ message: "Company Not Found" });

  return res.json({
    name: company.name,
    logo_url: company.published_logo_url || null,
    banner_url: company.published_banner_url || null,
    brand_color: company.published_brand_color || null,
    culture_video_url: company.published_culture_video_url || null,
    sections: company.published_sections || [],
  });
};
