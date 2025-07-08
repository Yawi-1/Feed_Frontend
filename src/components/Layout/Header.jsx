import React, { useState } from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { currentUser, userRole, logoutUser } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-purple-500',
      customer: 'bg-blue-500',
      sales_manager: 'bg-green-500',
      sales_authorizer: 'bg-yellow-500',
      plant_head: 'bg-red-500',
      accountant: 'bg-indigo-500',
      salesman: 'bg-pink-500',
    };
    return colors[role] || 'bg-gray-500';
  };

  const getRoleLabel = (role) => {
    const labels = {
      admin: 'Admin',
      customer: 'Customer',
      sales_manager: 'Sales Manager',
      sales_authorizer: 'Sales Authorizer',
      plant_head: 'Plant Head',
      accountant: 'Accountant',
      salesman: 'Salesman',
    };
    return labels[role] || 'User';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FeedManager Pro
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span
                  className={`inline-flex items-center px-2.5 py-2 cursor-pointer rounded-full text-xs font-medium text-white ${getRoleColor(
                    userRole
                  )}`}
                >
                  {getRoleLabel(userRole)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full ${getRoleColor(
                    userRole
                  )} flex items-center justify-center`}
                >
                  <User className="h-4 w-4 text-white" />
                </div>
                <button
                  onClick={logoutUser}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Hamburger - Mobile Only */}
          <div className="lg:hidden flex items-center">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-4 py-4 border-t bg-white shadow-md space-y-4">
          <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span>Notifications</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-gray-900">
                {currentUser?.name || 'User'}
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getRoleColor(
                  userRole
                )}`}
              >
                {getRoleLabel(userRole)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full ${getRoleColor(
                  userRole
                )} flex items-center justify-center`}
              >
                <User className="h-4 w-4 text-white" />
              </div>
              <button
                onClick={logoutUser}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
