import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";
import { Job } from "../entities/job";
import slugify from "slugify";
import { nanoid } from "nanoid";

export const getOneJob = async (req: Request, res: Response) => {
  const { companySlug, jobSlug } = req.params;

  const companyRepo = AppDataSource.getRepository(Company);
  const jobRepo = AppDataSource.getRepository(Job);

  const company = await companyRepo.findOne({
    where: { slug: companySlug },
  });

  if (!company) {
    return res.status(404).json({ message: "Company Not Found" });
  }

  const job = await jobRepo.findOne({
    where: { company: { id: company.id }, job_slug: jobSlug },
  });
  
  if (!job) {
    return res.status(404).json({ message: "Job Not Found" });
  }

  return res.json(job);
};

export const getJobs = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const { companySlug } = req.params;

  const take = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * take;

  const companyRepo = AppDataSource.getRepository(Company);
  const jobRepo = AppDataSource.getRepository(Job);

  const company = await companyRepo.findOne({
    where: { slug: companySlug },
  });

  if (!company) {
    return res.status(404).json({ message: "Company Not Found" });
  }

  const totalJobs = await jobRepo.count({
    where: {
      company: { id: company.id },
    },
  });

  const jobs = await jobRepo.find({
    where: { company: { id: company.id } },
    order: { created_at: "DESC" },
    take,
    skip,
  });
  const totalPages = Math.ceil(totalJobs / take);

  return res.json({
    jobs,
    totalJobs,
    pagination: {
      totalPages,
      currentPage,
      pageSize: take,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  });
};

export const createJob = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const {
    title,
    work_policy,
    location,
    department,
    employment_type,
    experience_level,
    job_type,
    salary,
  } = req.body;

  try {
    const companyRepo = AppDataSource.getRepository(Company);
    const jobRepo = AppDataSource.getRepository(Job);

    const company = await companyRepo.findOne({
      where: { slug: companySlug },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Generate job slug
    const jobSlug = slugify(title, { lower: true }) + "-" + nanoid(6);

    const job = jobRepo.create({
      company,
      title,
      work_policy,
      location,
      department,
      employment_type,
      experience_level,
      job_type,
      salary,
      job_slug: jobSlug,
      posted_days_ago: "0 days ago",
      is_published: true,
    });

    await jobRepo.save(job);

    return res.json(job);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating job" });
  }
};
export const editJob = async (req: Request, res: Response) => {
  const { companySlug, jobSlug } = req.params;
  const updates = req.body;

  try {
    const companyRepo = AppDataSource.getRepository(Company);
    const jobRepo = AppDataSource.getRepository(Job);

    const company = await companyRepo.findOne({
      where: { slug: companySlug },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const job = await jobRepo.findOne({
      where: {
        job_slug: jobSlug,
        company: { id: company.id },
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🔒 Allowed fields only:
    const allowedFields = [
      "title",
      "work_policy",
      "location",
      "department",
      "employment_type",
      "experience_level",
      "job_type",
      "salary",
    ];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        (job as any)[field] = updates[field];
      }
    }

    await jobRepo.save(job);

    return res.json(job);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating job" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { companySlug, jobSlug } = req.params;

  try {
    const companyRepo = AppDataSource.getRepository(Company);
    const jobRepo = AppDataSource.getRepository(Job);

    const company = await companyRepo.findOne({
      where: { slug: companySlug },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const job = await jobRepo.findOne({
      where: {
        job_slug: jobSlug,
        company: { id: company.id },
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await jobRepo.remove(job);

    return res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting job" });
  }
};
