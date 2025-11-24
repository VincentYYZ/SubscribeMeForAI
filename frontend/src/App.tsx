import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { HomeTabs } from "./components/sections/HomeTabs";
import { Features } from "./components/sections/Features";
import { Pricing } from "./components/sections/Pricing";
import { FAQ } from "./components/sections/FAQ";

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HomeTabs />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
