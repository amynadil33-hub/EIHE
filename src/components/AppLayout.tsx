import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { 
  Menu, X, GraduationCap, User, LogOut, MapPin, Phone, Mail, 
  Facebook, Instagram, Twitter, Linkedin, ArrowRight, Clock,
  Users, Award, BookOpen, Calendar, TrendingUp, Globe, CheckCircle,
  Search, Filter, FileText, CreditCard, ArrowLeft, Lock, AlertCircle,
  Send, MessageSquare, Download, ChevronRight, Edit, Save, Home
} from 'lucide-react';

// Types
interface Course {
  id: string;
  course_name: string;
  level: string;
  duration: string;
  description: string;
  fee: number;
  image_url?: string;
}

interface Student {
  id: string;
  full_name: string;
  email: string;
  eihe_email: string;
  phone: string;
  address: string;
}

interface Enrollment {
  id: string;
  course_id: string;
  enrolled_at: string;
  status: string;
  course: Course;
}

interface CourseMaterial {
  id: string;
  title: string;
  description: string;
  file_url: string;
  material_type: string;
  created_at: string;
}

// Constants
const HERO_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/6958b9ec47f082981aba9c49_1767422557085_79d1ce6f.jpg';
const CAMPUS_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/6958b9ec47f082981aba9c49_1767422594756_f64869f4.png';
const TESTIMONIAL_IMAGES = [
  'https://d64gsuwffb70l.cloudfront.net/6958b9ec47f082981aba9c49_1767422575605_87945d89.png',
  'https://d64gsuwffb70l.cloudfront.net/6958b9ec47f082981aba9c49_1767422571828_5807446a.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6958b9ec47f082981aba9c49_1767422573840_3faca86c.jpg',
];

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', path: '/', hash: '' },
    { name: 'Courses', path: '/', hash: '#courses' },
    { name: 'Apply & Payment', path: '/', hash: '#apply' },
    { name: 'Contact', path: '/', hash: '#contact' },
  ];

  const scrollToSection = (hash: string) => {
    setIsMenuOpen(false);
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => scrollToSection('')} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-amber-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-blue-900 leading-tight">EIHE</h1>
              <p className="text-xs text-gray-600">Everyone's Institute</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.hash)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                <button onClick={() => scrollToSection('#portal')} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  <span>Lifelong Learning Portal</span>
                </button>
                <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button onClick={() => scrollToSection('#login')} className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all shadow-md hover:shadow-lg">
                <User className="w-4 h-4" />
                <span>Lifelong Learning Portal</span>
              </button>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => scrollToSection(link.hash)} className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 text-left">
                  {link.name}
                </button>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100">
                {user ? (
                  <>
                    <button onClick={() => scrollToSection('#portal')} className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-blue-900 hover:bg-blue-50 rounded-lg w-full">
                      <User className="w-4 h-4" />
                      <span>Lifelong Learning Portal</span>
                    </button>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg w-full">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => scrollToSection('#login')} className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white text-sm font-medium rounded-lg w-full">
                    <User className="w-4 h-4" />
                    <span>Lifelong Learning Portal</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  const quickLinks = [
    { name: 'Home', hash: '' },
    { name: 'Courses', hash: '#courses' },
    { name: 'Apply Now', hash: '#apply' },
    { name: 'Contact Us', hash: '#contact' },
    { name: 'Lifelong Learning Portal', hash: '#portal' },
  ];

  const programs = ['English Language', 'Business Administration', 'Information Technology', 'Hospitality Management', 'Healthcare Administration', 'Project Management'];

  const scrollToSection = (hash: string) => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-blue-900" />
              </div>
              <div>
                <h3 className="text-lg font-bold">EIHE</h3>
                <p className="text-xs text-blue-200">Everyone's Institute</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Celebrating 24 years of excellence in education. Since 2001, we have proudly served over 14,000 students.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-blue-800/50 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button onClick={() => scrollToSection(link.hash)} className="text-blue-200 hover:text-white flex items-center group transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Our Programs</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program}>
                  <button onClick={() => scrollToSection('#courses')} className="text-blue-200 hover:text-white flex items-center group transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {program}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200 text-sm">125 Kaneeru Magu, Hithadhoo, Addu City, Maldives</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="flex flex-col">
                  <a href="tel:+9607333880" className="text-blue-200 hover:text-white text-sm transition-colors">7333880</a>
                  <a href="tel:+9607483338" className="text-blue-200 hover:text-white text-sm transition-colors">7483338</a>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:eihe@everyones.com.mv" className="text-blue-200 hover:text-white text-sm transition-colors">eihe@everyones.com.mv</a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-800/30 rounded-lg">
              <h5 className="text-sm font-semibold text-amber-400 mb-2">Office Hours</h5>
              <p className="text-blue-200 text-sm">Sunday - Thursday<br />8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-300 text-sm">© 2025 Everyone's Institute of Higher Education. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Hero Section
function HeroSection() {
  const stats = [
    { icon: Users, value: '14,000+', label: 'Students Served' },
    { icon: Calendar, value: '24', label: 'Years of Excellence' },
    { icon: BookOpen, value: '12+', label: 'Programs Offered' },
    { icon: Award, value: '98%', label: 'Success Rate' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-blue-950/80"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full mb-6">
            <Award className="w-4 h-4 text-amber-400 mr-2" />
            <span className="text-amber-300 text-sm font-medium">Celebrating 24 Years of Excellence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Everyone's Institute of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Higher Education</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            From 2001 to 2025, we have proudly served over 14,000 students, empowering them to transform their lives through education. Join our vibrant learning community in the Maldives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-blue-900 font-semibold rounded-lg hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              View Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              Apply Now
            </button>
            <a href="https://linktr.ee/eiheonline" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              Join Live Class
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 sm:px-6 lg:px-8 hidden lg:block">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-xl p-6 text-center transform hover:-translate-y-1 transition-transform">
                <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="py-20 lg:pt-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Journey of Excellence</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>In 2001, we began as <strong>Everyone's Learning Center (ELC)</strong>, with a mission to teach English to adults. Responding to the requests of our students, we soon expanded to include classes for their children, creating a vibrant and inclusive learning community for both adults and young learners.</p>
              <p>Over time, our growth led to the establishment of <strong>Everyone's Institute of Higher Education (EIHE)</strong>. With a renewed vision to guide adults toward academic excellence and foster lifelong learning, we have become a trusted institution for personal and professional growth.</p>
              <p className="text-lg font-medium text-blue-900">From 2001 to 2025, we have proudly served over 14,000 students, empowering them to transform their lives through education.</p>
            </div>
            <div className="mt-8 flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">2001</div>
                <div className="text-sm text-gray-500">Founded</div>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-amber-500 to-blue-900 rounded"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">2025</div>
                <div className="text-sm text-gray-500">24 Years</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={CAMPUS_IMAGE} alt="EIHE Campus" className="rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold">14,000+</div>
              <div className="text-blue-200">Students Empowered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  const whyChoose = [
    { icon: GraduationCap, title: 'Expert Faculty', description: 'Learn from experienced educators dedicated to your success' },
    { icon: Globe, title: 'Recognized Qualifications', description: 'Earn certificates and diplomas valued by employers' },
    { icon: Clock, title: 'Flexible Learning', description: 'Study at your own pace with flexible schedules' },
    { icon: TrendingUp, title: 'Career Support', description: 'Get guidance and support for your career advancement' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Choose EIHE?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of successful graduates who have transformed their careers through our quality education</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChoose.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Courses Section
function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const levels = ['all', 'Certificate', 'Advanced Certificate', 'Diploma', 'Advanced Diploma'];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }
    setFilteredCourses(filtered);
  }, [searchQuery, selectedLevel, courses]);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*').eq('status', 'active').order('course_name');
    if (!error && data) {
      setCourses(data);
      setFilteredCourses(data);
    }
    setLoading(false);
  };

  return (
    <section id="courses" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-amber-600 mr-2" />
            <span className="text-amber-700 text-sm font-medium">Explore Our Programs</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Courses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our comprehensive range of certificate and diploma programs designed to advance your career</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="pl-12 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer min-w-[200px]">
              {levels.map((level) => (
                <option key={level} value={level}>{level === 'all' ? 'All Levels' : level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-6">Showing {filteredCourses.length} of {courses.length} courses</div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                <div className="h-32 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center relative overflow-hidden">
                  <GraduationCap className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{course.level}</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">{course.course_name}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">{course.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div>
                      <span className="text-xs text-gray-500">Course Fee</span>
                      <div className="text-2xl font-bold text-blue-900">MVR {course.fee.toLocaleString()}</div>
                    </div>
                    <button onClick={() => {
                      const applySection = document.querySelector('#apply');
                      if (applySection) {
                        applySection.scrollIntoView({ behavior: 'smooth' });
                        // Set the course in the apply form
                        setTimeout(() => {
                          const event = new CustomEvent('selectCourse', { detail: course });
                          window.dispatchEvent(event);
                        }, 500);
                      }
                    }} className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-blue-900 text-sm font-semibold rounded-lg hover:from-amber-400 hover:to-amber-300 transition-all shadow-md hover:shadow-lg">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Apply Section
function ApplySection() {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', address: '', courseId: '' });
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [authData, setAuthData] = useState({ email: '', password: '', confirmPassword: '' });
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);

  useEffect(() => {
    fetchCourses();
    checkAuth();
    
    // Listen for course selection from courses section
    const handleSelectCourse = (e: CustomEvent) => {
      const course = e.detail;
      setSelectedCourse(course);
      setFormData(prev => ({ ...prev, courseId: course.id }));
    };
    window.addEventListener('selectCourse', handleSelectCourse as EventListener);
    return () => window.removeEventListener('selectCourse', handleSelectCourse as EventListener);
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    if (session?.user) setAuthData(prev => ({ ...prev, email: session.user.email || '' }));
  };

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').eq('status', 'active').order('course_name');
    if (data) setCourses(data);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.courseId) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.from('applications').insert({
      full_name: formData.fullName, email: formData.email, phone: formData.phone,
      address: formData.address, course_id: formData.courseId, status: 'pending'
    }).select().single();
    if (error) { toast.error('Failed to submit application'); setSubmitting(false); return; }
    setApplicationId(data.id);
    setAuthData(prev => ({ ...prev, email: formData.email }));
    toast.success('Application submitted!');
    setStep(2);
    setSubmitting(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (authMode === 'register') {
      if (authData.password !== authData.confirmPassword) { toast.error('Passwords do not match'); setSubmitting(false); return; }
      const { data, error } = await supabase.auth.signUp({ email: authData.email, password: authData.password });
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      setUser(data.user);
      toast.success('Account created!');
      setStep(3);
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email: authData.email, password: authData.password });
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      setUser(data.user);
      toast.success('Logged in!');
      setStep(3);
    }
    setSubmitting(false);
  };

  const handlePayment = async () => {
    if (!selectedCourse || !applicationId || !user) {
      toast.error('Missing application or login details');
      return;
    }

    if (!paymentSlip) {
      toast.error('Please upload your payment slip');
      return;
    }

    setSubmitting(true);

    const fileExt = paymentSlip.name.split('.').pop();
    const fileName = `${user.id}-${applicationId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('payment-slips')
      .upload(fileName, paymentSlip);

    if (uploadError) {
      toast.error('Failed to upload payment slip');
      setSubmitting(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('payment-slips')
      .getPublicUrl(fileName);
    
    const { data: studentData, error: studentError } = await supabase.from('students').insert({
      user_id: user.id, full_name: formData.fullName, email: formData.email,
      phone: formData.phone, address: formData.address,
      eihe_email: `${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@eihe.edu.mv`
    }).select().single();

    let student = studentData;
    if (studentError) {
      const { data: existing } = await supabase.from('students').select('*').eq('user_id', user.id).single();
      if (!existing) { toast.error('Failed to create student record'); setSubmitting(false); return; }
      student = existing;
    }

    const { error: paymentError } = await supabase.from('payments').insert({
      student_id: student?.id,
      application_id: applicationId,
      course_id: selectedCourse.id,
      amount: selectedCourse.fee,
      status: 'pending_verification',
      payment_method: 'bank_transfer',
      slip_url: publicUrlData.publicUrl,
      payment_ref: `SLIP-${Date.now()}`
    });

    if (paymentError) {
      toast.error('Failed to submit payment slip');
      setSubmitting(false);
      return;
    }

    await supabase.from('applications').update({ status: 'payment_submitted' }).eq('id', applicationId);

    toast.success('Payment slip submitted. EIHE will verify and contact you.');
    setStep(4);
    setSubmitting(false);
  };

  const steps = [
    { number: 1, title: 'Application', icon: FileText },
    { number: 2, title: 'Account', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Complete', icon: CheckCircle },
  ];

  return (
    <section id="apply" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Apply Now</h2>
          <p className="text-lg text-gray-600">Start your journey with EIHE today</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= s.number ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > s.number ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${step >= s.number ? 'text-blue-900' : 'text-gray-500'}`}>{s.title}</span>
                {index < steps.length - 1 && <div className={`w-12 sm:w-24 h-1 mx-2 sm:mx-4 rounded ${step > s.number ? 'bg-blue-900' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Application Form</h3>
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                  <select name="courseId" value={formData.courseId} onChange={(e) => { setFormData(prev => ({ ...prev, courseId: e.target.value })); setSelectedCourse(courses.find(c => c.id === e.target.value) || null); }} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose a course...</option>
                    {courses.map((course) => (<option key={course.id} value={course.id}>{course.course_name} - MVR {course.fee.toLocaleString()}</option>))}
                  </select>
                </div>
                {selectedCourse && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-900">{selectedCourse.course_name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedCourse.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-blue-700">{selectedCourse.level}</span>
                      <span className="text-gray-500">{selectedCourse.duration}</span>
                      <span className="font-semibold text-blue-900">MVR {selectedCourse.fee.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} required placeholder="Enter your full name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required placeholder="+960 xxx xxxx" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input type="text" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Your address" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center">
                  {submitting ? 'Submitting...' : 'Continue to Account Setup'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{authMode === 'register' ? 'Create Your Account' : 'Login to Your Account'}</h3>
              <p className="text-gray-600 mb-6">{authMode === 'register' ? 'Create an account to proceed with payment' : 'Login to continue with your payment'}</p>
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${authMode === 'register' ? 'bg-white text-blue-900 shadow' : 'text-gray-600'}`}>Create Account</button>
                <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${authMode === 'login' ? 'bg-white text-blue-900 shadow' : 'text-gray-600'}`}>Login</button>
              </div>
              <form onSubmit={handleAuth} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" value={authData.email} onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))} required placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" value={authData.password} onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))} required placeholder="Enter password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                {authMode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input type="password" value={authData.confirmPassword} onChange={(e) => setAuthData(prev => ({ ...prev, confirmPassword: e.target.value }))} required placeholder="Confirm password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center">
                    <ArrowLeft className="w-5 h-5 mr-2" />Back
                  </button>
                  <button type="submit" disabled={submitting} className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center">
                    {submitting ? 'Processing...' : authMode === 'register' ? 'Create Account' : 'Login'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && selectedCourse && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Payment</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-600">Course</span><span className="font-medium">{selectedCourse.course_name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Duration</span><span>{selectedCourse.duration}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Level</span><span>{selectedCourse.level}</span></div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-blue-900">MVR {selectedCourse.fee.toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Bank Transfer Details</h4>
                <p className="text-sm text-gray-700">Please transfer the course fee and upload your payment slip below.</p>
                <p className="text-sm text-gray-700 mt-2"><strong>BML Account No:</strong> 7730000203541</p>
                <p className="text-sm text-gray-700"><strong>Account Name:</strong> Everyone's Institute of Higher Education (EIHE)</p>
                <p className="text-sm text-gray-700"><strong>Contact:</strong> 7333880</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">Verification Required</h4>
                    <p className="text-sm text-amber-700 mt-1">After you submit your payment slip, EIHE will verify your payment and contact you. Course portal access will be activated only after EIHE confirms the payment.</p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Payment Slip *</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setPaymentSlip(e.target.files?.[0] || null)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                />
                {paymentSlip && <p className="text-sm text-green-700 mt-2">Selected: {paymentSlip.name}</p>}
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center">
                  <ArrowLeft className="w-5 h-5 mr-2" />Back
                </button>
                <button onClick={handlePayment} disabled={submitting} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-blue-900 font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center">
                  {submitting ? 'Submitting...' : 'Submit Payment Slip'}
                  <CreditCard className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Payment Slip Submitted!</h3>
              <p className="text-gray-600 mb-6">Your application and payment slip for the selected course have been submitted.</p>
              <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                <h4 className="font-semibold text-blue-900 mb-3">What's Next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />EIHE has received your application and payment slip</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />EIHE will verify your payment and contact you</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Course materials will be activated in your Lifelong Learning Portal after verification</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => document.querySelector('#portal')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg flex items-center justify-center">
                  Go to Lifelong Learning Portal<ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button onClick={() => { setStep(1); setFormData({ fullName: '', email: '', phone: '', address: '', courseId: '' }); setSelectedCourse(null); setPaymentSlip(null); }} className="px-8 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg">
                  Apply for Another Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { toast.error('Please fill in all required fields'); return; }
    setSubmitting(true);
    const { error } = await supabase.from('contact_submissions').insert({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message });
    if (error) { toast.error('Failed to send message'); setSubmitting(false); return; }
    toast.success('Message sent successfully!');
    setSubmitted(true);
    setSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['125 Kaneeru Magu, Hithadhoo, Addu City, Maldives'] },
    { icon: Phone, title: 'Call Us', details: ['7333880', '7483338'] },
    { icon: Mail, title: 'Email Us', details: ['eihe@everyones.com.mv'] },
    { icon: Clock, title: 'Office Hours', details: ['Sunday - Thursday', '8:00 AM - 5:00 PM'] }
  ];

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-amber-600 mr-2" />
            <span className="text-amber-700 text-sm font-medium">Get in Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Have questions? We're here to help.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">{info.title}</h3>
              {info.details.map((detail, i) => (
                info.title === 'Call Us' ? (
                  <a key={i} href={i === 0 ? 'tel:+9607333880' : 'tel:+9607483338'} className="block text-gray-600 hover:text-blue-900 text-sm transition-colors">{detail}</a>
                ) : (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h4>
                <p className="text-green-700 mb-4">Thank you for contacting us. We'll get back to you within 24-48 hours.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="text-green-700 font-medium hover:text-green-800 underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required placeholder="Enter your name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label><input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Subject</label><input type="text" value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))} placeholder="What is this about?" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Message *</label><textarea value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} required rows={6} placeholder="How can we help you?" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"></textarea></div>
                <button type="submit" disabled={submitting} className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center">
                  {submitting ? 'Sending...' : 'Send Message'}<Send className="w-5 h-5 ml-2" />
                </button>
              </form>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Find Us</h3>
            <div className="bg-gray-100 rounded-xl overflow-hidden h-[400px]">
              <iframe src="https://www.google.com/maps?q=125%20Kaneeru%20Magu%2C%20Hithadhoo%2C%20Addu%20City%2C%20Maldives&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="EIHE Location"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Lifelong Learning Portal Section
function StudentPortalSection() {
  const [user, setUser] = useState<any>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authData, setAuthData] = useState({ email: '', password: '', confirmPassword: '', fullName: '' });
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) fetchStudentData();
  }, [user]);

  useEffect(() => {
    if (selectedCourse) fetchCourseMaterials(selectedCourse);
  }, [selectedCourse]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };

  const fetchStudentData = async () => {
    const { data: studentData } = await supabase.from('students').select('*').eq('user_id', user.id).single();
    if (studentData) {
      setStudent(studentData);
      const { data: enrollmentData } = await supabase.from('enrollments').select(`*, course:courses(*)`).eq('student_id', studentData.id);
      if (enrollmentData) {
        setEnrollments(enrollmentData);
        if (enrollmentData.length > 0) setSelectedCourse(enrollmentData[0].course_id);
      }
    }
    setLoading(false);
  };

  const fetchCourseMaterials = async (courseId: string) => {
    const { data } = await supabase.from('course_materials').select('*').eq('course_id', courseId).order('created_at', { ascending: false });
    if (data) setMaterials(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: authData.email, password: authData.password });
    if (error) { toast.error(error.message); setAuthLoading(false); return; }
    setUser(data.user);
    toast.success('Welcome back!');
    setAuthLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authData.password !== authData.confirmPassword) { toast.error('Passwords do not match'); return; }
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signUp({ email: authData.email, password: authData.password });
    if (error) { toast.error(error.message); setAuthLoading(false); return; }
    toast.success('Account created! Please enroll in a course to access the portal.');
    setAuthMode('login');
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setStudent(null);
    setEnrollments([]);
  };

  if (loading) {
    return (
      <section id="portal" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  // Login/Register Form
  if (!user) {
    return (
      <section id="login" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-20">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-9 h-9 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Lifelong Learning Portal</h2>
            <p className="text-gray-600 mt-1">Everyone's Institute of Higher Education</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${authMode === 'login' ? 'bg-white text-blue-900 shadow' : 'text-gray-600'}`}>Login</button>
              <button onClick={() => setAuthMode('register')} className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${authMode === 'register' ? 'bg-white text-blue-900 shadow' : 'text-gray-600'}`}>Register</button>
            </div>
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" value={authData.email} onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))} required placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><input type="password" value={authData.password} onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))} required placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <button type="submit" disabled={authLoading} className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center">
                  {authLoading ? 'Signing in...' : 'Sign In'}<ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" value={authData.email} onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))} required placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><input type="password" value={authData.password} onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))} required placeholder="Create a password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label><input type="password" value={authData.confirmPassword} onChange={(e) => setAuthData(prev => ({ ...prev, confirmPassword: e.target.value }))} required placeholder="Confirm your password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-sm text-blue-700">To enroll in courses, please use the <button onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })} className="font-medium underline">Apply section</button> which includes the complete enrollment process.</p>
                </div>
                <button type="submit" disabled={authLoading} className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center">
                  {authLoading ? 'Creating account...' : 'Create Account'}<ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // No student profile
  if (!student) {
    return (
      <section id="portal" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Student Profile Found</h2>
            <p className="text-gray-500 mb-6">You need to enroll in a course to access the lifelong learning portal.</p>
            <button onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg">
              Apply for a Course<ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Lifelong Learning Portal Dashboard
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <section id="portal" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-t-2xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome, {student.full_name}</h2>
              <p className="text-blue-200 mt-1">{student.eihe_email || student.email}</p>
            </div>
            <button onClick={handleLogout} className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </button>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200">
          <nav className="flex space-x-1 overflow-x-auto px-4">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <tab.icon className="w-4 h-4 mr-2" />{tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div><p className="text-gray-500 text-sm">Enrolled Courses</p><p className="text-3xl font-bold text-blue-900 mt-1">{enrollments.length}</p></div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><BookOpen className="w-6 h-6 text-blue-600" /></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div><p className="text-gray-500 text-sm">Active Courses</p><p className="text-3xl font-bold text-green-600 mt-1">{enrollments.filter(e => e.status === 'active').length}</p></div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><Award className="w-6 h-6 text-green-600" /></div>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div><p className="text-gray-500 text-sm">Materials Available</p><p className="text-3xl font-bold text-amber-600 mt-1">{materials.length}</p></div>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-amber-600" /></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">My Courses</h3>
                {enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No courses enrolled yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrollments.map((enrollment) => (
                      <div key={enrollment.id} className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-900">{enrollment.course.course_name}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center"><Award className="w-4 h-4 mr-1" />{enrollment.course.level}</span>
                              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{enrollment.course.duration}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${enrollment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{enrollment.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="bg-gray-50 rounded-xl overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="p-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${enrollment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{enrollment.status}</span>
                    <h3 className="font-semibold text-blue-900 mt-3">{enrollment.course.course_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{enrollment.course.level}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1" />{enrollment.course.duration}</span>
                      <button onClick={() => { setSelectedCourse(enrollment.course_id); setActiveTab('materials'); }} className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
                        View Materials<ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'materials' && (
            <div>
              {enrollments.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                  <select value={selectedCourse || ''} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg">
                    {enrollments.map((enrollment) => (<option key={enrollment.course_id} value={enrollment.course_id}>{enrollment.course.course_name}</option>))}
                  </select>
                </div>
              )}
              {materials.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No materials available yet</p>
                  <p className="text-sm text-gray-400 mt-1">Materials will be uploaded by your instructor</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {materials.map((material) => (
                    <div key={material.id} className="bg-gray-50 rounded-lg p-4 flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{material.title}</h4>
                          {material.description && <p className="text-sm text-gray-500 mt-1">{material.description}</p>}
                          <p className="text-xs text-gray-400 mt-2">Added: {new Date(material.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {material.file_url && (
                        <a href={material.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Download className="w-4 h-4 mr-1" />Download
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{student.full_name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-blue-900">{student.full_name}</h3>
                  <p className="text-gray-500">Student</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div><p className="text-xs text-gray-500">Email</p><p className="text-gray-900">{student.email}</p></div>
                </div>
                {student.eihe_email && (
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-500 mr-3" />
                    <div><p className="text-xs text-blue-600">EIHE Email</p><p className="text-blue-900 font-medium">{student.eihe_email}</p></div>
                  </div>
                )}
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div><p className="text-xs text-gray-500">Phone</p><p className="text-gray-900">{student.phone || 'Not provided'}</p></div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div><p className="text-xs text-gray-500">Address</p><p className="text-gray-900">{student.address || 'Not provided'}</p></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    { name: 'Ahmed Hassan', role: 'Business Administration Graduate', image: TESTIMONIAL_IMAGES[0], quote: 'EIHE transformed my career. The practical knowledge I gained helped me secure a management position within months of graduating.' },
    { name: 'Fathimath Ali', role: 'IT Certificate Graduate', image: TESTIMONIAL_IMAGES[1], quote: 'The supportive environment and quality education at EIHE gave me the confidence to pursue my dreams in technology.' },
    { name: 'Ibrahim Mohamed', role: 'Hospitality Management Student', image: TESTIMONIAL_IMAGES[2], quote: 'The hands-on approach and industry connections have been invaluable for my career in the tourism sector.' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Student Success Stories</h2>
          <p className="text-lg text-gray-600">Hear from our graduates about their EIHE experience</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 rounded-full mb-4">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-amber-300 text-sm font-medium">Admissions Open</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Journey Today</h2>
            <p className="text-blue-200 text-lg max-w-xl">Join our January 2026 intake and take the first step towards transforming your future</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-blue-900 font-semibold rounded-lg shadow-lg">
              Apply Now<ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main AppLayout Component
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <CoursesSection />
        <ApplySection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
        <StudentPortalSection />
      </main>
      <Footer />
    </div>
  );
}
