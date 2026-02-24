import "bootswatch/dist/cyborg/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Navigation from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";

import brush from "./assets/images/brush.png"; // 🖌️ Brush image

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // 🖌️ For Desktop: Brush Cursor
    if (!isTouchDevice) {
      const brushCursor = document.createElement("img");
      brushCursor.src = brush;
      brushCursor.className = "brush-cursor";
      document.body.appendChild(brushCursor);

      const moveCursor = (e) => {
        brushCursor.style.left = `${e.clientX}px`;
        brushCursor.style.top = `${e.clientY}px`;
      };

      window.addEventListener("mousemove", moveCursor);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        brushCursor.remove();
      };
    }

    // 🎨 For Touch Devices: Colorful Paint Splash
    const colors = [
      "#FFD700", // gold
      "#FF69B4", // pink
      "#00BFFF", // blue
      "#7CFC00", // lime
      "#FF4500", // orange
      "#9400D3", // violet
    ];

    const createSplash = (x, y) => {
      const splash = document.createElement("div");
      splash.className = "paint-splash";

      // Pick a random hue for variety
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      splash.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;

      splash.style.left = `${x}px`;
      splash.style.top = `${y}px`;

      document.body.appendChild(splash);
      setTimeout(() => splash.remove(), 600);
    };

    const handleTouch = (e) => {
      const touch = e.touches[0];
      createSplash(touch.clientX, touch.clientY);
    };

    const handleClick = (e) => {
      createSplash(e.clientX, e.clientY);
    };

    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Hero />
      <div data-aos="fade-up">
        <About />
      </div>
      <div data-aos="zoom-in">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
}

export default App;
