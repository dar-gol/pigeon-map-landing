import { defineRouting } from "next-intl/routing";
import { localizedPathnames } from "./localizedPathnames";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pl", "de", "cs", "nl"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: localizedPathnames,
});
