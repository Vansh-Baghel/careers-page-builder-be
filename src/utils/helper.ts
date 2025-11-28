import { Company } from "../entities/company";

export const formatCompany = (c: Company) => ({
  name: c.name,
  logo_url: c.published_logo_url,
  banner_url: c.published_banner_url,
  brand_color: c.published_brand_color,
  culture_video_url: c.published_culture_video_url,
});
