
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const defaultServices = [
  {
    id: "service-1",
    title: "Wedding Photography",
    description: "Beautiful memories of your special day.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    price: "Contact for pricing",
  },
  {
    id: "service-2",
    title: "Portrait Photography",
    description: "Professional portraits that tell your story.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    price: "Contact for pricing",
  },
  {
    id: "service-3",
    title: "Event Photography",
    description: "Capturing every memorable celebration.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    price: "Contact for pricing",
  },
];

const defaultGallery = [
  {
    id: "gallery-1",
    title: "Wedding Moments",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
  },
  {
    id: "gallery-2",
    title: "Portrait Session",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  {
    id: "gallery-3",
    title: "Event Celebration",
    category: "Event",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
  },
];

const defaultTestimonials = [
  {
    id: "testimonial-1",
    name: "Happy Client",
    message: "Amazing photography and a wonderful experience!",
    rating: 5,
  },
];

const defaultSettings = {
  siteName: "Swaraj Gupta Photography",
  ownerName: "Swaraj Gupta",
  tagline: "Turning your beautiful moments into timeless memories.",
  email: "swarajgupta76@gmail.com",
  phone: "8840857530",
  address: "Shubash Nagar, Near SVM, Gorakhpur, Uttar Pradesh 273001",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Shubash+Nagar+Near+SVM+Gorakhpur+273001",
  about:
    "Welcome to Swaraj Gupta Photography. We capture your special moments with creativity, passion, and attention to detail.",
  instagram: "",
  facebook: "",
  whatsapp: "918840857530",
};

function createId(prefix = "item") {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

export function AppProvider({ children }) {
  const [services, setServices] = useLocalStorage(
    "photography_services",
    defaultServices
  );

  const [gallery, setGallery] = useLocalStorage(
    "photography_gallery",
    defaultGallery
  );

  const [leads, setLeads] = useLocalStorage(
    "photography_leads",
    []
  );

  const [testimonials, setTestimonials] = useLocalStorage(
    "photography_testimonials",
    defaultTestimonials
  );

  const [settings, setSettings] = useLocalStorage(
    "photography_settings",
    defaultSettings
  );

  // SERVICES
  const addService = useCallback((service) => {
    setServices((previous) => [
      ...previous,
      { ...service, id: createId("service") },
    ]);
  }, [setServices]);

  const updateService = useCallback((id, updates) => {
    setServices((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, [setServices]);

  const deleteService = useCallback((id) => {
    setServices((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, [setServices]);

  // GALLERY
  const addGalleryImage = useCallback((image) => {
    setGallery((previous) => [
      ...previous,
      { ...image, id: createId("gallery") },
    ]);
  }, [setGallery]);

  const updateGalleryImage = useCallback((id, updates) => {
    setGallery((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, [setGallery]);

  const deleteGalleryImage = useCallback((id) => {
    setGallery((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, [setGallery]);

  // LEADS
  const addLead = useCallback((lead) => {
    const newLead = {
      ...lead,
      id: createId("lead"),
      status: "New",
      createdAt: new Date().toISOString(),
    };

    setLeads((previous) => [newLead, ...previous]);

    return newLead;
  }, [setLeads]);

  const updateLead = useCallback((id, updates) => {
    setLeads((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, [setLeads]);

  const deleteLead = useCallback((id) => {
    setLeads((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, [setLeads]);

  // TESTIMONIALS
  const addTestimonial = useCallback((testimonial) => {
    setTestimonials((previous) => [
      ...previous,
      { ...testimonial, id: createId("testimonial") },
    ]);
  }, [setTestimonials]);

  const updateTestimonial = useCallback((id, updates) => {
    setTestimonials((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, [setTestimonials]);

  const deleteTestimonial = useCallback((id) => {
    setTestimonials((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, [setTestimonials]);

  // WEBSITE SETTINGS
  const updateSettings = useCallback((updates) => {
    setSettings((previous) => ({
      ...previous,
      ...updates,
    }));
  }, [setSettings]);

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
      updateGalleryImage,
      deleteGalleryImage,

      addLead,
      updateLead,
      deleteLead,

      addTestimonial,
      updateTestimonial,
      deleteTestimonial,

      updateSettings,
    }),
    [
      services,
      gallery,
      leads,
      testimonials,
      settings,
      addService,
      updateService,
      deleteService,
      addGalleryImage,
      updateGalleryImage,
      deleteGalleryImage,
      addLead,
      updateLead,
      deleteLead,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      updateSettings,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
