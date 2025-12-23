import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Tenant = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

type StoredSession = {
  user: User;
  tenants: Tenant[];
  selectedTenant: Tenant | null;
};

type SessionContextType = {
  isAuthenticated: boolean;
  user: User | null;
  tenants: Tenant[];
  selectedTenant: Tenant | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectTenant: (tenant: Tenant) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const STORAGE_KEY = 'mka_session';

// Mock tenants data
const MOCK_TENANTS: Tenant[] = [
  { id: 'tenant-1', name: 'Company A' },
  { id: 'tenant-2', name: 'Company B' },
];

// Mock user data
const MOCK_USER: User = {
  id: 'user-1',
  email: 'demo@example.com',
  name: 'Demo User',
};

async function storeSession(session: StoredSession): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store session:', error);
  }
}

async function getStoredSession(): Promise<StoredSession | null> {
  try {
    const sessionJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (sessionJson) {
      return JSON.parse(sessionJson) as StoredSession;
    }
  } catch (error) {
    console.error('Failed to get stored session:', error);
  }
  return null;
}

async function clearStoredSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // Restore session on mount
  useEffect(() => {
    async function restoreSession() {
      const storedSession = await getStoredSession();

      if (storedSession) {
        // Validate stored session (fake validation - just check if user exists)
        if (storedSession.user && storedSession.user.email) {
          setUser(storedSession.user);
          setTenants(storedSession.tenants || MOCK_TENANTS);
          setSelectedTenant(storedSession.selectedTenant);
          setIsAuthenticated(true);
        }
      }

      setIsLoading(false);
    }

    restoreSession();
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Fake authentication - accepts any non-empty credentials
    if (email.trim()) {
      const newUser = { ...MOCK_USER, email };
      const session: StoredSession = {
        user: newUser,
        tenants: MOCK_TENANTS,
        selectedTenant: null,
      };

      setUser(newUser);
      setTenants(MOCK_TENANTS);
      setIsAuthenticated(true);

      // Persist session
      await storeSession(session);

      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setTenants([]);
    setSelectedTenant(null);
    setIsAuthenticated(false);

    // Clear persisted session
    await clearStoredSession();
  }, []);

  const selectTenant = useCallback(
    async (tenant: Tenant) => {
      setSelectedTenant(tenant);

      // Update persisted session with selected tenant
      if (user) {
        await storeSession({
          user,
          tenants,
          selectedTenant: tenant,
        });
      }
    },
    [user, tenants]
  );

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        user,
        tenants,
        selectedTenant,
        isLoading,
        login,
        logout,
        selectTenant,
      }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
}
