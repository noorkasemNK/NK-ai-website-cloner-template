import type { MetadataRoute } from "next";

const siteUrl = "https://csulbcyber.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/events", "/calendar", "/members", "/social"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
