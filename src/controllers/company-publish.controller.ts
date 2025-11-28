import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";

export const publishCompany = async (req: Request, res: Response) => {
  const { companySlug } = req.params;
  const repo = AppDataSource.getRepository(Company);

  const company = await repo.findOneBy({ slug: companySlug });
  if (!company) return res.status(404).json({ message: "Company Not Found" });

  await repo.update(
    { slug: companySlug },
    {
      published_logo_url: company.published_logo_url,
      published_banner_url: company.published_banner_url,
      published_brand_color: company.published_brand_color,
      published_culture_video_url: company.published_culture_video_url,
    }
  );

  res.json({ message: "Published Successfully" });
};
