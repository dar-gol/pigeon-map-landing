import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pigeon Map - Mapa Gołębi",
    short_name: "Pigeon Map",
    description:
      "Nowoczesna platforma dla hodowców gołębi. Śledź, zarządzaj i udostępniaj loty oraz rodowody online.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#009fbe",
    icons: [
      {
        src: "/assets/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
