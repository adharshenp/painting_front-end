import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "linear-gradient(180deg, #0b0b0b, #1a1a1a)",
        padding: "80px 0 30px",
        textAlign: "center",
        color: "#f5f5f5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle animated gradient waves */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(13,202,240,0.2), transparent 60%), radial-gradient(circle at 80% 70%, rgba(225,48,108,0.15), transparent 60%)",
          animation: "moveGradient 12s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            color: "#0dcaf0",
            marginBottom: "20px",
            letterSpacing: "1px",
          }}
        >
          Let’s Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            fontSize: "1.1rem",
            color: "#aaa",
            maxWidth: "600px",
            margin: "0 auto 40px",
            padding: "0 15px",
          }}
        >
          Whether you’re looking to commission a painting, collaborate on a creative project, 
          or just say hello — I’d love to hear from you.
        </motion.p>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            fontSize: "2rem",
          }}
        >
          <motion.a
            href="https://www.instagram.com/invites/contact/?igsh=ousxhuso1fff&utm_content=v3j91ke"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.3, rotate: 8 }}
            style={{ color: "#E1306C", transition: "all 0.3s ease" }}
          >
            <FaInstagram />
          </motion.a>

          <motion.a
            href="https://wa.me/+917306552114"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.3, rotate: -8 }}
            style={{ color: "#25D366", transition: "all 0.3s ease" }}
          >
            <FaWhatsapp />
          </motion.a>

          <motion.a
            href="mailto:vaishnavkp6209@gmail.com"
            whileHover={{ scale: 1.3, rotate: 8 }}
            style={{ color: "#0dcaf0", transition: "all 0.3s ease" }}
          >
            <FaEnvelope />
          </motion.a>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            marginTop: "60px",
            color: "#777",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
          }}
        >
          © 2025 Vyshnav — All artworks and rights reserved.
        </motion.p>
      </div>

      {/* Keyframes for background animation */}
      <style>
        {`
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @media (max-width: 768px) {
          footer h2 {
            font-size: 1.7rem !important;
          }
          footer p {
            font-size: 1rem !important;
          }
          footer div[style*="font-size: 2rem"] {
            gap: 25px !important;
            font-size: 1.6rem !important;
          }
        }
        `}
      </style>
    </footer>
  );
}

export default Footer;
