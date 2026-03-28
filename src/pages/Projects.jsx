"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = "https://curicullum.onrender.com/api";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(`${BASE_URL}/project/list`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();
        setProjects(data);

        clearTimeout(timeout);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderedProjects = useMemo(() => {
    return projects.map((project, index) => (
      <motion.div
        key={project._id || index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } gap-8 md:gap-16`}
      >
        {/* Image */}
        <div className="relative w-full md:w-1/2">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-72 md:h-96 object-cover rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-72 md:h-96 rounded-3xl bg-gray-800 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-400">
            {project.title}
          </h3>

          <p className="text-gray-300 text-base leading-relaxed">
            {project.description}
          </p>

          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={i}
                  className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.features?.length > 0 && (
            <ul className="text-gray-400 list-disc ml-6 space-y-1 text-sm">
              {project.features.map((feature) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          )}

          <div className="flex space-x-6 pt-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
              >
                <Github className="w-5 h-5" />
                <span>Code</span>
              </a>
            )}

            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition"
              >
                <Globe className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    ));
  }, [projects]);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-24 px-4 sm:px-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Featured Projects
      </motion.h2>

      {/* 🔄 Loading */}
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* ❌ Error */}
      {!loading && error && (
        <div className="text-center text-red-400 text-lg">
          {error}
        </div>
      )}

      {/* 📭 Empty */}
      {!loading && !error && projects.length === 0 && (
        <div className="text-center text-gray-400 text-lg">
          No projects available yet.
        </div>
      )}

      {/* ✅ Success */}
      {!loading && !error && projects.length > 0 && (
        <div className="flex flex-col space-y-32 max-w-6xl mx-auto">
          {renderedProjects}
        </div>
      )}

      <div className="w-56 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-28 rounded-full"></div>
    </section>
  );
};

export default Projects;