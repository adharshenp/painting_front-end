// Gallery.jsx
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/uploads");
        const fetchedImages = (res.data.images || []).map((img) => ({
          id: img.id,
          img: img.url,
          title: img.name || "Untitled",
          public_id: img.public_id,
        }));
        setArtworks(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Failed to fetch images");
      }
    };
    fetchImages();
  }, []);

  // File selection
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  // Admin login (POST /login) -> expects { token }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      setToken(res.data.token);
      setUsername("");
      setPassword("");
      toast.success("Logged in as admin");
    } catch (err) {
      console.error(err);
      toast.error("Invalid admin credentials");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    toast.info("Logged out");
  };

  // Upload (admin only)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.warning("Please choose an image to upload.");
    if (!token) return toast.error("Login as admin to upload.");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const newImage = {
        id: res.data.id,
        img: res.data.url,
        title: res.data.name || "Untitled",
        public_id: res.data.public_id,
      };
      setArtworks((prev) => [newImage, ...prev]);
      setSelectedFile(null);
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Upload failed:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized — login required or token expired");
      } else {
        toast.error("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  // Start editing
  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  // Save edited name (admin only)
  const handleSaveEdit = async (id) => {
    if (!newName.trim()) return toast.warning("Name cannot be empty");
    if (!token) return toast.error("Login as admin to edit");

    try {
      await axios.put(
        `http://localhost:5000/edit/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, title: newName } : a)));
      setEditingId(null);
      setNewName("");
      toast.success("Name updated");
    } catch (error) {
      console.error("Edit failed:", error);
      toast.error("Failed to update name");
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setNewName("");
  };

  // Delete (admin only)
  const handleDelete = async (id) => {
    if (!token) return toast.error("Login as admin to delete");
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:5000/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtworks((prev) => prev.filter((a) => a.id !== id));
      toast.success("Image deleted");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <section
      id="gallery"
      style={{
        background: "linear-gradient(180deg, #0b0b0b, #141414)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "120%",
          height: "150%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(13,202,240,0.1), transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
          animation: "floatGlow 10s ease-in-out infinite alternate",
        }}
      />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
          style={{
            color: "#0dcaf0",
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.7rem",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          Art Gallery
        </motion.h2>

        {/* Login/Logout */}
        {!token ? (
          <Form onSubmit={handleLogin} className="d-flex flex-column align-items-center mb-4">
            <Form.Control
              type="text"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2"
              style={{ width: 250, background: "#1a1a1a", border: "1px solid #0dcaf0", color: "#fff" }}
            />
            <Form.Control
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2"
              style={{ width: 250, background: "#1a1a1a", border: "1px solid #0dcaf0", color: "#fff" }}
            />
            <Button type="submit" variant="outline-info">Login as admin</Button>
          </Form>
        ) : (
          <div className="d-flex justify-content-center mb-4">
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </div>
        )}

        {/* Upload form (visible only when logged in) */}
        {token && (
          <Form onSubmit={handleUpload} className="d-flex flex-column align-items-center mb-5">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ background: "#1a1a1a", border: "1px solid #0dcaf0", color: "#fff", padding: 10, borderRadius: 8 }}
              />
            </Form.Group>
            <Button variant="outline-info" type="submit" disabled={uploading} style={{ borderRadius: 30, padding: "10px 30px", color: "#0dcaf0" }}>
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </Form>
        )}

        {/* Gallery grid */}
        <Row className="justify-content-center">
          {artworks.length === 0 ? (
            <p style={{ color: "#aaa", textAlign: "center" }}>No images yet. Upload one to get started!</p>
          ) : (
            artworks.map((art) => (
              <Col key={art.id} xs={10} sm={6} md={4} className="mb-4 d-flex justify-content-center">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} style={{ width: "100%", maxWidth: 350 }}>
                  <Card style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 15, overflow: "hidden", boxShadow: "0 0 30px rgba(13,202,240,0.05)" }}>
                    <Card.Img src={art.img} alt={art.title} style={{ height: 300, width: "100%", objectFit: "cover" }} />
                    <Card.Body style={{ textAlign: "center" }}>
                      {editingId === art.id ? (
                        <>
                          <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ background: "#1a1a1a", border: "1px solid #0dcaf0", color: "#fff", marginBottom: 10 }} />
                          <div>
                            <Button variant="success" size="sm" onClick={() => handleSaveEdit(art.id)} style={{ marginRight: 6 }}>Save</Button>
                            <Button variant="secondary" size="sm" onClick={handleCancelEdit}>Cancel</Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Card.Title style={{ color: "#ffd700", fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.3rem" }}>{art.title}</Card.Title>
                          {token && (
                            <div className="d-flex justify-content-center gap-2">
                              <Button variant="warning" size="sm" onClick={() => handleEdit(art.id, art.title)}>Edit</Button>
                              <Button variant="danger" size="sm" onClick={() => handleDelete(art.id)}>Delete</Button>
                            </div>
                          )}
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Toasts */}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      {/* Styles */}
      <style>{`
        @keyframes floatGlow {0% { transform: translateY(0px); opacity: 0.8;} 100% { transform: translateY(20px); opacity: 1; }}
        @media (max-width: 768px) { #gallery { padding: 70px 0 !important; } #gallery h2 { font-size: 2rem !important; } }
      `}</style>
    </section>
  );
}

export default Gallery;
