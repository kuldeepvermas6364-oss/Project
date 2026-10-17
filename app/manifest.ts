import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studyspace — Your learning hub",
    short_name: "Studyspace",
    description: "A calm workspace for focused study, practice, planning and progress.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#416b5a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
