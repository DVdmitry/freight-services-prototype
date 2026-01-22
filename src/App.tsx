import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Package, Truck, DollarSign, Menu, X, Heart, Building, MapPin, Star, BookOpen, MessageSquare, Coffee, Rocket, Code, Palette, Brain, Shield, Clock, HeadphonesIcon, Search, User, Phone, Mail, Facebook, Linkedin, Twitter, ArrowRight, Thermometer, Box, Zap, Navigation as NavigationIcon, CheckCircle, AlertCircle, Bell, Copy, Sun, Moon, Sparkles, Activity, Globe2, Cpu, Layers, Calendar, LogOut, BarChart3, TrendingUp, Users, Award, Briefcase, Send } from 'lucide-react';

// Импорт локальных изображений
import fullTruckLoadImg from './assets/full_truck_load.jpg';
import lessTruckloadImg from './assets/less_truckload.jpg';
import refrigeratedTransportImg from './assets/refrigerated_transport.jpg';
import oversizedCargoImg from './assets/oversized_cargo.jpg';
import expeditedFreightImg from './assets/expedited_freight.jpg';
import aiPoweredSupportImg from './assets/ai-powered-support.jpg';

interface OrderData {
  cargoType: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  serviceType: string;
  insurance: boolean;
  packaging: boolean;
  loading: boolean;
  storage: boolean;
  specialInstructions: string;
  onOrder?: () => void; // Используется страницами деталей услуг
}

// Убедимся, что ThemeType определен здесь ОДИН РАЗ
interface ThemeColors {
  primary: string;
  secondary: string;
  card: string;
  hover: string;
  input: string;
}

interface ThemeText {
  primary: string;
  secondary: string;
  muted: string;
}

interface ThemeBorders {
  primary: string;
  card: string;
}

interface ThemeType {
  bg: ThemeColors;
  text: ThemeText;
  border: ThemeBorders;
}

// ЕДИНСТВЕННОЕ И ПРАВИЛЬНОЕ ОПРЕДЕЛЕНИЕ ThemedPageProps
interface ThemedPageProps {
  theme: ThemeType;
  isDarkMode?: boolean; // Сделал isDarkMode опциональным, как обсуждалось
  orderStepRef?: React.MutableRefObject<number>;
  orderDataRef?: React.MutableRefObject<OrderData>;
  onOrder?: () => void;
}

// После импортов:
const trackingTimelineDataConstant = [
  { status: 'completed', title: 'Order Placed', date: 'Jan 29, 2025 10:00 AM', location: 'New York, NY' },
  { status: 'completed', title: 'Picked Up', date: 'Jan 29, 2025 2:00 PM', location: 'Brooklyn Warehouse' },
  { status: 'completed', title: 'In Transit', date: 'Jan 30, 2025 8:00 AM', location: 'Philadelphia, PA' },
  { status: 'current', title: 'At Distribution Center', date: 'Jan 31, 2025 3:00 PM', location: 'Chicago, IL' },
  { status: 'pending', title: 'Out for Delivery', date: 'Feb 1, 2025 (Estimated)', location: 'Los Angeles, CA' },
  { status: 'pending', title: 'Delivered', date: 'Feb 1, 2025 (Estimated)', location: 'Final Destination' }
];

