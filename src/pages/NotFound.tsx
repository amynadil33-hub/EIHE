import { Link } from "react-router-dom";
import { Home, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center px-4 py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-8">
          <GraduationCap className="w-12 h-12 text-amber-400" />
        </div>
        <h1 className="text-8xl font-bold text-blue-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg">
          <Home className="w-5 h-5 mr-2" />Go to Homepage
        </Link>
      </div>
    </div>
  );
}
