import React, { useState } from 'react';
import { FaFileAlt, FaComments, FaUsers, FaEnvelope, FaHotel, FaBuilding, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import logo from '../assets/logo.png';
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png';
import HotelList from './HotelList';

// Définition de l'interface pour les statistiques
interface Stat {
  id: number;
  icon: React.ComponentType<{ size: number | string }>;
  value: number;
  label: string;
  description: string;
  color: string;
}

const stats: Stat[] = [
  { id: 1, icon: FaFileAlt, value: 125, label: 'Formulaires', description: 'Je ne sais pas quoi mettre', color: 'blue' },
  { id: 2, icon: FaComments, value: 40, label: 'Messages', description: 'Je ne sais pas quoi mettre', color: 'green' },
  { id: 3, icon: FaUsers, value: 600, label: 'Utilisateurs', description: 'Je ne sais pas quoi mettre', color: 'purple' },
  { id: 4, icon: FaEnvelope, value: 25, label: 'E-mails', description: 'Je ne sais pas quoi mettre', color: 'red' },
  { id: 5, icon: FaHotel, value: 40, label: 'Hotels', description: 'Je ne sais pas quoi mettre', color: 'orange' },
  { id: 6, icon: FaBuilding, value: 2, label: 'Entités', description: 'Je ne sais pas quoi mettre', color: 'teal' },
];

// Composant pour le contenu du tableau de bord (statistiques)
const DashboardContent = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {stats.map(stat => {
      const IconComponent = stat.icon;
      return (
        <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-500`}>
              <IconComponent size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          </div>
        </div>
      );
    })}
  </section>
);

const Dashboard = () => {
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' ou 'hotels'
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'hotels':
        return <HotelList searchQuery={searchQuery} />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 text-white flex flex-col justify-between relative transform -translate-x-full sm:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${background2})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }}></div>
        <div className="relative z-10">
          <img src={logo} alt="Logo" className="w-40 h-10 mx-auto my-4" />
          <nav className="mt-4">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 ${currentView === 'dashboard' ? 'bg-gray-800 bg-opacity-50' : ''}`}
            >
              <FaFileAlt size={20} />
              <span className="ml-3">Dashboard</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('hotels');
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 ${currentView === 'hotels' ? 'bg-gray-800 bg-opacity-50' : ''}`}
            >
              <FaHotel size={20} />
              <span className="ml-3">Liste des hôtels</span>
            </button>
          </nav>
        </div>
        <div className="relative z-10 p-4 border-t border-gray-700 flex items-center">
          <img src="https://i.pravatar.cc/40?img=5" alt="User avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="font-semibold">Rokheya Hane</div>
            <div className="text-green-500 text-sm flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> en ligne
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 ml-0 sm:ml-0">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden mr-4 text-gray-600 hover:text-gray-800"
              title="Menu"
              aria-label="Menu"
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-2xl font-semibold">
              {currentView === 'dashboard' ? 'Tableau de bord' : 'Liste des hôtels'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Recherche"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src="https://i.pravatar.cc/32?img=5" alt="User avatar" className="w-8 h-8 rounded-full" />
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-800 ml-2"
              title="Déconnexion"
              aria-label="Déconnexion"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