const TrackShipmentPageComponent = ({ theme, isDarkMode }: { theme: ThemeType, isDarkMode: boolean }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTrackingResult, setShowTrackingResult] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Local state

  const handleTrackShipment = () => {
    if (trackingNumber) {
      setShowTrackingResult(true);
    }
  };

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-5xl md:text-6xl font-bold ${theme.text.primary} mb-6`}>
              Track Your <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Shipment</span>
            </h1>
            <p className={`text-xl ${theme.text.secondary}`}>
              Real-time GPS tracking powered by AI
            </p>
          </div>

          <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 mb-8 border ${theme.border.card}`}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter tracking number (e.g., TRK-2025-001234)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className={`w-full px-6 py-4 ${theme.bg.input} rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <Package className="w-5 h-5 text-violet-600" />
                </div>
              </div>
              <button
                onClick={handleTrackShipment}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Track Shipment</span>
              </button>
            </div>
          </div>

          {showTrackingResult && (
            <>
              <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 mb-8 border ${theme.border.card}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${theme.text.primary}`}>Shipment Details</h2>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(trackingNumber);
                      }
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 ${theme.bg.hover} rounded-xl transition-colors`}
                  >
                    <Copy className="w-4 h-4 text-violet-600" />
                    <span className={`text-sm ${theme.text.secondary}`}>Copy</span>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className={`${theme.bg.input} rounded-2xl p-4`}>
                    <p className={`text-sm ${theme.text.muted} mb-1`}>Tracking Number</p>
                    <p className={`font-semibold ${theme.text.primary}`}>{trackingNumber || 'TRK-2025-001234'}</p>
                  </div>
                  <div className={`${theme.bg.input} rounded-2xl p-4`}>
                    <p className={`text-sm ${theme.text.muted} mb-1`}>Status</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <p className={`font-semibold ${theme.text.primary}`}>In Transit</p>
                    </div>
                  </div>
                  <div className={`${theme.bg.input} rounded-2xl p-4`}>
                    <p className={`text-sm ${theme.text.muted} mb-1`}>Estimated Delivery</p>
                    <p className={`font-semibold ${theme.text.primary}`}>Feb 1, 2025 - 4:00 PM</p>
                  </div>
                  <div className={`${theme.bg.input} rounded-2xl p-4`}>
                    <p className={`text-sm ${theme.text.muted} mb-1`}>Shipment Type</p>
                    <p className={`font-semibold ${theme.text.primary}`}>Full Truck Load</p>
                  </div>
                </div>
              </div>

              <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 mb-8 border ${theme.border.card}`}>
                <h3 className={`text-2xl font-bold ${theme.text.primary} mb-6`}>Live GPS Tracking</h3>
                <div className={`relative h-[500px] ${theme.bg.input} rounded-2xl overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5">
                    <svg className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id="routeGradientTrackPage" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="50%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                        <filter id="glowTrackPage">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <path
                        d="M 100 250 Q 300 150 500 250 T 900 250"
                        stroke="url(#routeGradientTrackPage)"
                        strokeWidth="4"
                        fill="none"
                        filter="url(#glowTrackPage)"
                        className="animate-dash"
                      />
                      <g>
                        <circle cx="100" cy="250" r="12" fill="#8B5CF6" filter="url(#glowTrackPage)" />
                        <circle cx="100" cy="250" r="20" fill="#8B5CF6" opacity="0.3" className="animate-ping" />
                        <text x="100" y="290" textAnchor="middle" className={`text-sm font-bold ${isDarkMode ? 'fill-white' : 'fill-gray-800'}`}>New York, NY</text>
                      </g>
                      <g className="animate-slide">
                        <circle cx="500" cy="250" r="16" fill="#F59E0B" filter="url(#glowTrackPage)" className="animate-pulse" />
                        <circle cx="500" cy="250" r="24" fill="#F59E0B" opacity="0.3" className="animate-ping" />
                      </g>
                      <g>
                        <circle cx="900" cy="250" r="12" fill="#10B981" filter="url(#glowTrackPage)" />
                        <text x="900" y="290" textAnchor="middle" className={`text-sm font-bold ${isDarkMode ? 'fill-white' : 'fill-gray-800'}`}>Los Angeles, CA</text>
                      </g>
                    </svg>
                    <div className="absolute animate-slide" style={{ left: '500px', top: '230px', transform: 'translate(-50%, -50%)' }}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full shadow-2xl">
                          <Truck className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="absolute top-4 right-4 space-y-2">
                    <button className={`p-3 ${theme.bg.card} backdrop-blur-xl rounded-xl hover:scale-110 transition-transform`}>
                      <NavigationIcon className="w-5 h-5 text-violet-600" />
                    </button>
                    <button className={`p-3 ${theme.bg.card} backdrop-blur-xl rounded-xl hover:scale-110 transition-transform`}>
                      <Layers className="w-5 h-5 text-violet-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`${theme.bg.card} backdrop-blur-xl rounded-2xl px-6 py-3 flex items-center space-x-3`}>
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <span className={`font-medium ${theme.text.primary}`}>Live GPS Tracking Active</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className={`${theme.bg.card} backdrop-blur-xl rounded-2xl px-6 py-3`}>
                      <p className={`text-sm ${theme.text.muted}`}>Current Speed</p>
                      <p className={`text-2xl font-bold text-violet-600`}>65 mph</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 mb-8 border ${theme.border.card}`}>
                <h3 className={`text-2xl font-bold ${theme.text.primary} mb-8`}>Shipment Journey</h3>
                <div className="space-y-6">
                  {trackingTimelineDataConstant.map((event, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="flex flex-col items-center">
                        <div className={`relative w-6 h-6 rounded-full ${
                          event.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                          event.status === 'current' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                          'bg-gray-400'
                        }`}>
                          {event.status === 'current' && (
                            <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping"></div>
                          )}
                        </div>
                        {index < trackingTimelineDataConstant.length - 1 && (
                          <div className={`w-0.5 h-20 ${
                            event.status === 'completed' ? 'bg-gradient-to-b from-green-500 to-green-500/20' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>
                      <div className={`flex-1 ${theme.bg.input} rounded-2xl p-6 group hover:scale-105 transition-transform`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-bold text-lg ${
                              event.status === 'pending' ? theme.text.muted : theme.text.primary
                            }`}>{event.title}</h4>
                            <p className={`${theme.text.secondary} mt-1`}>{event.date}</p>
                            <p className={`${theme.text.muted} text-sm mt-1`}>{event.location}</p>
                          </div>
                          {event.status === 'completed' && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 border ${theme.border.card} hover:scale-105 transition-transform`}>
                  <h3 className={`text-xl font-bold ${theme.text.primary} mb-6`}>Driver Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={theme.text.secondary}>Name:</span>
                      <span className={`font-medium ${theme.text.primary}`}>Robert Johnson</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={theme.text.secondary}>Phone:</span>
                      <a href="tel:+1234567890" className="font-medium text-violet-600 hover:text-violet-700">
                        +1 (234) 567-890
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={theme.text.secondary}>Truck #:</span>
                      <span className={`font-medium ${theme.text.primary}`}>TRK-456</span>
                    </div>
                  </div>
                </div>

                <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 border ${theme.border.card} hover:scale-105 transition-transform`}>
                  <h3 className={`text-xl font-bold ${theme.text.primary} mb-6`}>Real-Time Notifications</h3>
                  <p className={`${theme.text.secondary} mb-6`}>
                    Get instant updates about your shipment status
                  </p>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold ${
                      notificationsEnabled 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/50'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <span>{notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const TransEdgeFreightApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>(''); // 'user' or 'admin'
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showBookingNotification, setShowBookingNotification] = useState<boolean>(false);

  const orderStepRef = useRef<number>(1);
  const orderDataRef = useRef<OrderData>({
    cargoType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    pickupTime: '',
    deliveryDate: '',
    serviceType: '',
    insurance: false,
    packaging: false,
    loading: false,
    storage: false,
    specialInstructions: ''
  });

  const handlePageChange = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const testimonials = [
    { 
      name: "John Smith", 
      company: "Tech Solutions Inc.", 
      rating: 5, 
      text: "TransEdge has transformed our logistics operations. Real-time tracking gives us complete visibility.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    { 
      name: "Sarah Johnson", 
      company: "Global Manufacturing", 
      rating: 5, 
      text: "Outstanding service! The automated payment system saves us hours of administrative work.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    { 
      name: "Michael Chen", 
      company: "E-commerce Express", 
      rating: 5, 
      text: "24/7 support and reliable delivery times. Couldn't ask for a better freight partner.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    }
  ];

  const advantages = [
    {
      icon: <Globe2 className="w-12 h-12" />,
      title: "Real-time Tracking via Google Maps",
      description: "Track your shipment every step of the way with live GPS updates"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure & Instant Payments",
      description: "Multiple payment options with bank-level security and instant processing"
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "24/7 AI-Powered Support",
      description: "Our AI assistant and human team are always ready to help"
    }
  ];

  const theme = useMemo(() => ({
    bg: {
      primary: isDarkMode ? 'bg-black' : 'bg-white',
      secondary: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      card: isDarkMode ? 'bg-gray-900/50' : 'bg-white',
      hover: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
      input: isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
    },
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-400' : 'text-gray-500'
    },
    border: {
      primary: isDarkMode ? 'border-gray-800' : 'border-gray-200',
      card: isDarkMode ? 'border-gray-700/50' : 'border-gray-200'
    }
  }), [isDarkMode]);

  const Header = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${theme.bg.primary} ${
      scrolled ? `shadow-2xl ${isDarkMode ? 'shadow-purple-500/10' : 'shadow-gray-200'}` : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handlePageChange('/')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7 text-white" />
      </div>
            </div>
            <div>
              <span className={`text-2xl font-bold ${theme.text.primary}`}>TransEdge</span>
              <span className="text-xs bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold block">FREIGHT 2025</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {['Home', 'Services', 'Track Shipment', 'Order Form', 'Pricing', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Home') handlePageChange('/');
                  if (item === 'Track Shipment') handlePageChange('/track');
                  if (item === 'Services') handlePageChange('/services');
                  if (item === 'Order Form') handlePageChange('/order');
                  if (item === 'Pricing') handlePageChange('/pricing');
                  if (item === 'Contact') handlePageChange('/contact');
                  if (item === 'About Us') handlePageChange('/about');
                  if (item === 'Careers') handlePageChange('/careers');
                  if (item === 'Blog') handlePageChange('/blog');
                  if (item === 'Schedule a Demo') handlePageChange('/demo');

                }}
                className={`font-medium relative group ${
                  (item === 'Home' && location.pathname === '/') ||
                  (item === 'Track Shipment' && location.pathname === '/track') ||
                  (item === 'Services' && location.pathname === '/services') ||
                  (item === 'Order Form' && location.pathname === '/order') ||
                  (item === 'Pricing' && location.pathname === '/pricing') ||
                  (item === 'Contact' && location.pathname === '/contact')
                    ? 'text-violet-600'
                    : theme.text.primary
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative p-2.5 rounded-xl ${theme.bg.hover} transition-all duration-300 group z-10`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              {isDarkMode ? (
                <Sun className={`w-5 h-5 ${theme.text.primary} relative z-10`} />
              ) : (
                <Moon className={`w-5 h-5 ${theme.text.primary} relative z-10`} />
              )}
            </button>

            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`relative p-2.5 rounded-xl ${theme.bg.hover} transition-all duration-300 group z-10`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              <Search className={`w-5 h-5 ${theme.text.primary} relative z-10`} />
            </button>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => handlePageChange('/dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2.5 ${theme.bg.hover} rounded-xl transition-all duration-300`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
    </div>
                  <span className={`font-medium ${theme.text.primary}`}>
                    {userType === 'admin' ? 'Admin' : 'Dashboard'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setUserType('');
                    handlePageChange('/');
                  }}
                  className={`p-2.5 rounded-xl ${theme.bg.hover} transition-all duration-300`}
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="hidden md:flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300 relative z-10"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </button>
            )}

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative p-2.5 rounded-xl ${theme.bg.hover} transition-all duration-300 z-10`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        {isSearchOpen && (
          <div className="py-4 border-t border-gray-800/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className={`w-full px-6 py-3 ${theme.bg.input} rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
              />
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className={`lg:hidden ${theme.bg.card} backdrop-blur-xl border-t ${theme.border.primary}`}>
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {['Home', 'Services', 'Track Shipment', 'Order Form', 'Pricing', 'Contact', 'About Us', 'Careers', 'Blog', 'Schedule a Demo'].map((item) => (
              <a 
                key={item}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Home') handlePageChange('/');
                  if (item === 'Track Shipment') handlePageChange('/track');
                  if (item === 'Services') handlePageChange('/services');
                  if (item === 'Order Form') handlePageChange('/order');
                  if (item === 'Pricing') handlePageChange('/pricing');
                  if (item === 'Contact') handlePageChange('/contact');
                  if (item === 'About Us') handlePageChange('/about');
                  if (item === 'Careers') handlePageChange('/careers');
                  if (item === 'Blog') handlePageChange('/blog');
                  if (item === 'Schedule a Demo') handlePageChange('/demo');
                }}
                className={`block ${theme.text.primary} hover:text-violet-600 transition-colors font-medium text-lg`}
              >
                {item}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handlePageChange('/dashboard')}
                  className={`block ${theme.text.primary} hover:text-violet-600 transition-colors font-medium text-lg`}
                >
                  {userType === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                </button>
                  <button
                    onClick={() => {
                    setIsAuthenticated(false);
                    setUserType('');
                    handlePageChange('/');
                    }}
                  className="w-full mt-6 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                  >
                  Log Out
                  </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all flex items-center justify-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}
          </nav>
                </div>
      )}
    </header>
    );
  };

  const Footer = () => (
    <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} pt-20 pb-10 relative overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                  </div>

      <div className="container mx-auto px-4 relative z-10 mt-20">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Truck className="w-7 h-7 text-white" />
                    </div>
              <div>
                <span className={`text-2xl font-bold ${theme.text.primary}`}>TransEdge</span>
                <span className="text-xs bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold block">FREIGHT 2025</span>
                  </div>
                  </div>
            <p className={theme.text.secondary}>
              Your trusted partner for reliable freight transportation across the United States.
            </p>
                  </div>

          <div>
            <h4 className={`text-lg font-semibold mb-6 ${theme.text.primary}`}>Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Track Shipment', 'Order Form', 'Pricing', 'Schedule a Demo'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link === 'Home') handlePageChange('/');
                      if (link === 'Track Shipment') handlePageChange('/track');
                      if (link === 'Order Form') handlePageChange('/order');
                      if (link === 'Services') handlePageChange('/services');
                      if (link === 'Pricing') handlePageChange('/pricing');
                      if (link === 'Schedule a Demo') handlePageChange('/demo');
                    }}
                    className={`${theme.text.secondary} hover:text-violet-600 transition-colors flex items-center space-x-2 group`}
                  >
                    <span className="w-1 h-1 bg-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
                </div>

          <div>
            <h4 className={`text-lg font-semibold mb-6 ${theme.text.primary}`}>Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Careers', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link === 'About Us') handlePageChange('/about');
                      if (link === 'Contact') handlePageChange('/contact');
                      if (link === 'Careers') handlePageChange('/careers');
                      if (link === 'Blog') handlePageChange('/blog');
                    }}
                    className={`${theme.text.secondary} hover:text-violet-600 transition-colors flex items-center space-x-2 group`}
                  >
                    <span className="w-1 h-1 bg-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
              </div>

          <div>
            <h4 className={`text-lg font-semibold mb-6 ${theme.text.primary}`}>Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-violet-600" />
                </div>
                <span className={theme.text.secondary}>1-800-FREIGHT</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-violet-600" />
                </div>
                <span className={theme.text.secondary}>info@transedge.com</span>
              </div>
              <div className="flex items-center space-x-3 mt-6">
                {[Facebook, Linkedin, Twitter].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center hover:from-violet-600 hover:to-indigo-600 group transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${theme.border.primary} pt-8 text-center`}>
          <p className={theme.text.secondary}>&copy; 2025 TransEdge Freight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const HomePage = () => (
    <>
      <section className="relative flex items-center justify-center overflow-hidden pt-8 pb-8">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-gradient-to-br from-violet-50 via-white to-indigo-50'}`}>
          {isDarkMode && (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-50"></div>
          )}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-40 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
                <Sparkles className="w-5 h-5 text-violet-600 animate-pulse" />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  AI-Powered Logistics Platform
                </span>
                <Activity className="w-5 h-5 text-indigo-600 animate-pulse" />
              </div>

              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${theme.text.primary}`}>
                <span className="block">Freight Shipping</span>
                <span className="block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Redefined
                </span>
              </h1>
              
              <p className={`text-xl md:text-2xl ${theme.text.secondary} mb-12 leading-relaxed`}>
                Experience the future of logistics with real-time AI tracking, blockchain security, 
                and lightning-fast automated payments across the USA
              </p>

              <div className="flex flex-col sm:flex-row gap-6">

                
                <button
                  onClick={() => handlePageChange('/track')}
                  className={`group px-8 py-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'} backdrop-blur-xl rounded-2xl font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 ${theme.text.primary}`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Package className="w-5 h-5" />
                    <span>Track Your Shipment</span>
                      </div>
                </button>
                    </div>
                  </div>
                  
            {/* Заменяю грид с картинками на одну карточку с грузовиком */}
            <div className="flex justify-center items-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-violet-600/20 bg-white/80 max-w-lg w-full">
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop"
                  alt="Truck"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-32 ${theme.bg.primary} relative overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-6`}>
              Why <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">TransEdge</span>?
            </h2>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Leading the logistics revolution with next-generation technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                    <img 
                      src={
                        index === 0 ? `https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=400&fit=crop` :
                        index === 1 ? `https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop` :
                        aiPoweredSupportImg // Прямое использование импортированного изображения для index === 2
                      }
                      alt={advantage.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                        <div className="text-white">{advantage.icon}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>{advantage.title}</h3>
                <p className={`${theme.text.secondary} max-w-sm mx-auto`}>{advantage.description}</p>
                    </div>
                  ))}
                </div>
              </div>
      </section>

      <section className={`py-32 ${theme.bg.secondary} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/5 to-indigo-600/5 rounded-full blur-3xl"></div>
                    </div>

        <div className="container mx-auto px-4 relative z-10 mt-20">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold ${theme.text.primary} mb-6`}>
              Client <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Join thousands of satisfied customers shipping with confidence
            </p>
                    </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 border ${theme.border.card} hover:border-violet-600/50 transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 ring-4 ring-violet-600/20"
                  />
                  <div>
                    <h4 className={`font-semibold ${theme.text.primary}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${theme.text.secondary}`}>{testimonial.company}</p>
                    </div>
                  </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={theme.text.secondary}>{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-32 ${theme.bg.primary} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-indigo-600/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-12 md:p-20 border ${theme.border.card} text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-indigo-600/5 animate-gradient"></div>
            
            <div className="relative z-10">
              <h2 className={`text-5xl md:text-6xl font-bold ${theme.text.primary} mb-6`}>
                Ready to Ship <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Smarter</span>?
              </h2>
              <p className={`text-xl ${theme.text.secondary} mb-10 max-w-2xl mx-auto`}>
                Join the logistics revolution and experience shipping like never before
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                
                <button className={`px-10 py-5 ${theme.bg.primary} ${theme.text.primary} rounded-2xl font-semibold text-lg border ${theme.border.card} hover:border-violet-600/50 transform hover:scale-105 transition-all duration-300`}>
                  Schedule a Demo
                  </button>
                </div>
              </div>
        </div>
      </div>
      </section>
    </>
  );

  const ServicesPage = () => {
    const detailedServices = [
      {
        icon: <Truck className="w-10 h-10" />,
        title: "Full Truck Load (FTL)",
        subtitle: "Maximum capacity, direct routes",
        description: "Perfect for large shipments that require an entire truck. Get dedicated transportation with the fastest delivery times.",
        gradient: "from-violet-600 to-indigo-600",
        price: "Starting from $2.50/mile",
        image: "https://images.unsplash.com/photo-dlyz37qqHfM?auto=format&fit=crop&w=800&q=80"
      },
      {
        icon: <Package className="w-10 h-10" />,
        title: "Less Than Truckload (LTL)",
        subtitle: "Share space, save money",
        description: "Cost-effective solution for smaller freight shipments",
        gradient: "from-blue-600 to-cyan-600",
        price: "Starting from $0.15/lb",
        image: "https://images.unsplash.com/photo-5jho07dKCYM?auto=format&fit=crop&w=800&q=80"
      },
      {
        icon: <Thermometer className="w-10 h-10" />,
        title: "Refrigerated Transport",
        subtitle: "Temperature-controlled shipping for perishable goods",
        description: "Specialized transport for perishable goods",
        gradient: "from-emerald-600 to-teal-600",
        price: "Starting from $3.00/mile",
        image: "https://images.unsplash.com/photo-EsS3g8O6hvI?auto=format&fit=crop&w=800&q=80"
      },
      {
        icon: <Box className="w-10 h-10" />,
        title: "Oversized Cargo",
        subtitle: "Special handling for large and heavy equipment",
        description: "Special handling for large and heavy equipment",
        gradient: "from-orange-600 to-red-600",
        price: "Custom quote required",
        image: "https://images.unsplash.com/photo-QAVSXQuKuQ8?auto=format&fit=crop&w=800&q=80"
      },
      {
        icon: <Zap className="w-10 h-10" />,
        title: "Expedited Freight",
        subtitle: "Fast delivery when time is critical",
        description: "Fast delivery when time is critical",
        gradient: "from-yellow-600 to-orange-600",
        price: "Premium rates apply",
        image: "https://images.unsplash.com/photo-KNREOaa4qDw?auto=format&fit=crop&w=800&q=80"
      }
    ];

    const faqItems = [
      {
        question: "How do I choose between FTL and LTL?",
        answer: "Choose FTL if you have more than 15,000 lbs or need the entire truck. LTL is perfect for smaller shipments and offers cost savings by sharing truck space."
      },
      {
        question: "What items require refrigerated transport?",
        answer: "Perishable foods, pharmaceuticals, chemicals, cosmetics, and any temperature-sensitive products require refrigerated transport."
      },
      {
        question: "How far in advance should I book?",
        answer: "For standard shipments, 24-48 hours. For oversized cargo, 5-7 days. Expedited freight can be arranged within hours."
      },
      {
        question: "Do you provide insurance?",
        answer: "Yes, all shipments include basic cargo insurance. Additional coverage is available for high-value items."
      },
      {
        question: "Can I track my shipment in real-time?",
        answer: "Absolutely! All our services include real-time GPS tracking accessible through our web platform and mobile app."
      }
    ];

    return (
      <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>



        <section className={`py-20 ${theme.bg.secondary} relative overflow-hidden`}>
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold ${theme.text.primary} mb-6`}>
                Service <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Comparison</span>
              </h2>
              <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto`}>
                Find the perfect shipping solution for your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedServices.map((service, index) => (
                <div 
                  key={index} 
                  className={`group relative ${theme.bg.card} backdrop-blur-xl rounded-3xl overflow-hidden border ${theme.border.card} hover:border-violet-600/50 transition-all duration-500 hover:scale-105 cursor-pointer`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={
                        index === 0 ? fullTruckLoadImg :
                        index === 1 ? lessTruckloadImg :
                        index === 2 ? refrigeratedTransportImg :
                        index === 3 ? oversizedCargoImg :
                        expeditedFreightImg
                      }
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent`}></div>
                    <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <div className="text-white">{service.icon}</div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold ${theme.text.primary} mb-3`}>{service.title}</h3>
                    <p className={theme.text.secondary}>{service.description}</p>
                    <div className="mt-6 flex items-center space-x-2 text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button
                        className="font-medium flex items-center gap-2 focus:outline-none"
                        onClick={() => {
                          handlePageChange(
                            index === 0 ? '/ftl-details' :
                            index === 1 ? '/ltl-details' :
                            index === 2 ? '/refrigerated-details' :
                            index === 3 ? '/oversized-details' :
                            '/expedited-details'
                          );
                        }}
                      >
                        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-20 ${theme.bg.primary}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4`}>
                Frequently Asked <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className={`${theme.bg.card} backdrop-blur-xl rounded-2xl p-6 border ${theme.border.card} hover:border-violet-600/50 transition-all duration-300`}
                >
                  <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3 flex items-start space-x-3`}>
                    <span className="text-violet-600 text-xl">Q.</span>
                    <span>{item.question}</span>
                  </h3>
                  <p className={`${theme.text.secondary} ml-7`}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-20 ${theme.bg.secondary}`}>
          <div className="container mx-auto px-4">
            <div className={`relative ${theme.bg.card} backdrop-blur-xl rounded-3xl p-12 md:p-20 border ${theme.border.card} text-center overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10"></div>
              
              <div className="relative z-10">
                <h2 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-6`}>
                  Ready to Ship with <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">TransEdge</span>?
                </h2>
                <p className={`text-xl ${theme.text.secondary} mb-10 max-w-2xl mx-auto`}>
                  Get started with a free quote and experience the future of freight shipping
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  
                  <button className={`px-10 py-5 ${theme.bg.primary} ${theme.text.primary} rounded-2xl font-semibold text-lg border ${theme.border.card} hover:border-violet-600/50 transform hover:scale-105 transition-all duration-300`}>
                    Schedule a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

    const OrderPlacementPage = ({
                                  theme,
                                  orderStepRef: propOrderStepRef,
                                  orderDataRef: propOrderDataRef,
                                  onOrder
                                }: ThemedPageProps) => {
      const [, forceUpdate] = useState(0);
      const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

      if (!propOrderStepRef || !propOrderDataRef) {
        console.error("OrderPlacementPage: orderStepRef or orderDataRef is not provided!");
        return (
          <div className={`pt-32 min-h-screen ${theme.bg.primary} text-red-500`}>
            Error: Missing order state references.
          </div>
        );
      }

      const orderStep = propOrderStepRef;
      const orderData = propOrderDataRef;

      const setStep = (newStep: number) => {
        const clamped = Math.max(1, Math.min(4, newStep));
        orderStep.current = clamped;
        // автосчёт цены при переходе на обзор
        if (clamped === 4) calculatePrice();
        forceUpdate(prev => prev + 1);
      };

      const handleInputChange = (field: keyof OrderData, value: string | boolean) => {
        orderData.current = { ...orderData.current, [field]: value };
        forceUpdate(prev => prev + 1);
      };

      const calculatePrice = () => {
        const weightStr = String(orderData.current.weight || '0');
        const weight = parseFloat(weightStr);
        const safeWeight = Number.isFinite(weight) ? weight : 0;

        const serviceMultiplier: { [k: string]: number } = {
          ftl: 1.2,
          ltl: 0.8,
          refrigerated: 1.5,
          oversized: 2.0,
          expedited: 2.5
        };
        const multiplier = serviceMultiplier[orderData.current.serviceType as string] ?? 1;

        const extras =
          (orderData.current.insurance ? 100 : 0) +
          (orderData.current.packaging ? 50 : 0) +
          (orderData.current.loading ? 75 : 0) +
          (orderData.current.storage ? 200 : 0);

        const basePrice = safeWeight * 2.5;
        const total = Number(((basePrice * multiplier) + extras).toFixed(2));
        setEstimatedPrice(total);
      };

      const cargoTypes = [
        { value: 'standard', label: 'Standard Cargo', icon: <Package className="w-5 h-5" /> },
        { value: 'fragile', label: 'Fragile Items', icon: <AlertCircle className="w-5 h-5" /> },
        { value: 'hazardous', label: 'Hazardous Materials', icon: <AlertCircle className="w-5 h-5" /> },
        { value: 'perishable', label: 'Perishable Goods', icon: <Thermometer className="w-5 h-5" /> }
      ];

      const serviceTypes = [
        { value: 'ftl', label: 'Full Truck Load (FTL)', description: 'Dedicated truck, fastest delivery' },
        { value: 'ltl', label: 'Less Than Truckload (LTL)', description: 'Shared space, economical' },
        { value: 'refrigerated', label: 'Refrigerated Transport', description: 'Temperature-controlled' },
        { value: 'oversized', label: 'Oversized Cargo', description: 'Special equipment' },
        { value: 'expedited', label: 'Expedited Freight', description: 'Urgent delivery' }
      ];

      const additionalServices = [
        { value: 'insurance' as keyof OrderData, label: 'Cargo Insurance', price: '$100', description: 'Full coverage protection' },
        { value: 'packaging' as keyof OrderData, label: 'Professional Packaging', price: '$50', description: 'Secure packaging service' },
        { value: 'loading' as keyof OrderData, label: 'Loading/Unloading', price: '$75', description: 'Professional handling' },
        { value: 'storage' as keyof OrderData, label: 'Temporary Storage', price: '$200', description: 'Up to 7 days storage' }
      ];

      const steps = [
        { number: 1, title: 'Cargo Details', icon: <Package className="w-5 h-5" /> },
        { number: 2, title: 'Locations & Dates', icon: <MapPin className="w-5 h-5" /> },
        { number: 3, title: 'Service Selection', icon: <Truck className="w-5 h-5" /> },
        { number: 4, title: 'Review & Confirm', icon: <CheckCircle className="w-5 h-5" /> }
      ];

      return (
        <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
          {/* фоновые круги */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Заголовок */}
              <div className="text-center mb-12">
                <h1 className={`text-5xl md:text-6xl font-bold ${theme.text.primary} mb-6`}>
                  Place Your{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Order
              </span>
                </h1>
                <p className={`text-xl ${theme.text.secondary}`}>
                  Complete the form below to get an instant quote and book your shipment
                </p>
              </div>

              {/* Шаги-индикатор */}
              <div className="mb-12">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`flex flex-col items-center ${
                          orderStep.current >= step.number ? 'text-violet-600' : theme.text.muted
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                            orderStep.current >= step.number
                              ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
                              : `${theme.bg.card} border-2 ${theme.border.card}`
                          }`}
                        >
                          {orderStep.current > step.number ? <CheckCircle className="w-6 h-6" /> : step.icon}
                        </div>
                        <span
                          className={`text-sm font-medium hidden md:block ${
                            orderStep.current >= step.number ? theme.text.primary : theme.text.muted
                          }`}
                        >
                      {step.title}
                    </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-20 md:w-32 h-1 mx-2 ${
                            orderStep.current > step.number ? 'bg-violet-600' : theme.bg.card
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Карточка формы */}
              <div className={`${theme.bg.card} backdrop-blur-xl rounded-3xl p-8 md:p-12 border ${theme.border.card}`}>
                {/* STEP 1 ------------------------------------------------ */}
                {orderStep.current === 1 && (
                  <>
                    <h2 className={`text-2xl font-bold ${theme.text.primary} mb-6`}>Cargo Information</h2>

                    {/* Cargo type */}
                    <div className="mb-6">
                      <label className={`block text-sm font-medium ${theme.text.primary} mb-3`}>
                        Cargo Type
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {cargoTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleInputChange('cargoType', type.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              orderData.current.cargoType === type.value
                                ? 'border-violet-600 bg-violet-600/10'
                                : `${theme.border.card} hover:border-violet-600/50`
                            }`}
                          >
                            <div
                              className={`${
                                orderData.current.cargoType === type.value ? 'text-violet-600' : theme.text.secondary
                              }`}
                            >
                              {type.icon}
                            </div>
                            <p className={`mt-2 text-sm font-medium ${theme.text.primary}`}>{type.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div className="mb-6">
                      <label className={`block text-sm font-medium ${theme.text.primary} mb-3`}>
                        Cargo Dimensions & Weight
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className={`block text-xs ${theme.text.muted} mb-1`}>Weight (lbs)</label>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step="any"
                            placeholder="e.g., 1500"
                            value={orderData.current.weight ?? ''}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs ${theme.text.muted} mb-1`}>Length (in)</label>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step="any"
                            placeholder="e.g., 48"
                            value={orderData.current.length ?? ''}
                            onChange={(e) => handleInputChange('length', e.target.value)}
                            className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs ${theme.text.muted} mb-1`}>Width (in)</label>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step="any"
                            placeholder="e.g., 40"
                            value={orderData.current.width ?? ''}
                            onChange={(e) => handleInputChange('width', e.target.value)}
                            className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className={`block text-xs ${theme.text.muted} mb-1`}>Height (in)</label>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step="any"
                            placeholder="e.g., 40"
                            value={orderData.current.height ?? ''}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                            className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special instructions */}
                    <div className="mb-8">
                      <label className={`block text-sm font-medium ${theme.text.primary} mb-3`}>
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        placeholder="Any special handling requirements or notes..."
                        value={orderData.current.specialInstructions ?? ''}
                        onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className={`px-8 py-3 ${theme.bg.input} ${theme.text.primary} rounded-xl font-semibold hover:scale-105 transition-all duration-300`}
                      >
                        Continue to Locations
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 2 ------------------------------------------------ */}
                {orderStep.current === 2 && (
                  <>
                    <h2 className={`text-2xl font-bold ${theme.text.primary} mb-8`}>
                      Pickup & Delivery Details
                    </h2>

                    <div className="space-y-6 mb-8">
                      <div>
                        <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                          Pickup Address
                        </label>
                        <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <MapPin className={`w-5 h-5 ${theme.text.muted}`} />
                      </span>
                          <input
                            type="text"
                            placeholder="Enter pickup location"
                            value={orderData.current.pickupAddress ?? ''}
                            onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                          Delivery Address
                        </label>
                        <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <MapPin className={`w-5 h-5 ${theme.text.muted}`} />
                      </span>
                          <input
                            type="text"
                            placeholder="Enter delivery destination"
                            value={orderData.current.deliveryAddress ?? ''}
                            onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                            Pickup Date
                          </label>
                          <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Calendar className={`w-5 h-5 ${theme.text.muted}`} />
                        </span>
                            <input
                              type="date"
                              value={orderData.current.pickupDate ?? ''}
                              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                            Pickup Time
                          </label>
                          <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Clock className={`w-5 h-5 ${theme.text.muted}`} />
                        </span>
                            <input
                              type="time"
                              value={orderData.current.pickupTime ?? ''}
                              onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>
                          Preferred Delivery Date (Optional)
                        </label>
                        <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Calendar className={`w-5 h-5 ${theme.text.muted}`} />
                      </span>
                          <input
                            type="date"
                            value={orderData.current.deliveryDate ?? ''}
                            onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-10">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={`px-8 py-3 ${theme.bg.input} ${theme.text.primary} rounded-xl font-semibold hover:scale-105 transition-all duration-300`}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300"
                      >
                        Continue to Services
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 3 ------------------------------------------------ */}
                {orderStep.current === 3 && (
                  <>
                    <h2 className={`text-2xl font-bold ${theme.text.primary} mb-6`}>
                      Select Service Type
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {serviceTypes.map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => handleInputChange('serviceType', service.value)}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                            (orderData.current.serviceType as string) === service.value
                              ? 'border-violet-600 bg-violet-600/10'
                              : `${theme.border.card} hover:border-violet-600/50`
                          }`}
                        >
                          <h4 className={`font-semibold text-lg mb-1 ${theme.text.primary}`}>{service.label}</h4>
                          <p className={`${theme.text.secondary} text-sm`}>{service.description}</p>
                        </button>
                      ))}
                    </div>

                    <h3 className={`text-xl font-bold ${theme.text.primary} mt-10 mb-6`}>Additional Services</h3>
                    <div className="space-y-4 mb-8">
                      {additionalServices.map((service) => (
                        <div
                          key={service.value}
                          className={`${theme.bg.input} p-4 rounded-xl flex items-center justify-between`}
                        >
                          <div>
                            <h4 className={`font-medium ${theme.text.primary}`}>{service.label}</h4>
                            <p className={`text-sm ${theme.text.muted}`}>
                              {service.description} - <span className="font-semibold text-violet-500">{service.price}</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleInputChange(
                                service.value as keyof OrderData,
                                !orderData.current[service.value as keyof OrderData]
                              )
                            }
                            className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                              orderData.current[service.value as keyof OrderData]
                                ? 'bg-violet-600 justify-end'
                                : 'bg-gray-300 dark:bg-gray-700 justify-start'
                            }`}
                            aria-pressed={!!orderData.current[service.value as keyof OrderData]}
                          >
                            <span className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform"></span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className={`px-8 py-3 ${theme.bg.input} ${theme.text.primary} rounded-xl font-semibold hover:scale-105 transition-all duration-300`}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300"
                      >
                        Review Order
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 4 ------------------------------------------------ */}
                {orderStep.current === 4 && (
                  <>
                    <h2 className={`text-2xl font-bold ${theme.text.primary} mb-8`}>Review Your Order</h2>

                    <div className={`${theme.bg.input} rounded-2xl p-6 mb-8 space-y-4`}>
                      <div>
                        <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3`}>Cargo Details</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <span className={theme.text.muted}>Cargo Type:</span>
                          <span className={theme.text.primary}>{orderData.current.cargoType || '-'}</span>
                          <span className={theme.text.muted}>Weight:</span>
                          <span className={theme.text.primary}>
                        {orderData.current.weight ? `${orderData.current.weight} lbs` : '-'}
                      </span>
                          <span className={theme.text.muted}>Dimensions:</span>
                          <span className={theme.text.primary}>
                        {orderData.current.length && orderData.current.width && orderData.current.height
                          ? `${orderData.current.length}x${orderData.current.width}x${orderData.current.height} in`
                          : '-'}
                      </span>
                          <span className={theme.text.muted}>Instructions:</span>
                          <span className={`whitespace-pre-wrap ${theme.text.primary}`}>
                        {orderData.current.specialInstructions || '-'}
                      </span>
                        </div>
                      </div>

                      <hr className={theme.border.primary} />

                      <div>
                        <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3`}>Locations & Dates</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <span className={theme.text.muted}>Pickup:</span>
                          <span className={theme.text.primary}>{orderData.current.pickupAddress || '-'}</span>
                          <span className={theme.text.muted}>Delivery:</span>
                          <span className={theme.text.primary}>{orderData.current.deliveryAddress || '-'}</span>
                          <span className={theme.text.muted}>Pickup Date:</span>
                          <span className={theme.text.primary}>
                        {orderData.current.pickupDate || '-'} at {orderData.current.pickupTime || '-'}
                      </span>
                          <span className={theme.text.muted}>Delivery Date:</span>
                          <span className={theme.text.primary}>{orderData.current.deliveryDate || '-'}</span>
                        </div>
                      </div>

                      <hr className={theme.border.primary} />

                      <div>
                        <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3`}>Service Details</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <span className={theme.text.muted}>Service Type:</span>
                          <span className={theme.text.primary}>
                        {serviceTypes.find(s => s.value === orderData.current.serviceType)?.label || '-'}
                      </span>
                          <span className={theme.text.muted}>Insurance:</span>
                          <span className={theme.text.primary}>{orderData.current.insurance ? 'Yes' : 'No'}</span>
                          <span className={theme.text.muted}>Packaging:</span>
                          <span className={theme.text.primary}>{orderData.current.packaging ? 'Yes' : 'No'}</span>
                          <span className={theme.text.muted}>Loading/Unloading:</span>
                          <span className={theme.text.primary}>{orderData.current.loading ? 'Yes' : 'No'}</span>
                          <span className={theme.text.muted}>Storage:</span>
                          <span className={theme.text.primary}>{orderData.current.storage ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <p className={`text-lg ${theme.text.secondary}`}>Estimated Price:</p>
                      <p className={`text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent`}>
                        {estimatedPrice !== null ? `$${estimatedPrice.toFixed(2)}` : 'Calculating...'}
                      </p>
                      <p className={`text-sm ${theme.text.muted}`}>(Price may vary based on final details)</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className={`flex-1 px-8 py-4 ${theme.bg.input} ${theme.text.primary} rounded-xl font-semibold hover:scale-105 transition-all duration-300`}
                      >
                        Back to Services
                      </button>
                      <button
                        type="button"
                        onClick={() => onOrder && onOrder()}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300"
                      >
                        Submit Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };

  const LoginModal = () => {
    const handleLogin = (type: string) => {
      setIsAuthenticated(true);
      setUserType(type);
      setShowLoginModal(false);
      handlePageChange('/dashboard');
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>

        <div className={`relative ${theme.bg.card} rounded-3xl p-8 max-w-md w-full border ${theme.border.card} transform transition-all`}>
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${theme.text.primary}`}>
              Demo Access
            </h2>
            <p className={theme.text.secondary}>
              Click below to enter the dashboard
            </p>
          </div>

          {/* Demo notice */}
          <div className="mb-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
            <p className="text-sm text-violet-400 text-center">
              This is a demo site. No real login required — just click to explore the dashboard and see your bookings.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleLogin('admin')}
              className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Enter Dashboard
            </button>
          </div>

          <p className={`text-center mt-4 text-xs ${theme.text.secondary}`}>
            View all bookings created via voice assistant
          </p>
        </div>
    </div>
  );
};

  // Notification component for booking confirmation
  const BookingNotification = () => {
    if (!showBookingNotification) return null;

    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
        <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} shadow-2xl max-w-sm`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${theme.text.primary} mb-1`}>Booking Created!</h4>
              <p className={`text-sm ${theme.text.secondary} mb-3`}>
                Your freight booking has been confirmed.
              </p>
              <button
                onClick={() => {
                  setShowBookingNotification(false);
                  setShowLoginModal(true);
                }}
                className="text-sm font-medium text-violet-500 hover:text-violet-400 flex items-center gap-1"
              >
                View in Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowBookingNotification(false)}
              className={`p-1 rounded-lg ${theme.bg.hover}`}
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleBookingCreated = () => {
      setShowBookingNotification(true);
      setTimeout(() => setShowBookingNotification(false), 10000);
    };

    const widget = document.querySelector('typelessity-widget');
    const handleTypelessityBooking = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Booking completed via Typelessity:', customEvent.detail);
      handleBookingCreated();
    };

    widget?.addEventListener('booking-complete', handleTypelessityBooking);

    // Legacy support for old booking-created event
    window.addEventListener('booking-created', handleBookingCreated);
    (window as unknown as { showBookingNotification: () => void }).showBookingNotification = handleBookingCreated;

    return () => {
      widget?.removeEventListener('booking-complete', handleTypelessityBooking);
      window.removeEventListener('booking-created', handleBookingCreated);
    };
  }, []);

    const UserDashboard = () => {
      const stats = [
        { icon: <Package className="w-6 h-6" />, value: '24', label: 'Active Shipments', color: 'from-violet-600 to-indigo-600' },
        { icon: <TrendingUp className="w-6 h-6" />, value: '$12,450', label: 'This Month', color: 'from-emerald-600 to-teal-600' },
        { icon: <Clock className="w-6 h-6" />, value: '2.5 days', label: 'Avg. Delivery', color: 'from-orange-600 to-red-600' },
        { icon: <Award className="w-6 h-6" />, value: 'Gold', label: 'Member Status', color: 'from-yellow-600 to-orange-600' }
      ];

  return (
        <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="relative mb-12 rounded-3xl overflow-hidden h-64">
              <img 
                src="https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1920&h=400&fit=crop"
                alt="Dashboard hero"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              <div className="relative z-10 p-8 h-full flex items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Welcome back, John! 👋
                  </h1>
                  <p className="text-xl text-gray-200">
                    Track your shipments and manage your logistics
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} hover:scale-105 transition-transform`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                    {stat.icon}
                  </div>
                  <p className={`text-3xl font-bold ${theme.text.primary} mb-1`}>{stat.value}</p>
                  <p className={theme.text.secondary}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    );
  };

    const AdminDashboard = () => {
      interface Booking {
        bookingId: string;
        cargoType?: string;
        weight?: string;
        dimensions?: string;
        pickupAddress: string;
        deliveryAddress: string;
        pickupDate: string;
        deliveryDate?: string;
        contactName?: string;
        contactPhone?: string;
        contactEmail?: string;
        specialInstructions?: string;
        status: string;
        createdAt: string;
      }

      const [bookings, setBookings] = useState<Booking[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchBookings = async () => {
          try {
            const response = await fetch('/api/bookings');
            if (!response.ok) throw new Error('Failed to fetch bookings');
            const data = await response.json();
            setBookings(data.bookings || []);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Error loading bookings');
          } finally {
            setLoading(false);
          }
        };
        fetchBookings();
      }, []);

      const adminStats = [
        { icon: <Package className="w-6 h-6" />, value: String(bookings.length), label: 'Total Bookings', color: 'from-violet-600 to-indigo-600' },
        { icon: <TrendingUp className="w-6 h-6" />, value: String(bookings.filter(b => b.status === 'confirmed').length), label: 'Confirmed', color: 'from-emerald-600 to-teal-600' },
        { icon: <Clock className="w-6 h-6" />, value: String(bookings.filter(b => b.status === 'pending').length), label: 'Pending', color: 'from-orange-600 to-red-600' },
        { icon: <CheckCircle className="w-6 h-6" />, value: String(bookings.filter(b => b.status === 'delivered').length), label: 'Delivered', color: 'from-yellow-600 to-orange-600' }
      ];

      const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      };

      const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      };

      // Accordion Item Component
      const BookingAccordionItem = ({ booking, theme, formatDate, formatDateTime }: {
        booking: Booking;
        theme: ThemeType;
        formatDate: (d: string) => string;
        formatDateTime: (d: string) => string;
      }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div className="group">
            {/* Accordion Header */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-6 min-w-0 flex-1">
                {/* ID */}
                <code className={`text-xs ${theme.text.secondary} font-mono shrink-0`}>{booking.bookingId}</code>

                {/* Route */}
                <div className={`flex items-center gap-2 min-w-0 ${theme.text.primary}`}>
                  <span className="truncate max-w-[140px]" title={booking.pickupAddress}>{booking.pickupAddress}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${theme.text.secondary} shrink-0`} />
                  <span className="truncate max-w-[140px]" title={booking.deliveryAddress}>{booking.deliveryAddress}</span>
                </div>

                {/* Date */}
                <span className={`text-sm ${theme.text.secondary} tabular-nums shrink-0`}>{formatDate(booking.pickupDate)}</span>

                {/* Status */}
                <span className={`text-xs px-2 py-0.5 rounded font-medium shrink-0 ${
                  booking.status === 'confirmed'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : booking.status === 'pending'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {booking.status}
                </span>
              </div>

              {/* Chevron */}
              <svg
                className={`w-5 h-5 ${theme.text.secondary} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="px-5 pb-5 pt-2">
                <div className="grid grid-cols-3 gap-6">
                  {/* Pickup Section */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-medium ${theme.text.secondary} uppercase tracking-wide`}>Pickup</h4>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Address</span>
                        <p className={`text-sm ${theme.text.primary}`}>{booking.pickupAddress}</p>
                      </div>
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Date</span>
                        <p className={`text-sm ${theme.text.primary} tabular-nums`}>{formatDate(booking.pickupDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Section */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-medium ${theme.text.secondary} uppercase tracking-wide`}>Delivery</h4>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Address</span>
                        <p className={`text-sm ${theme.text.primary}`}>{booking.deliveryAddress}</p>
                      </div>
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Date</span>
                        <p className={`text-sm ${theme.text.primary} tabular-nums`}>{booking.deliveryDate ? formatDate(booking.deliveryDate) : '—'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Section */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-medium ${theme.text.secondary} uppercase tracking-wide`}>Cargo</h4>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Type</span>
                        <p className={`text-sm ${theme.text.primary}`}>{booking.cargoType || '—'}</p>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <span className={`text-xs ${theme.text.secondary}`}>Weight</span>
                          <p className={`text-sm ${theme.text.primary}`}>{booking.weight || '—'}</p>
                        </div>
                        <div>
                          <span className={`text-xs ${theme.text.secondary}`}>Dimensions</span>
                          <p className={`text-sm ${theme.text.primary}`}>{booking.dimensions || '—'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-medium ${theme.text.secondary} uppercase tracking-wide`}>Contact</h4>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Name</span>
                        <p className={`text-sm ${theme.text.primary} font-medium`}>{booking.contactName || '—'}</p>
                      </div>
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Phone</span>
                        <p className={`text-sm ${theme.text.primary}`}>{booking.contactPhone || '—'}</p>
                      </div>
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Email</span>
                        <p className={`text-sm ${theme.text.primary}`}>{booking.contactEmail || '—'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-medium ${theme.text.secondary} uppercase tracking-wide`}>Notes</h4>
                    <p className={`text-sm ${theme.text.primary}`}>{booking.specialInstructions || '—'}</p>
                  </div>

                  {/* Meta Section */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-medium ${theme.text.secondary} uppercase tracking-wide`}>Meta</h4>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Status</span>
                        <p className={`text-sm ${theme.text.primary}`}>{booking.status}</p>
                      </div>
                      <div>
                        <span className={`text-xs ${theme.text.secondary}`}>Created</span>
                        <p className={`text-sm ${theme.text.primary} tabular-nums`}>{formatDateTime(booking.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      };

  return (
        <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="relative mb-12 rounded-3xl overflow-hidden h-64">
              <img
                src="https://images.unsplash.com/photo-1577084381320-b40e8b5d4b3f?w=1920&h=400&fit=crop"
                alt="Admin dashboard"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 to-indigo-900/80"></div>
              <div className="relative z-10 p-8 h-full flex items-center justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Bookings Dashboard
                  </h1>
                  <p className="text-xl text-gray-200">
                    View all freight bookings from voice assistant
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {adminStats.map((stat, index) => (
                <div key={index} className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} hover:scale-105 transition-transform`}>
                  <div className={`h-12 w-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                    {stat.icon}
                  </div>
                  <p className={`text-3xl font-bold ${theme.text.primary} mb-1`}>{stat.value}</p>
                  <p className={theme.text.secondary}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bookings Accordion - Modern Design 2026 */}
            <div className={`${theme.bg.card} rounded-2xl border ${theme.border.card} overflow-hidden`}>
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-semibold ${theme.text.primary}`}>Bookings</h2>
                  <span className={`text-xs ${theme.text.secondary} tabular-nums`}>{bookings.length} total</span>
                </div>
              </div>

              {loading ? (
                <div className="p-16 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-3"></div>
                  <p className={`text-sm ${theme.text.secondary}`}>Loading...</p>
                </div>
              ) : error ? (
                <div className="p-16 text-center">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="p-16 text-center">
                  <p className={`text-sm ${theme.text.secondary}`}>No bookings yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {bookings.map((booking) => (
                    <BookingAccordionItem key={booking.bookingId} booking={booking} theme={theme} formatDate={formatDate} formatDateTime={formatDateTime} />
                  ))}
                </div>
              )}
            </div>

            {/* Demo hint */}
            <div className="mt-8 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center">
              <p className="text-sm text-violet-400">
                This dashboard shows real bookings from the database. Create a new booking using the voice assistant to see it appear here.
              </p>
            </div>
          </div>
        </div>
      );
    };

  // Детальные страницы услуг (вынесены на верхний уровень)
  const FtlDetailsPage = ({onOrder, theme}: {onOrder: () => void, theme: ThemeType}) => (
    <div className={`pt-32 min-h-screen flex flex-col items-center ${theme.bg.primary}`}>
      <img src={fullTruckLoadImg} alt="Full Truck Load" className="rounded-3xl shadow-2xl mb-10 w-full max-w-3xl object-cover" />
      <h1 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4`}>Full Truck Load (FTL)</h1>
      <h2 className="text-xl text-violet-400 mb-6">Maximum capacity, direct routes</h2>
      <p className={`text-lg ${theme.text.secondary} max-w-2xl mb-8 text-center`}>FTL is the best solution for large or valuable shipments. Your cargo occupies the entire truck, ensuring direct and fast delivery with no stops or transfers. Maximum security and transparent pricing.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Truck className="w-8 h-8 text-violet-500"/><span className={`${theme.text.primary} font-semibold`}>Direct delivery, no stops</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Shield className="w-8 h-8 text-green-500"/><span className={`${theme.text.primary} font-semibold`}>Maximum security</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Cpu className="w-8 h-8 text-indigo-400"/><span className={`${theme.text.primary} font-semibold`}>Real-time tracking</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><DollarSign className="w-8 h-8 text-yellow-400"/><span className={`${theme.text.primary} font-semibold`}>Transparent pricing</span></div>
      </div>
      <div className={`${theme.text.secondary} mb-10 max-w-xl text-center`}>Choose FTL if your shipment fills the entire truck or requires dedicated transport. Perfect for large batches, valuable goods, equipment.</div>
      <button className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl text-lg font-semibold hover:scale-105 transition-all mb-10" onClick={() => { onOrder(); window.scrollTo(0,0); }}>Order Now</button>
    </div>
  );

  const LtlDetailsPage = ({onOrder, theme}: {onOrder: () => void, theme: ThemeType}) => (
    <div className={`pt-32 min-h-screen flex flex-col items-center ${theme.bg.primary}`}>
      <img src={lessTruckloadImg} alt="Less Than Truckload" className="rounded-3xl shadow-2xl mb-10 w-full max-w-3xl object-cover" />
      <h1 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4`}>Less Than Truckload (LTL)</h1>
      <h2 className="text-xl text-blue-400 mb-6">Cost-effective for smaller shipments</h2>
      <p className={`text-lg ${theme.text.secondary} max-w-2xl mb-8 text-center`}>LTL is the optimal solution for shipping smaller batches. Your cargo shares space with other shipments, significantly reducing delivery costs. Ideal for small and medium businesses.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Package className="w-8 h-8 text-blue-400"/><span className={`${theme.text.primary} font-semibold`}>Cost savings</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Cpu className="w-8 h-8 text-indigo-400"/><span className={`${theme.text.primary} font-semibold`}>Real-time tracking</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Clock className="w-8 h-8 text-yellow-400"/><span className={`${theme.text.primary} font-semibold`}>Flexible schedules</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><DollarSign className="w-8 h-8 text-green-400"/><span className={`${theme.text.primary} font-semibold`}>Transparent pricing</span></div>
      </div>
      <div className={`${theme.text.secondary} mb-10 max-w-xl text-center`}>Choose LTL if your shipment does not fill the entire truck. Ideal for regular small shipments, e-commerce, B2B.</div>
      <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl text-lg font-semibold hover:scale-105 transition-all mb-10" onClick={() => { onOrder(); window.scrollTo(0,0); }}>Order Now</button>
    </div>
  );

  const RefrigeratedDetailsPage = ({onOrder, theme}: {onOrder: () => void, theme: ThemeType}) => (
    <div className={`pt-32 min-h-screen flex flex-col items-center ${theme.bg.primary}`}>
      <img src={refrigeratedTransportImg} alt="Refrigerated Transport" className="rounded-3xl shadow-2xl mb-10 w-full max-w-3xl object-cover" />
      <h1 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4`}>Refrigerated Transport</h1>
      <h2 className="text-xl text-emerald-400 mb-6">Temperature control, freshness & safety</h2>
      <p className={`text-lg ${theme.text.secondary} max-w-2xl mb-8 text-center`}>Refrigerated transport is for goods that require temperature control. We ensure the safety of perishable foods, pharmaceuticals, and other temperature-sensitive products.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Thermometer className="w-8 h-8 text-emerald-400"/><span className={`${theme.text.primary} font-semibold`}>Temperature control</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Shield className="w-8 h-8 text-green-500"/><span className={`${theme.text.primary} font-semibold`}>Certified drivers</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Cpu className="w-8 h-8 text-indigo-400"/><span className={`${theme.text.primary} font-semibold`}>Real-time tracking</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Box className="w-8 h-8 text-blue-400"/><span className={`${theme.text.primary} font-semibold`}>Cargo safety</span></div>
      </div>
      <div className={`${theme.text.secondary} mb-10 max-w-xl text-center`}>Choose for food, pharmaceuticals, flowers, chemicals, and other temperature-sensitive goods.</div>
      <button className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-lg font-semibold hover:scale-105 transition-all mb-10" onClick={() => { onOrder(); window.scrollTo(0,0); }}>Order Now</button>
    </div>
  );

  const OversizedDetailsPage = ({onOrder, theme}: {onOrder: () => void, theme: ThemeType}) => (
    <div className={`pt-32 min-h-screen flex flex-col items-center ${theme.bg.primary}`}>
      <img src={oversizedCargoImg} alt="Oversized Cargo" className="rounded-3xl shadow-2xl mb-10 w-full max-w-3xl object-cover" />
      <h1 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4`}>Oversized Cargo</h1>
      <h2 className="text-xl text-orange-400 mb-6">Transport of oversized goods</h2>
      <p className={`text-lg ${theme.text.secondary} max-w-2xl mb-8 text-center`}>Oversized cargo transport is for moving large equipment, construction machinery, and other items that exceed standard dimensions. We use special equipment and provide escort services.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Box className="w-8 h-8 text-orange-400"/><span className={`${theme.text.primary} font-semibold`}>Special equipment</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Shield className="w-8 h-8 text-green-500"/><span className={`${theme.text.primary} font-semibold`}>Escort service</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Cpu className="w-8 h-8 text-indigo-400"/><span className={`${theme.text.primary} font-semibold`}>Real-time tracking</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><TrendingUp className="w-8 h-8 text-yellow-400"/><span className={`${theme.text.primary} font-semibold`}>Experienced logistics</span></div>
      </div>
      <div className={`${theme.text.secondary} mb-10 max-w-xl text-center`}>Choose for equipment, machinery, metal structures, and other oversized items.</div>
      <button className="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl text-lg font-semibold hover:scale-105 transition-all mb-10" onClick={() => { onOrder(); window.scrollTo(0,0); }}>Order Now</button>
    </div>
  );

  const ExpeditedDetailsPage = ({onOrder, theme}: {onOrder: () => void, theme: ThemeType}) => (
    <div className={`pt-32 min-h-screen flex flex-col items-center ${theme.bg.primary}`}>
      <img src={expeditedFreightImg} alt="Expedited Freight" className="rounded-3xl shadow-2xl mb-10 w-full max-w-3xl object-cover" />
      <h1 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4`}>Expedited Freight</h1>
      <h2 className="text-xl text-yellow-400 mb-6">Urgent delivery, priority route</h2>
      <p className={`text-lg ${theme.text.secondary} max-w-2xl mb-8 text-center`}>Expedited freight is for urgent shipments. Your cargo is sent on a priority route, with minimal transit time and constant tracking. For businesses where speed is critical.</p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Zap className="w-8 h-8 text-yellow-400"/><span className={`${theme.text.primary} font-semibold`}>Minimal transit time</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Cpu className="w-8 h-8 text-indigo-400"/><span className={`${theme.text.primary} font-semibold`}>Real-time tracking</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Clock className="w-8 h-8 text-orange-400"/><span className={`${theme.text.primary} font-semibold`}>24/7 support</span></div>
        <div className={`${theme.bg.card} rounded-2xl p-6 flex items-center gap-4`}><Shield className="w-8 h-8 text-green-500"/><span className={`${theme.text.primary} font-semibold`}>Security</span></div>
      </div>
      <div className={`${theme.text.secondary} mb-10 max-w-xl text-center`}>Choose if time is critical. For urgent orders, important documents, valuable cargo.</div>
      <button className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-2xl text-lg font-semibold hover:scale-105 transition-all mb-10" onClick={() => { onOrder(); window.scrollTo(0,0); }}>Order Now</button>
    </div>
  );

  const PricingPage = ({ theme }: ThemedPageProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      gradient: 'from-emerald-600 to-teal-600',
      features: [
        { text: 'Up to 50 shipments/month', included: true },
        { text: 'Basic tracking', included: true },
        { text: 'Email support', included: true },
        { text: 'Standard delivery times', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'API access', included: false },
        { text: 'Priority support', included: false },
        { text: 'Custom integrations', included: false }
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Most popular for growing companies',
      monthlyPrice: 599,
      yearlyPrice: 5990,
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop',
      gradient: 'from-violet-600 to-indigo-600',
      popular: true,
      features: [
        { text: 'Up to 500 shipments/month', included: true },
        { text: 'Real-time GPS tracking', included: true },
        { text: 'Priority email & chat support', included: true },
        { text: 'Express delivery options', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom integrations', included: false }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Unlimited power for large operations',
      monthlyPrice: 1499,
      yearlyPrice: 14990,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop',
      gradient: 'from-orange-600 to-red-600',
      features: [
        { text: 'Unlimited shipments', included: true },
        { text: 'AI-powered route optimization', included: true },
        { text: '24/7 phone & chat support', included: true },
        { text: 'Same-day delivery network', included: true },
        { text: 'Custom analytics dashboards', included: true },
        { text: 'Full API access', included: true },
        { text: 'Dedicated success team', included: true },
        { text: 'Custom integrations & features', included: true }
      ]
    }
  ];

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
              <Sparkles className="w-5 h-5 text-violet-600" />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                Simple, Transparent Pricing
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.text.primary} mb-6`}>
              Choose Your <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Perfect Plan</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Scale your shipping operations with flexible pricing that grows with your business
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-4 ${billingCycle === 'monthly' ? theme.text.primary : theme.text.secondary} font-medium`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-16 h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full transition-colors`}
            >
              <div className={`absolute w-7 h-7 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full top-0.5 transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0.5'
              }`}></div>
            </button>
            <span className={`ml-4 ${billingCycle === 'yearly' ? theme.text.primary : theme.text.secondary} font-medium`}>
              Yearly
              <span className="ml-2 text-emerald-500 font-bold">Save 20%</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative ${theme.bg.card} rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'border-violet-600 scale-105 shadow-2xl shadow-violet-500/20' 
                    : `${theme.border.card} hover:border-violet-600/50 hover:scale-105`
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-bl-2xl font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={plan.image}
                    alt={plan.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent`}></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-3xl font-bold text-white">{plan.name}</h3>
                    <p className="text-white/80">{plan.description}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
                      </span>
                      <span className={theme.text.secondary}>
                        /month
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className={`text-sm ${theme.text.secondary} mt-2`}>
                        Billed ${plan.yearlyPrice} yearly
                      </p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? theme.text.primary : theme.text.muted}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/50'
                      : `${theme.bg.input} ${theme.text.primary} hover:scale-105`
                  }`}>
                    {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = ({ theme }: ThemedPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const contactOptions = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Call Us',
      info: '1-800-FREIGHT',
      subInfo: 'Mon-Fri 9am-6pm EST',
      image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop',
      gradient: 'from-violet-600 to-indigo-600'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Us',
      info: 'support@transedge.com',
      subInfo: 'Reply within 24 hours',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Live Chat',
      info: 'Chat with our team',
      subInfo: 'Available 24/7',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop',
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  const offices = [
    {
      city: 'New York',
      address: '123 Broadway, Suite 1000',
      phone: '(212) 555-0123',
      image: 'https://images.unsplash.com/photo-1570744487446-f1ded7d12745?w=600&h=400&fit=crop'
    },
    {
      city: 'Los Angeles',
      address: '456 Sunset Blvd, Floor 15',
      phone: '(310) 555-0456',
      image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&h=400&fit=crop'
    },
    {
      city: 'Chicago',
      address: '789 Michigan Ave, Suite 500',
      phone: '(312) 555-0789',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop'
    }
  ];

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      <section className="relative overflow-hidden pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
              <HeadphonesIcon className="w-5 h-5 text-violet-600" />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                We're Here to Help
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.text.primary} mb-6`}>
              Get in <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Have questions about our services? Our team is ready to help you ship smarter
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactOptions.map((option, index) => (
              <div 
                key={index}
                className={`${theme.bg.card} rounded-3xl overflow-hidden border ${theme.border.card} hover:border-violet-600/50 transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <div className="relative h-48">
                  <img 
                    src={option.image}
                    alt={option.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center`}>
                    <div className="text-white">{option.icon}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${theme.text.primary} mb-2`}>{option.title}</h3>
                  <p className={`text-lg font-semibold ${theme.text.primary}`}>{option.info}</p>
                  <p className={theme.text.secondary}>{option.subInfo}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className={`${theme.bg.card} rounded-3xl p-8 border ${theme.border.card}`}>
              <h2 className={`text-3xl font-bold ${theme.text.primary} mb-8`}>Send Us a Message</h2>

              <form autoComplete="off" onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Company</label>
                  <input
                    type="text"
                    name="company"
                    autoComplete="off"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Subject</label>
                  <select
                    name="subject"
                    autoComplete="off"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Message</label>
                  <textarea
                    name="message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Map */}
            <div className={`${theme.bg.card} rounded-3xl overflow-hidden border ${theme.border.card}`}>
              <div className="relative h-full min-h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
                  alt="Map"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="mb-20">
            <h2 className={`text-4xl font-bold ${theme.text.primary} text-center mb-12`}>
              Our Office Locations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <div key={index} className={`${theme.bg.card} rounded-3xl overflow-hidden border ${theme.border.card} hover:scale-105 transition-transform`}>
                  <div className="relative h-48">
                    <img 
                      src={office.image}
                      alt={office.city}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-bold text-white">{office.city}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <MapPin className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <p className={theme.text.secondary}>{office.address}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-violet-600" />
                      <p className={theme.text.primary}>{office.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


const ScheduleDemoPage = ({ theme }: ThemedPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    companySize: '',
    message: ''
  });

  const demoFeatures = [
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: 'Live Platform Tour',
      description: 'See our real-time tracking and AI features in action'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Personalized Consultation',
      description: 'Get solutions tailored to your business needs'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'ROI Analysis',
      description: 'Discover how much you can save with TransEdge'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security Overview',
      description: 'Learn about our blockchain-powered security'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=600&fit=crop"
            alt="Demo hero"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
              <Rocket className="w-5 h-5 text-violet-600" />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                See TransEdge in Action
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.text.primary} mb-6`}>
              Schedule Your <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Free Demo</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Discover how TransEdge can transform your logistics operations in just 30 minutes
            </p>
          </div>

          {/* Demo Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {demoFeatures.map((feature, index) => (
              <div key={index} className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} hover:scale-105 transition-transform`}>
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold ${theme.text.primary} mb-2`}>{feature.title}</h3>
                <p className={theme.text.secondary}>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Demo Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Form */}
            <div className={`${theme.bg.card} rounded-3xl p-8 border ${theme.border.card}`}>
              <h2 className={`text-3xl font-bold ${theme.text.primary} mb-8`}>Book Your Demo</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Full Name*</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Email*</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Company*</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                    className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Preferred Time</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setFormData({...formData, preferredTime: time})}
                        className={`py-2 rounded-lg transition-all ${
                          formData.preferredTime === time
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                            : `${theme.bg.input} ${theme.text.primary} hover:border-violet-600`
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.text.primary} mb-2`}>Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
                    placeholder="Tell us about your shipping needs..."
                  />
                </div>

                <button className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>

            {/* Right - Image & Info */}
            <div className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden h-96">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                  alt="Demo meeting"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">What to Expect</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>30-minute personalized session</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>One-on-one with logistics expert</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Custom solutions for your needs</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card}`}>
                <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Trusted by Industry Leaders</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`${theme.bg.input} rounded-lg p-4 flex items-center justify-center`}>
                      <Building className="w-8 h-8 text-violet-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Us Page
