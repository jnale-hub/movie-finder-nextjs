// components/Layout.tsx
import React from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Movie Search
        </Link>
      </nav>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
