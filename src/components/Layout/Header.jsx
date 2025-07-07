import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { currentUser, userRole, logoutUser } = useApp();

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-purple-500',
      customer: 'bg-blue-500',
      sales_manager: 'bg-green-500',
      sales_authorizer: 'bg-yellow-500',
      plant_head: 'bg-red-500',
      accountant: 'bg-indigo-500',
      salesman: 'bg-pink-500'
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
      salesman: 'Salesman'
    };
    return labels[role] || 'User';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FeedManager Pro
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {currentUser?.name || 'User'}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getRoleColor(userRole)}`}>
                    {getRoleLabel(userRole)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full ${getRoleColor(userRole)} flex items-center justify-center`}>
                  <User className="h-4 w-4 text-white" />
                </div>
                
                <button
                  onClick={logoutUser}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;