import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Receipt, 
  UserCheck, 
  UserPlus, 
  ChevronRight,
  LogOut,
  Shield
} from 'lucide-react';

type PaymentType = 'bill' | 'registered' | 'unregistered' | null;

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<PaymentType>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  
  // Simulated teller ID - in a real app, this would come from auth context
  const tellerId = "T-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const handlePaymentTypeSelect = (type: PaymentType) => {
    setSelectedType(type);
    setError('');
  };

  const handleContinue = () => {
    if (selectedType === 'bill' || selectedType === 'registered') {
      if (!accountNumber.trim()) {
        setError('Please enter an account number');
        return;
      }
      // In a real app, validate account number format/existence
      if (accountNumber.length < 5) {
        setError('Invalid account number format');
        return;
      }
    }
    // Navigate to the next step with the collected information
    navigate('/customer-details', { 
      state: { 
        paymentType: selectedType,
        accountNumber: accountNumber || undefined,
        tellerId
      }
    });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950">
      {/* Header */}
      <header className="bg-emerald-900/50 border-b border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-yellow-500" />
              <h1 className="ml-3 text-xl font-semibold text-yellow-500">
                Payment Collection System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Teller ID: {tellerId}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-emerald-900/50 rounded-lg border border-emerald-700 p-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-6">
            Select Payment Type
          </h2>

          <div className="grid gap-4 mb-8">
            {/* Bill Payment Option */}
            <button
              onClick={() => handlePaymentTypeSelect('bill')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                selectedType === 'bill'
                  ? 'bg-yellow-500/20 border-yellow-500'
                  : 'bg-emerald-950/50 border-emerald-700 hover:border-yellow-500/50'
              }`}
            >
              <div className="flex items-center">
                <Receipt className="h-6 w-6 text-yellow-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-yellow-500">
                    Bill Payment
                  </h3>
                  <p className="text-sm text-gray-400">
                    Pay utility bills (electricity, water, etc.)
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-yellow-500" />
            </button>

            {/* Registered Customer Option */}
            <button
              onClick={() => handlePaymentTypeSelect('registered')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                selectedType === 'registered'
                  ? 'bg-yellow-500/20 border-yellow-500'
                  : 'bg-emerald-950/50 border-emerald-700 hover:border-yellow-500/50'
              }`}
            >
              <div className="flex items-center">
                <UserCheck className="h-6 w-6 text-yellow-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-yellow-500">
                    Registered Customer
                  </h3>
                  <p className="text-sm text-gray-400">
                    Process payment for existing customers
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-yellow-500" />
            </button>

            {/* Unregistered Customer Option */}
            <button
              onClick={() => handlePaymentTypeSelect('unregistered')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                selectedType === 'unregistered'
                  ? 'bg-yellow-500/20 border-yellow-500'
                  : 'bg-emerald-950/50 border-emerald-700 hover:border-yellow-500/50'
              }`}
            >
              <div className="flex items-center">
                <UserPlus className="h-6 w-6 text-yellow-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-yellow-500">
                    New Customer
                  </h3>
                  <p className="text-sm text-gray-400">
                    Process payment for first-time customers
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-yellow-500" />
            </button>
          </div>

          {/* Account Number Input (shown only for bill payment and registered customers) */}
          {(selectedType === 'bill' || selectedType === 'registered') && (
            <div className="mb-6">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-300 mb-2">
                Account Number
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter customer account number"
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>
          )}

          {/* Continue Button */}
          {selectedType && (
            <button
              onClick={handleContinue}
              className="w-full bg-yellow-500 text-emerald-950 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Continue to Customer Details
            </button>
          )}
        </div>
      </main>
    </div>
  );
}