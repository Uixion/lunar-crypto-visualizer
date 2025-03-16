
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen navy-gradient-bg flex items-center justify-center py-8 px-4">
      <div className="glass-card rounded-2xl p-12 text-center max-w-md animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-crypto-accent/20 flex items-center justify-center">
          <span className="text-5xl font-bold text-crypto-accent">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 glow-text">Page Not Found</h1>
        <p className="text-lg text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-crypto-accent rounded-xl text-white font-medium hover:bg-opacity-90 transition-smooth"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
