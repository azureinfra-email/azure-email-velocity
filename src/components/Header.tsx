import { Button } from "@/components/ui/button";
import { Mail, Menu } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/config";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">azureinfra.email</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('comparison')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Compare
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
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
            <Button>
              Get Started
            </Button>
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
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('comparison')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Compare
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
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
                <Button className="justify-start">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;