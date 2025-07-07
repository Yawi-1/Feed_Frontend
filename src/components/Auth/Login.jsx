import React, { useState } from 'react';
import { Phone, Shield, Users, UserCheck, Factory, Calculator, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {Link} from 'react-router-dom'
const Login = () => {
  const [loginType, setLoginType] = useState('customer');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { sendOTP, verifyOTP, loginUser, customers, employees, otpVerification } = useApp();

  const roleIcons = {
    sales_man: Briefcase,
    admin: Shield,
    sales_manager: Users,
    sales_authorizer: UserCheck,
    plant_head: Factory,
    accountant: Calculator,
    // salesman: Briefcase
  };

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    const sentOtp = sendOTP(mobile);
    console.log('OTP sent:', sentOtp); // For demo purposes
    setOtpSent(true);
    setLoading(false);
    alert(`OTP sent to ${mobile}: ${sentOtp}`);
  };

  const handleVerifyOTP = () => {
    if (verifyOTP(otp)) {
      const customer = customers.find(c => c.mobile === mobile);
      if (customer) {
        loginUser(customer, 'customer');
      } else {
        alert('Customer not found');
      }
    } else {
      alert('Invalid OTP');
    }
  };

  const handleEmployeeLogin = () => {
    const employee = employees.find(e => e.email === email);
    if (employee && password === 'password123') { // Demo password
      loginUser(employee, employee.role);
    } else {
      alert('Invalid credentials');
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      customer: 'from-blue-500 to-blue-600',
      admin: 'from-purple-500 to-purple-600',
      sales_manager: 'from-green-500 to-green-600',
      sales_authorizer: 'from-yellow-500 to-yellow-600',
      plant_head: 'from-red-500 to-red-600',
      accountant: 'from-indigo-500 to-indigo-600',
      salesman: 'from-pink-500 to-pink-600'
    };
    return colors[role] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FeedManager Pro
          </h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleIcons).map(([role, Icon]) => (
                <Link to={role}
                  key={role}
                  onClick={() => setLoginType(role)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    loginType === role
                      ? `border-transparent bg-gradient-to-r ${getRoleColor(role)} text-white`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-xs capitalize">
                    {role.replace('_', ' ')}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {loginType === 'customer' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                />
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                    />
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <button
                onClick={handleEmployeeLogin}
                className={`w-full bg-gradient-to-r ${getRoleColor(loginType)} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all`}
              >
                Sign In
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: password123 for all employee roles
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Customer mobile: 9876543210, 9876543211
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;