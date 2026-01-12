import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ Your live backend base URL (replace if needed)
  const BASE_URL = "https://curicullum.onrender.com/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await axios.post(`${BASE_URL}/message/add`, formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_70%)]"></div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"
      >
        Get in Touch
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-semibold text-blue-400 mb-4">
            Let’s Connect!
          </h3>
          <p className="text-gray-400 leading-relaxed">
            I’m always open to new opportunities, collaborations, or just a chat about tech and development.  
            Drop me a message and I’ll get back to you soon 🚀
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-400 w-5 h-5" />
              <span className="text-gray-300">mikepg001@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-400 w-5 h-5" />
              <span className="text-gray-300">+254 795 490 978</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-400 w-5 h-5" />
              <span className="text-gray-300">Nairobi, Kenya</span>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-6 mt-8">
            <a
              href="https://github.com/praivatedev"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Github size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/peter-gonye-0bba14246/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={26} />
            </a>
            <a
              href="https://instagram.com/m16n1ghtg"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Instagram size={26} />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SECTION (FORM) */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-blue-400/20 rounded-2xl p-8 backdrop-blur-xl shadow-md space-y-5 hover:shadow-blue-500/20 transition-all"
        >
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm">Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
            {!loading && <Send size={18} />}
          </motion.button>

          {status && (
            <p className="text-center mt-4 text-sm text-gray-400">{status}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
