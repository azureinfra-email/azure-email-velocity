import { Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/config";
import ReleaseInfoDisplay from "./ReleaseInfoDisplay";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">{siteConfig.domain}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.footer.product.map((item, index) => (
                <li key={index}>
                  {item.link ? (
                    <a 
                      href={item.link}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button 
                      onClick={() => handleNavigation(item.id)}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.footer.company.map((item, index) => (
                <li key={index}>
                  {item.link ? (
                    <a 
                      href={item.link}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button 
                      onClick={() => handleNavigation(item.id!)}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-muted-foreground text-sm">
              {siteConfig.company.copyright}
            </p>
            <ReleaseInfoDisplay />
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link 
              to={siteConfig.links.privacyPolicy}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to={siteConfig.links.termsOfService}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to={siteConfig.links.refundPolicy}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;