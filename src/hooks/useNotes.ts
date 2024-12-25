import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Note } from '../lib/types';

export function useNotes(userId: string | undefined) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchNotes();
    }
  }, [userId]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('notes')
        .select('*, restaurants(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setNotes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las notas');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (note: Omit<Note, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const { error: insertError } = await supabase
        .from('notes')
        .insert([{ ...note, user_id: userId }]);

      if (insertError) throw insertError;
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la nota');
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      setError(null);
      const { error: updateError } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId);

      if (updateError) throw updateError;
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la nota');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      setError(null);
      const { error: deleteError } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la nota');
    }
  };

  return {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
  };
}