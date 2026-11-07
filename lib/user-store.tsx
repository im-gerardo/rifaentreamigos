'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TeamUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'seller';
  active: boolean;
  createdAt: string;
};

type UserStoreContextType = {
  users: TeamUser[];
  addUser: (user: Omit<TeamUser, 'id' | 'createdAt'>) => { success: boolean; error?: string };
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => { success: boolean; error?: string };
};

const UserStoreContext = createContext<UserStoreContextType | null>(null);

const STORAGE_KEY = 'rifa_team_users_v1';

const INITIAL_USERS: TeamUser[] = [
  {
    id: 'user-admin-1',
    name: 'Gerardo Barrios (Principal)',
    email: 'og.barrios@gmail.com',
    phone: '4421941930',
    role: 'admin',
    active: true,
    createdAt: '2026-11-01T10:00:00.000Z',
  },
  {
    id: 'user-seller-1',
    name: 'Vendedor Centro',
    email: 'vendedor.centro@amigos.com',
    phone: '4421002030',
    role: 'seller',
    active: true,
    createdAt: '2026-11-03T14:30:00.000Z',
  },
  {
    id: 'user-seller-2',
    name: 'Vendedor Moto Club',
    email: 'vendedor.motos@amigos.com',
    phone: '4429887766',
    role: 'seller',
    active: true,
    createdAt: '2026-11-04T16:15:00.000Z',
  },
];

export function UserStoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<TeamUser[]>(INITIAL_USERS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed);
        }
      }
    } catch (e) {
      console.error('Error al cargar usuarios:', e);
    }
  }, []);

  const saveUsers = (updated: TeamUser[]) => {
    setUsers(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error al guardar usuarios:', e);
    }
  };

  const addUser = (userData: Omit<TeamUser, 'id' | 'createdAt'>) => {
    const emailNorm = userData.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === emailNorm)) {
      return { success: false, error: 'Ya existe un usuario con este correo electrónico.' };
    }

    const newUser: TeamUser = {
      id: `user-${Date.now()}`,
      name: userData.name.trim(),
      email: emailNorm,
      phone: userData.phone.trim(),
      role: userData.role,
      active: userData.active,
      createdAt: new Date().toISOString(),
    };

    saveUsers([newUser, ...users]);
    return { success: true };
  };

  const toggleUserStatus = (id: string) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        return { ...u, active: !u.active };
      }
      return u;
    });
    saveUsers(updated);
  };

  const deleteUser = (id: string) => {
    const target = users.find((u) => u.id === id);
    if (target?.email === 'og.barrios@gmail.com') {
      return { success: false, error: 'No se puede eliminar al Administrador Principal.' };
    }
    const updated = users.filter((u) => u.id !== id);
    saveUsers(updated);
    return { success: true };
  };

  return (
    <UserStoreContext.Provider value={{ users, addUser, toggleUserStatus, deleteUser }}>
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const ctx = useContext(UserStoreContext);
  if (!ctx) {
    throw new Error('useUserStore debe usarse dentro de UserStoreProvider');
  }
  return ctx;
}
