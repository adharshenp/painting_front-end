import { Container, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import profileImg from "../assets/images/vysh.jpg";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(180deg, #0b0b0b, #141414)",
        color: "#fff",
        padding: "80px 0",
        position: "relative",
      }}
    >
      <Container fluid="md">
        <Row className="align-items-center gy-5 gx-4">
          {/* Left: Image */}
          <Col
            md={6}
            xs={12}
            className="text-center"
            style={{ position: "relative" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 0 40px rgba(13,202,240,0.2)",
                border: "2px solid rgba(13,202,240,0.3)",
                display: "inline-block",
                maxWidth: "90%",
              }}
            >
              <Image
                src={profileImg}
                alt="Artist portrait"
                fluid
                style={{
                  borderRadius: "0",
                  filter: "brightness(0.95) contrast(1.1)",
                  transition: "transform 0.4s ease",
                  width: "100%",
                  height: "auto",
                }}
                className="about-image"
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </motion.div>
          </Col>

          {/* Right: Text */}
          <Col md={6} xs={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="about-content"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "20px",
                padding: "40px 30px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 30px rgba(13,202,240,0.1)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.4rem",
                  color: "#0dcaf0",
                  letterSpacing: "1px",
                  marginBottom: "25px",
                }}
              >
                About Me
              </h2>

              <p
                style={{
                  color: "#ccc",
                  fontSize: "1.05rem",
                  lineHeight: "1.8",
                }}
              >
                I’m an artist devoted to transforming emotions into colors.
                Through every brushstroke, I seek to evoke a feeling — to turn
                blank spaces into living expressions of thought, culture, and
                soul.
              </p>

              <p
                style={{
                  color: "#999",
                  marginTop: "15px",
                  fontSize: "1rem",
                }}
              >
                My paintings reflect a harmony between abstraction and realism —
                where every color bleeds into meaning, and every shade tells a
                story waiting to be felt.
              </p>

              {/* Social Links */}
              <div
                className="mt-4 d-flex justify-content-center flex-wrap gap-4"
                style={{ marginTop: "35px" }}
              >
                <motion.a
                  href="https://www.instagram.com/invites/contact/?igsh=ousxhuso1fff&utm_content=v3j91ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  style={{
                    color: "#E1306C",
                    fontSize: "2rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaInstagram />
                </motion.a>

                <motion.a
                  href="https://wa.me/+917306552114"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, rotate: -10 }}
                  style={{
                    color: "#25D366",
                    fontSize: "2rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaWhatsapp />
                </motion.a>

                <motion.a
                  href="mailto:vaishnavkp6209@gmail.com"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  style={{
                    color: "#0dcaf0",
                    fontSize: "2rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaEnvelope />
                </motion.a>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Inline responsive styles */}
      <style jsx="true">{`
        /* ===== RESPONSIVE ABOUT SECTION ===== */
        @media (max-width: 992px) {
          #about {
            padding: 80px 6%;
            text-align: center;
          }
          #about .row {
            flex-direction: column-reverse !important;
          }
          #about h2 {
            font-size: 2rem !important;
            margin-top: 30px;
          }
          #about p {
            font-size: 1rem !important;
          }
          #about img {
            max-width: 70%;
            margin: 0 auto;
            display: block;
          }
        }

        @media (max-width: 768px) {
          #about {
            padding: 60px 5%;
          }
          #about h2 {
            font-size: 1.8rem !important;
          }
          #about p {
            font-size: 0.95rem !important;
            line-height: 1.7 !important;
          }
          #about img {
            max-width: 85%;
          }
          #about .d-flex {
            gap: 25px !important;
          }
          #about a {
            font-size: 1.8rem !important;
          }
        }

        @media (max-width: 480px) {
          #about {
            padding: 50px 4%;
          }
          #about h2 {
            font-size: 1.6rem !important;
          }
          #about p {
            font-size: 0.9rem !important;
          }
          #about img {
            max-width: 90%;
            border-radius: 12px;
          }
          #about a {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
