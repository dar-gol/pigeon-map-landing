import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/*", "/api/", "/admin/"],
      },
    ],
    sitemap: "https://pigeon-map.digging.pl/sitemap.xml",
  };
}
