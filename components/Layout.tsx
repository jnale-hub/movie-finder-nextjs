import React from 'react';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={onSearch} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
