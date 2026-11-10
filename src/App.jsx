
import React, { useState, useEffect } from 'react';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import NotFound from './pages/NotFound';

import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Leads from './admin/Leads';
import LeadDetail from './admin/LeadDetail';
import ManageGallery from './admin/ManageGallery';
import ManageServices from './admin/ManageServices';

const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const navigate = (url) => {
    window.history.pushState({}, '', url);
    setPath(url);
    window.scrollTo(0, 0);
  };

  const isAdmin = path.startsWith('/admin');

  const routes = {
    '/': <Home navigate={navigate} />,
    '/about': <About navigate={navigate} />,
    '/services': <Services navigate={navigate} />,
    '/portfolio': <Portfolio navigate={navigate} />,
    '/contact': <Contact navigate={navigate} />,
    '/thank-you': <ThankYou navigate={navigate} />,

    '/admin/login': <AdminLogin navigate={navigate} />,
    '/admin/dashboard': <Dashboard navigate={navigate} />,
    '/admin/leads': <Leads navigate={navigate} />,
    '/admin/gallery': <ManageGallery navigate={navigate} />,
    '/admin/services': <ManageServices navigate={navigate} />,
  };

  const isLeadDetail = path.startsWith('/admin/leads/');

  let currentPage = routes[path];

  if (isLeadDetail) {
    const leadId = path.split('/').pop();
    currentPage = (
      <LeadDetail
        leadId={leadId}
        navigate={navigate}
      />
    );
  }

  return (
    <>
      {!isAdmin && (
        <Navbar navigate={navigate} />
      )}

      <main>
        {currentPage || <NotFound navigate={navigate} />}
      </main>

      {!isAdmin && <Footer navigate={navigate} />}
    </>
  );
};

export default App;
