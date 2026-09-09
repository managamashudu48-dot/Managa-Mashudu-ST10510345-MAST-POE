import React, { createContext, useState, useContext } from 'react';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main Course' | 'Dessert';
  price: number;
};

const initialMenu: MenuItem[] = [
  { id: '1', name: 'Chicken Pasta', course: 'Main Course', description: 'Creamy pasta with grilled chicken, sun-dried tomatoes and fresh basil', price: 85.00 },
  { id: '2', name: 'Chocolate Cake', course: 'Dessert', description: 'Chocolate cake with rich ganache and vanilla ice cream', price: 45.00 },
  { id: '3', name: 'Beef Burger', course: 'Main Course', description: '200g prime beef patty with cheddar, lettuce, tomato and hand-cut chips', price: 120.00 },
];

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Math.random().toString() };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};
