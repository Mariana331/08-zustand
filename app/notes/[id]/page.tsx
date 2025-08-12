import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: note.title.slice(0, 20),
    description: note.content,
    openGraph: {
      title: note.title.slice(0, 20),
      description: note.content.slice(0, 20),
      images: [
        {
          url: `/public/image.png`,
          width: 1200,
          height: 630,
          alt: 'logo',
        },
      ],
      url: `https://notehub/notes/${id}`,
    },
  };
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
