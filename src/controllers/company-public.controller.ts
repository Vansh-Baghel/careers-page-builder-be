import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";
import { Job } from "../entities/job";

export const publicCareers = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const companyRepo = AppDataSource.getRepository(Company);
  const company = await companyRepo.findOne({ where: { slug: companySlug } });

  if (!company) return res.status(404).json({ message: "Not Found" });

  const jobRepo = AppDataSource.getRepository(Job);
  const jobs = await jobRepo.find({
    where: { company: { id: company.id }, is_published: true },
  });

  res.json({
    sections: company.published_sections,
    jobs,
  });
};
