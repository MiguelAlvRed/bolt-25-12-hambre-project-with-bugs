import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '../lib/auth';
import { onAuthStateChange, getUser } from '../lib/auth';

interface AuthContextType {
  user: AuthUser;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);