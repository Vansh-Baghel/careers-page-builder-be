import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadFile = async (req: Request, res: Response) => {
  const { companySlug, field } = req.params;

  if (!companySlug || !field)
    return res.status(400).json({ message: "Missing company slug or field" });

  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const result: any = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: `companies/${companySlug}/${field}`,
          tags: [`company_${companySlug}`, `company_${companySlug}_${field}`],
          resource_type: "auto",
        },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );

      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      // ⬅️ IMPORTANT: use buffer, not stream here
      upload.end(req.file.buffer);
    });

    return res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload failed" });
  }
};
