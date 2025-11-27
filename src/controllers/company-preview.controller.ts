import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";
import { formatCompany } from "../utils/helper";

export const previewCompany = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const repo = AppDataSource.getRepository(Company);
  const company = await repo.findOne({
    where: { slug: companySlug },
    relations: ["jobs"],
  });

  if (!company) return res.status(404).json({ message: "Not Found" });

  res.json({
    ...formatCompany(company),
    sections: company.draft_sections,
    jobs: company.jobs,
  });
};
