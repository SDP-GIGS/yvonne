import Hero from "../Hero";
import Features from "../Features";
import PortalAccess from "../components/PortalAccess";
import AdminAccessInfo from "../components/AdminAccessInfo";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Hero
        onPrimaryAction={() => navigate("/signup")}
        onSecondaryAction={() => navigate("/login")}
        onExploreFeatures={scrollToFeatures}
      />
      <Features />
      {/* Role-based portal access section */}
      <PortalAccess />
      {/* Admin access instructions */}
      <AdminAccessInfo />
    </>
  );
};

export default LandingPage;
