import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home, Settings, BarChart2 } from 'lucide-react';
import { configureEventStream, testEventStream } from '../utils/risc';

const TITLE = "RISC Configuration - Perfume Marketplace Analyzer";
const DESCRIPTION = "RISC Configuration for Perfume Marketplace Analyzer";
const DASHBOARD = "Dashboard";
const HOME = "Home";
const RISC_CONFIGURATION = "RISC Configuration";
const INVENTORY = "Inventory";

export default function RiscConfig() {
  const [configStatus, setConfigStatus] = useState<string>('');
  const [testStatus, setTestStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleConfigure = async () => {
    setIsLoading(true);
    try {
      await configureEventStream();
      setConfigStatus('Event stream configured successfully');
    } catch (error: unknown) {
      setConfigStatus(`Error configuring event stream: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    setIsLoading(true);
    try {
      await testEventStream();
      setTestStatus('Event stream test successful');
    } catch (error) {
      setTestStatus(`Error testing event stream: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
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
          <h2 className="text-2xl font-semibold mb-6">{DASHBOARD}</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Home className="mr-2" size={20} />
                  {HOME}
                </Link>
              </li>
              <li>
                <Link href="/risc-config" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Settings className="mr-2" size={20} />
                  {RISC_CONFIGURATION}
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <BarChart2 className="mr-2" size={20} />
                  {INVENTORY}
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
        <h1 className="text-3xl font-bold mb-8">{RISC_CONFIGURATION}</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-4">
            <button
              onClick={handleConfigure}
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isLoading ? 'Configuring...' : 'Configure Event Stream'}
            </button>
            <p className={`text-sm ${configStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {configStatus}
            </p>
            <button
              onClick={handleTest}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isLoading ? 'Testing...' : 'Test Event Stream'}
            </button>
            <p className={`text-sm ${testStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {testStatus}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

