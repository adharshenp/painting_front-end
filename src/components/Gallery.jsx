import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ==========================
   AUTO DETECT BACKEND URL
========================== */
const BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

function Gallery() {

  const [artworks, setArtworks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  /* ==========================
     Fetch Images
  ========================== */

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {

      const res = await axios.get(`${BASE_URL}/uploads`);

      const fetchedImages = (res.data.images || []).map((img) => ({
        id: img.id,
        img: `${BASE_URL}${img.url}`,
        title: img.name || "Untitled",
      }));

      setArtworks(fetchedImages);

    } catch (error) {

      console.error(error);
      toast.error("Failed to fetch images");

    }
  };

  /* ==========================
     LOGIN
  ========================== */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(`${BASE_URL}/login`, {
        username,
        password
      });

      localStorage.setItem("adminToken", res.data.token);
      setToken(res.data.token);

      setUsername("");
      setPassword("");

      toast.success("Logged in successfully");

    } catch {

      toast.error("Invalid admin credentials");

    }

  };

  /* ==========================
     LOGOUT
  ========================== */

  const handleLogout = () => {

    localStorage.removeItem("adminToken");
    setToken("");

    toast.info("Logged out");

  };

  /* ==========================
     FILE SELECT
  ========================== */

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  /* ==========================
     UPLOAD IMAGE
  ========================== */

  const handleUpload = async (e) => {

    e.preventDefault();

    if (!selectedFile) {
      toast.warning("Select an image first");
      return;
    }

    if (!token) {
      toast.error("Login as admin first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {

      setUploading(true);

      const res = await axios.post(
        `${BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const newImage = {
        id: res.data.id,
        img: `${BASE_URL}${res.data.url}`,
        title: res.data.name
      };

      setArtworks(prev => [newImage, ...prev]);
      setSelectedFile(null);

      toast.success("Image uploaded successfully");

    } catch (error) {

      console.error(error);
      toast.error("Upload failed");

    } finally {

      setUploading(false);

    }

  };

  /* ==========================
     EDIT IMAGE
  ========================== */

  const handleEdit = (id, currentName) => {

    setEditingId(id);
    setNewName(currentName);

  };

  const handleSaveEdit = async (id) => {

    if (!newName.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }

    try {

      await axios.put(
        `${BASE_URL}/edit/${id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setArtworks(prev =>
        prev.map(art =>
          art.id === id ? { ...art, title: newName } : art
        )
      );

      setEditingId(null);
      setNewName("");

      toast.success("Name updated");

    } catch {

      toast.error("Update failed");

    }

  };

  /* ==========================
     DELETE IMAGE
  ========================== */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this image?")) return;

    try {

      await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setArtworks(prev => prev.filter(art => art.id !== id));

      toast.success("Image deleted");

    } catch {

      toast.error("Delete failed");

    }

  };

  /* ==========================
     UI
  ========================== */

  return (

    <section style={{ background: "#111", padding: "80px 0" }}>

      <Container>

        <h2 className="text-center text-info mb-5">
          Art Gallery
        </h2>

        {/* LOGIN */}

        {!token ? (

          <Form
            onSubmit={handleLogin}
            className="d-flex flex-column align-items-center mb-4"
          >

            <Form.Control
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2"
              style={{ width: "250px" }}
            />

            <Form.Control
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2"
              style={{ width: "250px" }}
            />

            <Button variant="info" type="submit">
              Login
            </Button>

          </Form>

        ) : (

          <div className="text-center mb-4">

            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>

          </div>

        )}

        {/* UPLOAD */}

        {token && (

          <Form
            onSubmit={handleUpload}
            className="d-flex flex-column align-items-center mb-5"
          >

            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3"
              style={{ width: "300px" }}
            />

            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>

          </Form>

        )}

        {/* GALLERY */}

        <Row>

          {artworks.map((art) => (

            <Col key={art.id} md={4} sm={6} xs={12} className="mb-4">

              <motion.div whileHover={{ scale: 1.05 }}>

                <Card>

                  <Card.Img
                    variant="top"
                    src={art.img}
                    style={{
                      height: "300px",
                      objectFit: "cover"
                    }}
                  />

                  <Card.Body className="text-center">

                    {editingId === art.id ? (

                      <>
                        <Form.Control
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="mb-2"
                        />

                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleSaveEdit(art.id)}
                        >
                          Save
                        </Button>
                      </>

                    ) : (

                      <>
                        <Card.Title>{art.title}</Card.Title>

                        {token && (

                          <>
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() =>
                                handleEdit(art.id, art.title)
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(art.id)}
                            >
                              Delete
                            </Button>
                          </>

                        )}

                      </>

                    )}

                  </Card.Body>

                </Card>

              </motion.div>

            </Col>

          ))}

        </Row>

      </Container>

      <ToastContainer position="top-center" autoClose={2000} />

    </section>

  );
}

export default Gallery;