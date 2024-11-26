import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, UserCircle, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Accueil', icon: Book },
    ...(user && (user.role === 'admin' || user.role === 'teacher')
      ? [{ path: '/admin', label: 'Administration', icon: UserCircle }]
      : []),
  ];

  return (
    <nav className="bg-blue-900 dark:bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="h-8 w-8" />
              <span className="font-bold text-xl">Bibliothèque UCB</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(path)
                      ? 'bg-blue-800 dark:bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-white"
              >
                <UserCircle className="h-4 w-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-800 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 ${
                  isActive(path)
                    ? 'bg-blue-800 dark:bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full text-left text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <UserCircle className="h-4 w-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}