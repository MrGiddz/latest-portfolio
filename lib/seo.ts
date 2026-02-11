export const SITE_URL = "https://mideolaniyi.com";
export const SITE_NAME = "Olamide Olaniyi";
export const DEFAULT_OG_IMAGE = "/favicon.png";
export const AUTHOR_NAME = "Olaniyi Gideon Olamide";
export const AUTHOR_ROLE = "Senior Software Engineer";
export const AUTHOR_EMAIL = "me@mideolaniyi.com";
export const AUTHOR_SOCIALS = [
  "https://github.com/mrgiddz",
  "https://x.com/mide_niyi",
  "https://www.instagram.com/mide_niyi",
  "https://facebook.com/midelaniyi",
];

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
