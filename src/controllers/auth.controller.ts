import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Recruiter } from "../entities/recruiter";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Company } from "../entities/company";
import slugify from "slugify";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const repo = AppDataSource.getRepository(Recruiter);

  const user = await repo.findOne({
    where: { email },
    relations: ["company"],
  });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.company) return res.status(400).json({ message: "No company associated" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

  return res.json({
    token,
    company_slug: user.company.slug,
  });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, company_name, company_slug } = req.body;

  const recruiterRepo = AppDataSource.getRepository(Recruiter);
  const companyRepo = AppDataSource.getRepository(Company);

  // Reject duplicate email
  const existingRecruiter = await recruiterRepo.findOne({ where: { email } });
  if (existingRecruiter) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Determine slug (priority: provided > generated)
  const slug = company_slug
    ? slugify(company_slug, { lower: true, strict: true })
    : slugify(company_name, { lower: true, strict: true });

  // Look for company
  let company = await companyRepo.findOne({ where: { slug } });

  // If company does not exist -> create it
  if (!company) {
    company = companyRepo.create({
      name: company_name,
      slug
    });
    await companyRepo.save(company);
  }

  // Create recruiter in the company
  const password_hash = await bcrypt.hash(password, 10);
  const recruiter = recruiterRepo.create({
    name,
    email,
    password_hash,
    company
  });
  await recruiterRepo.save(recruiter);

  // Generate token
  const token = jwt.sign({ userId: recruiter.id }, process.env.JWT_SECRET!);

  res.json({
    token,
    company_slug: company.slug,
    message: company ? "Joined company successfully" : "Company created and joined"
  });
};

