import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/GetStartedButton";
import { Mail, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/config";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle hash-based navigation when component mounts or location changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [location]);

  const handleNavigation = (sectionId: string) => {
    // If we're not on the homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      // Small delay to allow navigation to complete before scrolling
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    } else {
      // We're on homepage, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-primary rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">azureinfra.email</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('features')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavigation('pricing')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('comparison')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Compare
            </button>
            <button 
              onClick={() => handleNavigation('calculator')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Calculator
            </button>
            <a 
              href="/warmup-guide"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Warmup Guide
            </a>
            <button 
              onClick={() => handleNavigation('guarantee')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Guarantee
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">
              Sign In
            </Button>
            <a href={siteConfig.contact.calendly} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Book a Call
              </Button>
            </a>
            <GetStartedButton compact />
          </div>
          
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => handleNavigation('features')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('pricing')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('comparison')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Compare
              </button>
              <button 
                onClick={() => handleNavigation('calculator')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Calculator
              </button>
              <a 
                href="/warmup-guide"
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Warmup Guide
              </a>
              <button 
                onClick={() => handleNavigation('guarantee')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Guarantee
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Contact
              </button>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <a href={siteConfig.contact.calendly} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="justify-start w-full">
                    Book a Call
                  </Button>
                </a>
                <GetStartedButton className="justify-start" compact />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;