const AboutUsPage = ({ theme }: ThemedPageProps) => {
  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize logistics' },
    { year: '2021', title: 'AI Integration', description: 'Launched our AI-powered tracking system' },
    { year: '2022', title: 'Nationwide Expansion', description: 'Expanded operations to all 50 states' },
    { year: '2023', title: 'Blockchain Security', description: 'Implemented blockchain for secure transactions' },
    { year: '2024', title: '1M Shipments', description: 'Reached 1 million successful deliveries' },
    { year: '2025', title: 'Industry Leader', description: 'Recognized as the #1 freight platform' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Every decision we make starts with our customers in mind',
      gradient: 'from-red-600 to-pink-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of whats possible',
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Reliability',
      description: 'Building trust through consistent, dependable service',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Teamwork',
      description: 'Together we achieve more than we ever could alone',
      gradient: 'from-violet-600 to-indigo-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Michael Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
      bio: '20+ years in logistics and technology'
    },
    {
      name: 'Sarah Williams',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'AI and blockchain expert'
    },
    {
      name: 'David Chen',
      role: 'COO',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      bio: 'Operations and supply chain specialist'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Passionate about customer experience'
    }
  ];

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop"
            alt="About us hero"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
              <Building className="w-5 h-5 text-violet-600" />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                Our Story
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.text.primary} mb-6`}>
              Transforming <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Logistics</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              We're on a mission to make freight shipping smarter, faster, and more reliable
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} text-center`}>
              <p className="text-4xl font-bold text-violet-600 mb-2">2.5M+</p>
              <p className={theme.text.secondary}>Shipments Delivered</p>
            </div>
            <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} text-center`}>
              <p className="text-4xl font-bold text-indigo-600 mb-2">50,000+</p>
              <p className={theme.text.secondary}>Happy Customers</p>
            </div>
            <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} text-center`}>
              <p className="text-4xl font-bold text-emerald-600 mb-2">50</p>
              <p className={theme.text.secondary}>States Covered</p>
            </div>
            <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} text-center`}>
              <p className="text-4xl font-bold text-orange-600 mb-2">99.8%</p>
              <p className={theme.text.secondary}>On-Time Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className={`py-20 ${theme.bg.secondary}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold ${theme.text.primary} text-center mb-16`}>
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-600 to-indigo-600"></div>
            
            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full border-4 border-white"></div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                    <div className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} hover:scale-105 transition-transform`}>
                      <p className="text-2xl font-bold text-violet-600 mb-2">{milestone.year}</p>
                      <h3 className={`text-xl font-semibold ${theme.text.primary} mb-2`}>{milestone.title}</h3>
                      <p className={theme.text.secondary}>{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className={`py-20 ${theme.bg.primary}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold ${theme.text.primary} text-center mb-16`}>
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`${theme.bg.card} rounded-3xl p-8 border ${theme.border.card} text-center hover:scale-105 transition-transform`}>
                <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                  {value.icon}
                </div>
                <h3 className={`text-2xl font-semibold ${theme.text.primary} mb-3`}>{value.title}</h3>
                <p className={theme.text.secondary}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${theme.bg.secondary}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold ${theme.text.primary} text-center mb-16`}>
            Meet Our Leadership
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`${theme.bg.card} rounded-3xl overflow-hidden border ${theme.border.card} hover:scale-105 transition-transform`}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className={`text-xl font-semibold ${theme.text.primary} mb-1`}>{member.name}</h3>
                  <p className="text-violet-600 font-medium mb-3">{member.role}</p>
                  <p className={`text-sm ${theme.text.secondary}`}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    );
  };

// Careers Page
const CareersPage = ({ theme }: ThemedPageProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision coverage'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Flexible Time Off',
      description: 'Unlimited PTO and flexible work arrangements'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Opportunities',
      description: 'Career development and learning programs'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Competitive Compensation',
      description: 'Top-tier salary and equity packages'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Remote First',
      description: 'Work from anywhere in the world'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Perks & Benefits',
      description: 'Home office setup, gym membership, and more'
    }
  ];

  const openPositions = [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build the future of freight with cutting-edge tech',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote / NYC',
      type: 'Full-time',
      description: 'Create beautiful, intuitive experiences',
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Develop AI solutions for logistics optimization',
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote / LA',
      type: 'Full-time',
      description: 'Help our customers succeed and grow',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Remote / Chicago',
      type: 'Full-time',
      description: 'Drive growth and build relationships',
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: 'Operations Analyst',
      department: 'Operations',
      location: 'Remote',
      type: 'Full-time',
      description: 'Optimize our freight operations',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const departments = ['all', 'Engineering', 'Design', 'Sales', 'Customer Success', 'Operations'];

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop"
            alt="Careers hero"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
              <Rocket className="w-5 h-5 text-violet-600" />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                Join Our Team
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.text.primary} mb-6`}>
              Build the Future of <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Logistics</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Join us in revolutionizing how the world ships goods
            </p>
          </div>

          {/* Why Join Us */}
          <div className="relative rounded-3xl overflow-hidden mb-20">
            <img 
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=400&fit=crop"
              alt="Team"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 to-indigo-900/80"></div>
            <div className="relative z-10 p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Why TransEdge?</h2>
              <p className="text-xl max-w-3xl mx-auto">
                We're not just building a product – we're creating the infrastructure that powers global commerce. 
                Join a team of passionate innovators working on meaningful challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-20 ${theme.bg.secondary}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold ${theme.text.primary} text-center mb-16`}>
            Benefits & Perks
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`${theme.bg.card} rounded-2xl p-6 border ${theme.border.card} hover:scale-105 transition-transform`}>
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-semibold ${theme.text.primary} mb-2`}>{benefit.title}</h3>
                <p className={theme.text.secondary}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className={`py-20 ${theme.bg.primary}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold ${theme.text.primary} text-center mb-8`}>
            Open Positions
          </h2>
          
          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                    : `${theme.bg.card} ${theme.text.primary} hover:border-violet-600`
                }`}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 gap-6">
            {openPositions
              .filter(pos => selectedDepartment === 'all' || pos.department === selectedDepartment)
              .map((position, index) => (
              <div key={index} className={`${theme.bg.card} rounded-3xl p-8 border ${theme.border.card} hover:border-violet-600/50 transition-all hover:scale-105`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center text-violet-600">
                      {position.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${theme.text.primary}`}>{position.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-sm ${theme.text.secondary}`}>{position.department}</span>
                        <span className={`text-sm ${theme.text.secondary}`}>•</span>
                        <span className={`text-sm ${theme.text.secondary}`}>{position.location}</span>
                        <span className={`text-sm ${theme.text.secondary}`}>•</span>
                        <span className={`text-sm ${theme.text.secondary}`}>{position.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className={`${theme.text.secondary} mb-4`}>{position.description}</p>
                <button className="text-violet-600 font-medium hover:text-violet-700 flex items-center space-x-2">
                  <span>View Position</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 ${theme.bg.secondary}`}>
        <div className="container mx-auto px-4">
          <div className={`${theme.bg.card} rounded-3xl p-12 text-center border ${theme.border.card}`}>
            <h2 className={`text-3xl font-bold ${theme.text.primary} mb-4`}>
              Don't See the Right Role?
            </h2>
            <p className={`text-xl ${theme.text.secondary} mb-8 max-w-2xl mx-auto`}>
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300">
              Send Your Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Blog Page
