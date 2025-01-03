import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Navbar onSearch={onSearch} />
      <div className="container mx-auto flex justify-between gap-4">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
