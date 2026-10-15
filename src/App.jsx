import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopByCategorySection } from './components/ShopByCategorySection';
import { TrustedAtScaleSection } from './components/TrustedAtScaleSection';
import { CertificationsSection } from './components/CertificationsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { EnquiryModal } from './components/EnquiryModal';
import { CATEGORIES, ALL_PRODUCTS } from './data/catalogData';

export function App() {
  // Current view: 'home' | 'category'
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Modals state
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCustomSubject, setEnquiryCustomSubject] = useState(null);
  const [enquiryInitialMessage, setEnquiryInitialMessage] = useState('');

  // Navigate to category page
  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to home view
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Enquiry modal for a specific product
  const handleOpenEnquiry = (product) => {
    setEnquiryProduct(product);
    setEnquiryCustomSubject(null);
    setEnquiryInitialMessage('');
    setIsEnquiryOpen(true);
  };

  // Open general "Get a Quote" modal
  const handleOpenGeneralQuote = () => {
    setEnquiryProduct(null);
    setEnquiryCustomSubject(null);
    setEnquiryInitialMessage('');
    setIsEnquiryOpen(true);
  };

  // Open Enquiry modal specifically for demanding a similar or custom product in a category
  const handleRequestCustomProduct = (category, requestedName = '') => {
    setEnquiryProduct(null);
    const subject = `Request for Similar/Custom Product (${category.name})`;
    setEnquiryCustomSubject(subject);
    setEnquiryInitialMessage(
      requestedName
        ? `Hello, I was searching for "${requestedName}" under ${category.name} but couldn't find an exact match. Please let me know if you can supply this or a similar alternative specification.`
        : `Hello, I could not find my required product under ${category.name}. Please contact me regarding alternative / similar specifications.`
    );
    setIsEnquiryOpen(true);
  };

  // Close modals
  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setEnquiryProduct(null);
    setEnquiryCustomSubject(null);
    setEnquiryInitialMessage('');
  };

  const handleOpenDetails = (product) => {
    setDetailsProduct(product);
  };

  const handleCloseDetails = () => {
    setDetailsProduct(null);
  };

  // Navbar section navigation
  const handleNavbarNavigate = (targetId) => {
    if (targetId === 'home') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setSelectedCategoryId(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'categories' || targetId === 'products') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setSelectedCategoryId(null);
        setTimeout(() => {
          const el = document.getElementById('categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (targetId === 'about') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setSelectedCategoryId(null);
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (targetId === 'contact') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setSelectedCategoryId(null);
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
  };

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];

  return (
    <ThemeProvider>
      <div className="min-h-screen antialiased" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Navigation Bar */}
        <Navbar
          onNavigate={handleNavbarNavigate}
          onOpenQuote={handleOpenGeneralQuote}
        />

        <main>
          {currentView === 'home' ? (
            <>
              {/* 1. Hero Section with 3D rotating molecule & direct product search */}
              <Hero
                allProducts={ALL_PRODUCTS}
                onSelectProduct={(product) => {
                  handleOpenDetails(product);
                }}
                onExploreCategories={() => {
                  const el = document.getElementById('categories');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenContact={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 2. Shop by Category (The 5 exact categories from reference screenshot) */}
              <ShopByCategorySection
                categories={CATEGORIES}
                onSelectCategory={handleSelectCategory}
              />

              {/* 3. Trusted At Scale Section with Animated Counting Figures */}
              <TrustedAtScaleSection />

              {/* 4. Certifications & Credentials Section (Drug License, GST, ISO 9001, Compliance) */}
              <CertificationsSection />

              {/* 5. Why Choose Us? (3 clear benefits) */}
              <WhyChooseUsSection />

              {/* 6. Get a Quote / Contact Us section */}
              <ContactSection />
            </>
          ) : (
            /* IndiaMART-style Category Listing Page: Products ONLY under categories */
            <CategoryPage
              category={currentCategory}
              allProducts={ALL_PRODUCTS}
              allCategories={CATEGORIES}
              onBackToHome={handleBackToHome}
              onSelectCategory={handleSelectCategory}
              onViewDetails={handleOpenDetails}
              onEnquire={handleOpenEnquiry}
              onRequestCustomProduct={handleRequestCustomProduct}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onNavigate={handleNavbarNavigate}
          onSelectCategory={handleSelectCategory}
          categories={CATEGORIES}
        />

        {/* Product Details Modal with PDF Download */}
        <ProductDetailsModal
          isOpen={Boolean(detailsProduct)}
          product={detailsProduct}
          onClose={handleCloseDetails}
          onEnquire={(prod) => {
            handleCloseDetails();
            handleOpenEnquiry(prod);
          }}
        />

        {/* Product Enquiry & Quote Modal */}
        <EnquiryModal
          isOpen={isEnquiryOpen}
          product={enquiryProduct}
          customSubject={enquiryCustomSubject}
          initialMessage={enquiryInitialMessage}
          onClose={handleCloseEnquiry}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
