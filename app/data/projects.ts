export interface ProjectContent {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
}

export interface Project {
  slug: string;
  link: string;
  image: string;
  en: ProjectContent;
  pl: ProjectContent;
}

export const projects: Project[] = [
  {
    slug: "trackforge",
    link: "https://trackforge.pl",
    image: "/images/projects/trackforge-cover.jpg",
    en: {
      title: "TrackForge",
      tagline:
        "Turn your GPX route into a dual-color 3D-printed piece of wall art.",
      description:
        "TrackForge sits at the intersection of software engineering, 3D printing, and running/hiking. Users upload a GPX file (or import a route straight from Strava), get an instant 2D map preview, pick terrain and track colors, and check out with BLIK - no account required. \nOn the backend, the route and NASA SRTM elevation data are turned into two STL files: a terrain mesh with real elevation and a raised track that mates with it. I slice and print every order myself and ship via InPost across Poland. \nI built and run the whole stack solo - GPX/route processing, checkout and payments, admin tooling for order and STL management, and the infrastructure it all runs on.",
      tech: [
        "Node.js",
        "TypeScript",
        "React",
        "Python",
        "SQLite",
        "Docker",
        "Terraform",
      ],
    },
    pl: {
      title: "TrackForge",
      tagline:
        "Zamień swoją trasę GPX w dwukolorową pamiątkę wydrukowaną w 3D.",
      description:
        "TrackForge to projekt na styku programowania, druku 3D oraz biegania i wędrówek. Użytkownik wgrywa plik GPX (lub importuje trasę bezpośrednio ze Stravy), od razu widzi podgląd trasy na mapie 2D, wybiera kolory terenu i trasy, a następnie płaci przez BLIK - bez zakładania konta. \nW tle trasa oraz dane wysokościowe NASA SRTM zamieniane są na dwa pliki STL: teren z rzeczywistą rzeźbą terenu oraz podniesioną trasę, która się w niego wpasowuje. Każde zamówienie samodzielnie wycinam, drukuję i wysyłam paczkomatem InPost. \nCały stack zbudowałem i utrzymuję sam - przetwarzanie GPX/tras, płatności, panel admina do zarządzania zamówieniami i plikami STL oraz infrastrukturę, na której to wszystko działa.",
      tech: [
        "Node.js",
        "TypeScript",
        "React",
        "Python",
        "SQLite",
        "Docker",
        "Terraform",
      ],
    },
  },
];
