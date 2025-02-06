import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2,
  Banknote,
  CreditCard,
  FileText,
  HandCoins,
  History,
  Lock,
  MessageCircle,
  Receipt,
  Shield,
  Smartphone,
  UserCircle
} from 'lucide-react';

const features = [
  {
    title: 'Secure Login System',
    description: 'Multi-factor authentication with unique terminal IDs and secure session management for tellers.',
    icon: UserCircle
  },
  {
    title: 'Bill & Non-Bill Payments',
    description: 'Process both utility bills and non-bill transactions with automated validation and verification.',
    icon: Banknote
  },
  {
    title: 'Multiple Payment Methods',
    description: 'Support for cash, bank transfers, checks, and e-wallet payments with real-time verification.',
    icon: HandCoins
  },
  {
    title: 'Digital Receipts',
    description: 'Generate and send digital receipts instantly via email or SMS with unique transaction IDs.',
    icon: Receipt
  },
  {
    title: 'Promissory Notes',
    description: 'Handle partial payments with automated promissory note generation and follow-up scheduling.',
    icon: FileText
  },
  {
    title: 'Transaction Tracking',
    description: 'Comprehensive audit trails and transaction logs for enhanced security and transparency.',
    icon: History
  },
  {
    title: 'SMS Notifications',
    description: 'Automated SMS alerts for payment confirmations and transaction updates.',
    icon: Smartphone
  },
  {
    title: 'Secure Encryption',
    description: 'End-to-end encryption for all transactions and customer data protection.',
    icon: Lock
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical support and assistance for tellers.',
    icon: MessageCircle
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <Shield className="h-16 w-16 text-yellow-500" />
              <CreditCard className="h-16 w-16 text-red-500 ml-4" />
            </div>
            <h1 className="text-5xl font-bold text-yellow-500 mb-6">
              CEPALCO Payment Collection System
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              An official CEPALCO-accredited platform enabling secure bill payments, non-bill transactions,
              and comprehensive payment processing with enhanced security and reliability.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="bg-yellow-500 text-emerald-950 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors cursor-pointer"
                type="button"
              >
                Teller Login
              </button>
              <button 
                type="button"
                className="border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500/10 transition-colors cursor-pointer"
              >
                System Guide
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-emerald-900/50 rounded-xl p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl border border-emerald-700"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="h-8 w-8 text-yellow-500" />
                <h3 className="text-xl font-semibold text-yellow-500 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Building2 className="h-8 w-8 text-red-500" />
              <span className="text-xl font-semibold text-yellow-500">Widescope Promotional Resources Inc.</span>
            </div>
            <p className="text-gray-400">
              © 2024 Widescope Promotional Resources Inc. - Official CEPALCO-accredited Payment Center
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}