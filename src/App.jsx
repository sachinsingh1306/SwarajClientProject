
import { useEffect, useState } from "react";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Leads from "./admin/Leads";
import LeadDetail from "./admin/LeadDetail";
import ManageGallery from "./admin/ManageGallery";
import ManageServices from "./admin/ManageServices";
import ManageSettings from "./admin/ManageSettings";

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname + window.location.search
  );

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(
        window.location.pathname + window.location.search
      );
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const pathname = currentPath.split("?")[0];

  const isAdmin = pathname.startsWith("/admin");

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
  };

  let page;

  if (pathname.startsWith("/admin/leads/")) {
    const leadId = pathname.split("/").pop();

    page = (
      <LeadDetail
        navigate={navigate}
        leadId={leadId}
      />
    );
  } else {
    page = routes[pathname] || <NotFound navigate={navigate} />;
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
