import { Company } from "../entities/company";

export const formatCompany = (c: Company) => ({
  name: c.name,
  logo_url: c.logo_url,
  banner_url: c.banner_url,
  brand_color: c.brand_color,
  culture_video_url: c.culture_video_url,
});
