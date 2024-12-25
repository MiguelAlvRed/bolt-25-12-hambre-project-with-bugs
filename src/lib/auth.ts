import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export type AuthUser = User | null;

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function getUser() {
  return supabase.auth.getUser();
}

export function onAuthStateChange(callback: (user: AuthUser) => void) {
  return supabase.auth.onAuthStateChange((_, session) => {
    callback(session?.user ?? null);
  });
}