import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/paintlogo.png";

function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Gallery", to: "gallery" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      style={{
        background: "rgba(10, 10, 10, 0.7)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 15px rgba(255, 179, 71, 0.2)",
        borderBottom: "1px solid rgba(255, 179, 71, 0.2)",
        transition: "all 0.3s ease",
        fontFamily: "'Poppins', sans-serif",
        padding: "8px 0",
      }}
    >
      <Container fluid className="px-4">
        {/* Logo */}
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center"
          style={{ gap: "10px" }}
        >
          <img
            src={logo}
            alt="Artist Logo"
            height="40"
            style={{
              filter: "drop-shadow(0 0 6px rgba(255, 179, 71, 0.8))",
            }}
          />
          <span
            style={{
              color: "white",
              fontWeight: "600",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem",
              letterSpacing: "1px",
            }}
          >
            Vaishnav Artworks
          </span>
        </Navbar.Brand>

        {/* Toggle */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
          style={{
            borderColor: "var(--accent)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "4px 8px",
          }}
        />

        {/* Collapsible menu */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="text-center">
            {navItems.map((item, index) => (
              <ScrollLink
                key={index}
                to={item.to}
                smooth={true}
                duration={400}
                offset={-70}
                spy={true}
                activeClass="active-link"
                onClick={() => setExpanded(false)}
                style={{
                  margin: "0 20px",
                  color: "#f1f1f1",
                  cursor: "pointer",
                  position: "relative",
                  fontSize: "1.05rem",
                  transition: "color 0.3s ease",
                  textDecoration: "none",
                }}
                className="nav-link"
              >
                {item.name}
              </ScrollLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Responsive Fix Styles */}
      <style jsx="true">{`
        .nav-link {
          color: #f1f1f1 !important;
        }
        .nav-link:hover {
          color: var(--accent) !important;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--accent);
          transition: width 0.4s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .active-link {
          color: var(--accent) !important;
          text-shadow: 0 0 10px var(--accent);
        }

        /* Fix toggle alignment & spacing */
        @media (max-width: 992px) {
          .navbar {
            padding: 10px 16px !important;
          }
          .navbar-toggler {
            margin-right: 10px;
          }
          .navbar-collapse {
            background: rgba(15, 15, 15, 0.95);
            border-top: 1px solid rgba(255, 179, 71, 0.2);
            margin-top: 10px;
            padding: 15px 0;
            border-radius: 8px;
          }
        }

        @media (max-width: 576px) {
          .navbar {
            padding: 8px 12px !important;
          }
          .navbar-brand span {
            font-size: 1.1rem !important;
          }
          .navbar-toggler {
            transform: scale(0.9);
          }
          .navbar-collapse {
            padding: 12px 0;
          }
        }
      `}</style>
    </Navbar>
  );
}

export default Navigation;
