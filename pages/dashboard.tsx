import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home, Settings, BarChart2 } from 'lucide-react';
import { fetchMarketplaceData } from '../utils/api';
import { PerfumeData } from '../types/perfume';

export default function Dashboard() {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchMarketplaceData();
        setPerfumes(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch perfume data');
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Head>
        <title>Perfume Marketplace Analyzer - Dashboard</title>
        <meta name="description" content="Analyze perfume marketplace data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Home className="mr-2" size={20} />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <BarChart2 className="mr-2" size={20} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/risc-config" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Settings className="mr-2" size={20} />
                  RISC Configuration
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <BarChart2 className="mr-2" size={20} />
                  Inventory
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Toggle button */}
      <button
        className={`fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Main content */}
      <main className={`flex-1 p-8 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold mb-8">Perfume Marketplace Dashboard</h1>
        
        {isLoading ? (
          <p>Loading perfume data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {perfumes.map((perfume) => (
              <div key={perfume.id} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{perfume.name}</h2>
                <p>Brand: {perfume.brand}</p>
                <p>Price: ${perfume.price}</p>
                <p>Rating: {perfume.rating}/5</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

