
import { useEffect, useState } from "react";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

// Common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Admin pages
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Leads from "./admin/Leads";
import LeadDetail from "./admin/LeadDetail";
import ManageGallery from "./admin/ManageGallery";
import ManageServices from "./admin/ManageServices";
import ManageSettings from "./admin/ManageSettings";
import ManageTestimonials from "./admin/ManageTestimonials";

const getCurrentPath = () => {
  return window.location.pathname;
};

function App() {
  const [pathname, setPathname] = useState(getCurrentPath());

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getCurrentPath());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setPathname(getCurrentPath());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const routes = {
    "/": <Home navigate={navigate} />,
    "/about": <About navigate={navigate} />,
    "/services": <Services navigate={navigate} />,
    "/portfolio": <Portfolio navigate={navigate} />,
    "/portfolio/detail": <PortfolioDetail navigate={navigate} />,
    "/contact": <Contact navigate={navigate} />,
    "/thank-you": <ThankYou navigate={navigate} />,

    "/admin/login": <AdminLogin navigate={navigate} />,
    "/admin/dashboard": <Dashboard navigate={navigate} />,
    "/admin/leads": <Leads navigate={navigate} />,
    "/admin/gallery": <ManageGallery navigate={navigate} />,
    "/admin/services": <ManageServices navigate={navigate} />,
    "/admin/settings": <ManageSettings navigate={navigate} />,
    "/admin/testimonials": <ManageTestimonials navigate={navigate} />,
  };

  const isAdmin = pathname.startsWith("/admin");

  let page = routes[pathname];

  // Dynamic lead detail route
  if (!page && pathname.startsWith("/admin/leads/")) {
    const leadId = pathname.split("/admin/leads/")[1];

    page = (
      <LeadDetail
        leadId={leadId}
        navigate={navigate}
      />
    );
  }

  if (!page) {
    page = <NotFound navigate={navigate} />;
  }

  return (
    <>
      {!isAdmin && <Navbar navigate={navigate} />}

      <main>{page}</main>

      {!isAdmin && <Footer navigate={navigate} />}
    </>
  );
}

export default App;
