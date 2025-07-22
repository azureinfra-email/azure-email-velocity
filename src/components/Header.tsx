import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/GetStartedButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, Menu, ChevronDown, ThermometerSun, Calculator, Wrench, AtSign, Globe, UserCircle } from "lucide-react";
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
        <div className="flex items-center justify-between h-14">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={handleLogoClick}
          >
            <div className="p-1.5 bg-primary rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">azureinfra.email</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavigation('features')}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavigation('pricing')}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('comparison')}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Compare
            </button>
            <button 
              onClick={() => handleNavigation('calculator')}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Calculator
            </button>
            
            
            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm focus:outline-none">
                Tools
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <a href="/tools" className="flex items-center gap-2 w-full">
                    <Wrench className="w-4 h-4" />
                    All Tools
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Generators</div>
                </div>
                <DropdownMenuItem asChild>
                  <a href="/tools/username-generator" className="flex items-center gap-2 w-full">
                    <AtSign className="w-4 h-4" />
                    Username Generator
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/tools/domain-generator" className="flex items-center gap-2 w-full">
                    <Globe className="w-4 h-4" />
                    Domain Generator
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/tools/person-generator" className="flex items-center gap-2 w-full">
                    <UserCircle className="w-4 h-4" />
                    Person Generator
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Warmup Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm focus:outline-none">
                Warmup
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <a href="/warmup-guide" className="flex items-center gap-2 w-full">
                    <ThermometerSun className="w-4 h-4" />
                    Warmup Guide
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/warmup-calculator" className="flex items-center gap-2 w-full">
                    <Calculator className="w-4 h-4" />
                    Strategy Planner
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              onClick={() => handleNavigation('guarantee')}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Guarantee
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Contact
            </button>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <a href={siteConfig.contact.calendly} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Book Call
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
            <nav className="flex flex-col gap-3">
              <button 
                onClick={() => handleNavigation('features')}
                className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('pricing')}
                className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('comparison')}
                className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
              >
                Compare
              </button>
              <button 
                onClick={() => handleNavigation('calculator')}
                className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
              >
                Calculator
              </button>
              
              {/* Tools section */}
              <div className="pl-2 border-l-2 border-muted space-y-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">Tools</div>
                <a 
                  href="/tools"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Wrench className="w-4 h-4" />
                  All Tools
                </a>
                <a 
                  href="/tools/username-generator"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AtSign className="w-3 h-3" />
                  Username Generator
                </a>
                <a 
                  href="/tools/domain-generator"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe className="w-3 h-3" />
                  Domain Generator
                </a>
                <a 
                  href="/tools/person-generator"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle className="w-3 h-3" />
                  Person Generator
                </a>
              </div>
              {/* Warmup section */}
              <div className="pl-2 border-l-2 border-muted space-y-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">Warmup Tools</div>
                <a 
                  href="/warmup-guide"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ThermometerSun className="w-4 h-4" />
                  Warmup Guide
                </a>
                <a 
                  href="/warmup-calculator"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calculator className="w-4 h-4" />
                  Strategy Planner
                </a>
              </div>
              
              <button 
                onClick={() => handleNavigation('guarantee')}
                className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
              >
                Guarantee
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
              >
                Contact
              </button>
              <div className="flex flex-col gap-2 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start">
                  Sign In
                </Button>
                <a href={siteConfig.contact.calendly} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="justify-start w-full">
                    Book Call
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