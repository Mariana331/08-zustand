import axios from 'axios';
import { Note, NewNoteData } from '@/types/note';

const API_URL = `https://notehub-public.goit.study/api`;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
}

export const fetchNotes = async ({
  search,
  tag,
  page,
  perPage,
  sortBy,
}: FetchNotesParams): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>(`${API_URL}/notes`, {
    params: {
      search,
      tag,
      page,
      perPage,
      sortBy,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>(`${API_URL}/notes`, data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${API_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};