const BlogPage = ({ theme }: ThemedPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Technology', 'Industry News', 'Tips & Guides', 'Company Updates'];

  const blogPosts = [
    {
      title: 'The Future of AI in Freight Logistics',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way we ship goods across the country...',
      category: 'Technology',
      author: 'Sarah Williams',
      date: 'March 15, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      featured: true
    },
    {
      title: '10 Tips for Reducing Shipping Costs',
      excerpt: 'Learn practical strategies to optimize your freight spending without compromising on quality...',
      category: 'Tips & Guides',
      author: 'Michael Johnson',
      date: 'March 12, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop'
    },
    {
      title: 'Blockchain: The New Standard in Shipping Security',
      excerpt: 'How blockchain technology is creating unprecedented levels of security and transparency...',
      category: 'Technology',
      author: 'David Chen',
      date: 'March 10, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop'
    },
    {
      title: 'Q1 2025: Record Breaking Quarter',
      excerpt: 'TransEdge achieves new milestones in shipment volume and customer satisfaction...',
      category: 'Company Updates',
      author: 'Emily Davis',
      date: 'March 8, 2025',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
    },
    {
      title: 'Sustainability in Modern Logistics',
      excerpt: 'Our commitment to reducing carbon footprint while maintaining efficiency...',
      category: 'Industry News',
      author: 'John Smith',
      date: 'March 5, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&h=400&fit=crop'
    },
    {
      title: 'Understanding LTL vs FTL Shipping',
      excerpt: 'A comprehensive guide to choosing the right shipping method for your business...',
      category: 'Tips & Guides',
      author: 'Robert Johnson',
      date: 'March 3, 2025',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=400&fit=crop'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`pt-32 min-h-screen ${theme.bg.primary}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop"
            alt="Blog hero"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl rounded-full mb-8 border border-violet-600/20">
              <BookOpen className="w-5 h-5 text-violet-600" />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                TransEdge Blog
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.text.primary} mb-6`}>
              Insights & <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Updates</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Stay informed about the latest in logistics, technology, and industry trends
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 ${theme.bg.card} rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary} pr-12`}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-600" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                    : `${theme.bg.card} ${theme.text.primary} hover:border-violet-600`
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.filter(p => p.featured)[0] && (
        <section className={`py-20 ${theme.bg.secondary}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl font-bold ${theme.text.primary} mb-8`}>Featured Article</h2>
            {filteredPosts.filter(p => p.featured).map((post, index) => (
              <div key={index} className={`${theme.bg.card} rounded-3xl overflow-hidden border ${theme.border.card} hover:scale-[1.02] transition-transform`}>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-96 md:h-full">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-4 py-1 bg-violet-600/10 text-violet-600 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className={`text-sm ${theme.text.secondary}`}>{post.readTime}</span>
                    </div>
                    <h3 className={`text-3xl font-bold ${theme.text.primary} mb-4`}>{post.title}</h3>
                    <p className={`${theme.text.secondary} mb-6 text-lg`}>{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full"></div>
                        <div>
                          <p className={`font-medium ${theme.text.primary}`}>{post.author}</p>
                          <p className={`text-sm ${theme.text.secondary}`}>{post.date}</p>
                        </div>
                      </div>
                      <button className="text-violet-600 font-medium hover:text-violet-700 flex items-center space-x-2">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className={`py-20 ${theme.bg.primary}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(p => !p.featured).map((post, index) => (
              <article key={index} className={`${theme.bg.card} rounded-3xl overflow-hidden border ${theme.border.card} hover:scale-105 transition-transform`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3`}>{post.title}</h3>
                  <p className={`${theme.text.secondary} mb-4`}>{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full"></div>
                      <div>
                        <p className={`text-sm font-medium ${theme.text.primary}`}>{post.author}</p>
                        <p className={`text-xs ${theme.text.secondary}`}>{post.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm ${theme.text.secondary}`}>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`py-20 ${theme.bg.secondary}`}>
        <div className="container mx-auto px-4">
          <div className={`${theme.bg.card} rounded-3xl p-12 text-center border ${theme.border.card}`}>
            <h2 className={`text-3xl font-bold ${theme.text.primary} mb-4`}>
              Stay Updated
            </h2>
            <p className={`text-xl ${theme.text.secondary} mb-8 max-w-2xl mx-auto`}>
              Get the latest insights and updates delivered straight to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-6 py-3 ${theme.bg.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 ${theme.text.primary}`}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

  // The main application component that renders based on currentPage state
  // Note: The <style jsx> block from the original code is not directly supported
  // in Vite/Next.js TSX files without special configuration.
  // Global styles or CSS Modules are preferred. For this example, keyframes
  // would ideally be moved to a global CSS file (e.g., index.css).
  return (
    <div className={theme.bg.primary}>
      {/* Global styles like keyframes should be in a CSS file imported in main.tsx or index.html */}
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/track" element={<TrackShipmentPageComponent theme={theme} isDarkMode={isDarkMode} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/order" element={<OrderPlacementPage theme={theme} orderStepRef={orderStepRef} orderDataRef={orderDataRef} onOrder={() => navigate('/order')} />} />
        <Route path="/dashboard" element={
          isAuthenticated ? (
            userType === 'user' ? <UserDashboard /> : <AdminDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        <Route path="/ftl-details" element={<FtlDetailsPage onOrder={() => navigate('/order')} theme={theme} />} />
        <Route path="/ltl-details" element={<LtlDetailsPage onOrder={() => navigate('/order')} theme={theme} />} />
        <Route path="/refrigerated-details" element={<RefrigeratedDetailsPage onOrder={() => navigate('/order')} theme={theme} />} />
        <Route path="/oversized-details" element={<OversizedDetailsPage onOrder={() => navigate('/order')} theme={theme} />} />
        <Route path="/expedited-details" element={<ExpeditedDetailsPage onOrder={() => navigate('/order')} theme={theme} />} />
        <Route path="/pricing" element={<PricingPage theme={theme} />} />
        <Route path="/contact" element={<ContactPage theme={theme} />} />
        <Route path="/demo" element={<ScheduleDemoPage theme={theme} />} />
        <Route path="/about" element={<AboutUsPage theme={theme} />} />
        <Route path="/careers" element={<CareersPage theme={theme} />} />
        <Route path="/blog" element={<BlogPage theme={theme} />} />
      </Routes>


      {showLoginModal && <LoginModal />}
      <BookingNotification />

      {/* Typelessity AI Booking Widget */}
      {/* @ts-expect-error - Web Component not recognized by React types */}
      <typelessity-widget
        config-id="b2c3d4e5-f6a7-8901-bcde-f23456789012"
        /* Local:      api-url="http://localhost:3000" */
        /* Production: */ api-url="https://typelessity.vercel.app"
        position="bottom-right"
      />

      <Footer />
    </div>
  );

};

export default TransEdgeFreightApp;
