import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Work from "./pages/Work";

// Start every page at the top when the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // The skip link can't use href="#main" because the hash is owned by the router.
  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById("main")?.focus();
  };

  return (
    <>
      <a href="#main" className="skip-link" onClick={skipToContent}>
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />

      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
