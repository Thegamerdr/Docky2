import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home, Settings, BarChart2 } from 'lucide-react';
import io from 'socket.io-client';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io({
      path: '/api/socketio',
      auth: {
        token: process.env.NEXT_PUBLIC_SOCKET_SECRET
      }
    });

    socketRef.current.on('chat message', (msg: string) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    socketRef.current.on('inventory update', (update: any) => {
      setInventory((prevInventory) => {
        switch (update.type) {
          case 'add':
            return [...prevInventory, { ...update.item, id: Date.now() }];
          case 'remove':
            return prevInventory.filter((item) => item.name !== update.item.name);
          case 'update':
            return prevInventory.map((item) =>
              item.name === update.item.name ? { ...item, ...update.item } : item
            );
          default:
            return prevInventory;
        }
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError('Error fetching inventory. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchInventory();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage) {
      socketRef.current.emit('chat message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Head>
        <title>Inventory - Perfume Marketplace Analyzer</title>
        <meta name="description" content="Inventory management for Perfume Marketplace Analyzer" />
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
                <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                  <Home className="mr-2" size={20} />
                  Home
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
        <h1 className="text-3xl font-bold mb-8">Perfume Inventory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inventory List */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Inventory</h2>
            {isLoading ? (
              <p>Loading inventory...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {inventory.map((item) => (
                  <li key={item.id} className="py-4 flex justify-between items-center">
                    <span className="text-gray-900 font-medium">{item.name}</span>
                    <div>
                      <span className="text-gray-600 mr-4">Qty: {item.quantity}</span>
                      <span className="text-gray-600">${item.price.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Chat Interface */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Inventory Chat</h2>
            <div className="h-64 overflow-y-auto mb-4 border border-gray-200 rounded p-2">
              {chatMessages.map((msg, index) => (
                <p key={index} className="mb-2">{msg}</p>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a command (e.g., /add Perfume 10 29.99)"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

