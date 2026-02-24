import React from "react";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-section d-flex align-items-center justify-content-center text-center vh-100"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a0a0a, #1a1a1a 60%, #222222)",
        color: "white",
      }}
    >
      {/* Glowing moving background */}
      <div
        className="hero-bg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,215,0,0.08), transparent 60%), radial-gradient(circle at 70% 60%, rgba(13,202,240,0.08), transparent 60%)",
          filter: "blur(90px)",
          animation: "floatColors 10s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <motion.h1
          className="fw-bold mb-4 hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "3.5rem",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "2px",
            textShadow: "0 0 15px rgba(255,215,0,0.3)",
          }}
        >
          <span style={{ color: "#ffd700" }}>Bringing Art</span> to Life
        </motion.h1>

        <motion.p
          className="lead mb-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            fontSize: "1.2rem",
            lineHeight: "1.7",
            color: "#ccc",
          }}
        >
          Immerse yourself in a world of vibrant colors, flowing textures, and
          emotions that breathe life onto every canvas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <ScrollLink
            to="gallery"
            spy={true}
            smooth={true}
            duration={600}
            offset={-70}
          >
            <Button
              variant="outline-warning"
              size="lg"
              className="px-4 py-2 fw-semibold hero-btn"
              style={{
                border: "2px solid #ffd700",
                color: "#ffd700",
                fontSize: "1.1rem",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#ffd700";
                e.currentTarget.style.color = "#111";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(255,215,0,0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ffd700";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View My Work
            </Button>
          </ScrollLink>
        </motion.div>
      </Container>

      {/* Floating paint particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-paint"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 1, 0],
            scale: [0.8, 1.2, 0.8],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * -150 - 50],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: ["#ffd700", "#0dcaf0", "#ff5e00"][i % 3],
            filter: "blur(2px)",
            zIndex: 1,
          }}
        />
      ))}

      {/* Keyframes for background animation */}
      <style>{`
        @keyframes floatColors {
          0% { transform: translateY(0px); opacity: 0.9; }
          100% { transform: translateY(25px); opacity: 1; }
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
          .hero-title { font-size: 2.8rem !important; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.3rem !important; }
          .lead { font-size: 1rem !important; }
          .hero-btn { font-size: 1rem !important; padding: 10px 25px !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 1.9rem !important; }
          .lead { font-size: 0.95rem !important; }
        }

        /* ===== RESPONSIVE HERO SECTION ===== */

@media (max-width: 1200px) {
  .hero-title {
    font-size: 2.4rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-artist-img {
    width: 200px;
    height: 200px;
  }

  .hero-content {
    max-width: 600px;
    text-align: center;
  }
}

@media (max-width: 992px) {
  .hero-section {
    padding: 60px 20px;
    flex-direction: column;
    text-align: center;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-artist-img {
    margin-top: 30px;
    width: 180px;
    height: 180px;
  }

  .hero-btn {
    font-size: 0.95rem;
    padding: 10px 25px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 10px;
    min-height: 90vh;
  }

  .hero-content {
    width: 100%;
    padding: 0 15px;
  }

  .hero-title {
    font-size: 1.9rem;
    line-height: 1.3;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .hero-artist-img {
    width: 160px;
    height: 160px;
  }

  .hero-btn {
    font-size: 0.9rem;
    padding: 8px 22px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 50px 10px;
  }

  .hero-title {
    font-size: 1.6rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .hero-btn {
    font-size: 0.85rem;
    padding: 8px 20px;
  }

  .hero-artist-img {
    width: 140px;
    height: 140px;
    margin-top: 25px;
  }
}

@media (max-width: 400px) {
  .hero-title {
    font-size: 1.4rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }

  .hero-btn {
    font-size: 0.8rem;
    padding: 6px 18px;
  }

  .hero-artist-img {
    width: 120px;
    height: 120px;
  }
}


      `}</style>
    </section>
  );
};

export default Hero;
