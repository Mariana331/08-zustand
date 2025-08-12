import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

// export const generateMetadata = async ({ params }: Props) => {
//   const { slug } = await params;
//   const tag = slug[0] === "All" ? undefined : slug[0];

//   return {
//     title: tag || "All",
//     description: "notes",
//     openGraph: {
//       title: tag || "All",
//       description: "notes",
//       images: [
//         {
//           url: "/public/image.png",
//           width: 1200,
//           height: 630,
//           alt: "logo",
//         },
//       ],
//       url: `https://notehub/notes/filter/${tag}`,
//     },
//   };
// };

const NotesFilter = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const response = await fetchNotes({ tag });

  return <NotesClient initialData={response} tag={tag} />;
};

export default NotesFilter;
