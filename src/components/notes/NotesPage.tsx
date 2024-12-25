import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { Note } from '../../lib/types';
import { Button } from '../ui/button';

export function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  async function fetchNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Mis Notas</h2>
          <p className="text-muted-foreground mb-4">
            Inicia sesión para ver y gestionar tus notas
          </p>
          <Button>Iniciar sesión</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Cargando notas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Mis Notas</h2>
      {notes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Aún no tienes notas guardadas
          </p>
          <Button>Explorar restaurantes</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-card rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{note.restaurantId}</h3>
                  <p className="text-sm text-muted-foreground">
                    Visitado el {new Date(note.visitDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm">
                    Eliminar
                  </Button>
                </div>
              </div>
              <p className="text-sm">{note.content}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {note.rating}/5 estrellas
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}