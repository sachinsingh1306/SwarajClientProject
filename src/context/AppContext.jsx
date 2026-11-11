
import {
  createContext,
  useContext,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const defaultServices = [
  {
    id: "service-1",
    title: "Wedding Photography",
    description: "Beautiful moments captured forever.",
    price: "",
    category: "Wedding",
  },
  {
    id: "service-2",
    title: "Event Photography",
    description: "Professional photography for special events.",
    price: "",
    category: "Event",
  },
  {
    id: "service-3",
    title: "Portrait Photography",
    description: "Creative and professional portraits.",
    price: "",
    category: "Portrait",
  },
];

const defaultSettings = {
  portfolioName: "Swaraj Gupta Photography",
  ownerName: "Swaraj Gupta",
  tagline: "Turning your beautiful moments into timeless memories.",
  email: "swarajgupta76@gmail.com",
  phone: "8840857530",
  address: "Shubash Nagar Near SVM Gorakhpur 273001",
  mapLink: "",
  about: "We capture beautiful moments and turn them into timeless memories.",
  instagram: "",
  facebook: "",
  whatsapp: "918840857530",
};

export const AppProvider = ({ children }) => {
  const [services, setServices] = useLocalStorage(
    "portfolio_services",
    defaultServices
  );

  const [gallery, setGallery] = useLocalStorage(
    "portfolio_gallery",
    []
  );

  const [leads, setLeads] = useLocalStorage(
    "portfolio_leads",
    []
  );

  const [testimonials, setTestimonials] = useLocalStorage(
    "portfolio_testimonials",
    []
  );

  const [settings, setSettings] = useLocalStorage(
    "portfolio_settings",
    defaultSettings
  );

  // SERVICES
  const addService = (service) => {
    setServices((prev) => [
      ...prev,
      { ...service, id: service.id || createId() },
    ]);
  };

  const updateService = (id, updatedService) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, ...updatedService }
          : service
      )
    );
  };

  const deleteService = (id) => {
    setServices((prev) =>
      prev.filter((service) => service.id !== id)
    );
  };

  // GALLERY
  const addGalleryImage = (image) => {
    setGallery((prev) => [
      ...prev,
      { ...image, id: image.id || createId() },
    ]);
  };

  const deleteGalleryImage = (id) => {
    setGallery((prev) =>
      prev.filter((image) => image.id !== id)
    );
  };

  // LEADS / ENQUIRIES
  const addLead = (lead) => {
    setLeads((prev) => [
      ...prev,
      { ...lead, id: lead.id || createId() },
    ]);
  };

  const updateLeadStatus = (id, status) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, status }
          : lead
      )
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) =>
      prev.filter((lead) => lead.id !== id)
    );
  };

  // TESTIMONIALS
  const addTestimonial = (testimonial) => {
    setTestimonials((prev) => [
      ...prev,
      { ...testimonial, id: testimonial.id || createId() },
    ]);
  };

  const updateTestimonial = (id, updatedTestimonial) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, ...updatedTestimonial }
          : testimonial
      )
    );
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) =>
      prev.filter((testimonial) => testimonial.id !== id)
    );
  };

  // WEBSITE SETTINGS
  const updateSettings = (updatedSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...updatedSettings,
    }));
  };

  const value = useMemo(
    () => ({
      services,
      gallery,
      leads,
      testimonials,
      settings,

      addService,
      updateService,
      deleteService,

      addGalleryImage,
      deleteGalleryImage,

      addLead,
      updateLeadStatus,
      deleteLead,

      addTestimonial,
      updateTestimonial,
      deleteTestimonial,

      updateSettings,
    }),
    [services, gallery, leads, testimonials, settings]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};
