import { useCallback, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const projects = [
  {
    title: "CapForge",
    category: "Authorization SDK for AI Agents",
    description:
      "A signed authorization framework for AI agents: cryptographic capability manifests that encode identity, permitted actions, and constraints, checked in microseconds at runtime.",
    tools: "Python, Ed25519, Pydantic V2, LangGraph, FastAPI, Click, GitHub Actions",
    image: "/images/capforge.svg",
    github: "https://github.com/shashank123r/capforge",
  },
  {
    title: "Enterprise Agentic RAG",
    category: "Production RAG System",
    description:
      "A RAG backend built for scale, with Milvus vector search, a pgvector fallback, async Python throughout, JWT/RBAC auth, and NVIDIA NIM for embeddings and inference, behind a React + TypeScript frontend.",
    tools: "Python, FastAPI, PostgreSQL, Milvus, Redis, NVIDIA NIM, React, TypeScript, Docker",
    image: "/images/enterprise-agentic-rag.svg",
    github: "https://github.com/shashank123r/Enterprise-Agentic-RAG",
  },
  {
    title: "Model Genome",
    category: "Model Evaluation System",
    description:
      "An internal evaluation framework built at Tensorgo. A/B-tested 40+ prompt configurations against held-out datasets, lifting task accuracy from 76% to 91% and cutting hallucinations by 28%. Gates every model update before deployment.",
    tools: "Structured testing, 781 passing, 1 skipped",
    image: "/images/model-genome.svg",
    github: "https://github.com/shashank123r/model-xray",
  },
];

// One clone of the last slide is prepended and one clone of the first slide
// is appended, so wrapping past either end can animate a single short step
// in the correct direction instead of sliding back across every slide.
const trackIndexForReal = (index: number) => index + 1;

const extendedProjects = [
  { ...projects[projects.length - 1], realIndex: projects.length - 1 },
  ...projects.map((project, index) => ({ ...project, realIndex: index })),
  { ...projects[0], realIndex: 0 },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(trackIndexForReal(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [instant, setInstant] = useState(false);

  const settleInstant = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstant(false));
    });
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setInstant(false);
      setCurrentIndex(index);
      setTrackIndex(trackIndexForReal(index));
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setInstant(false);
    const wrapping = currentIndex === 0;
    const prevReal = wrapping ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(prevReal);
    setTrackIndex((prev) => prev - 1);
    setTimeout(() => {
      if (wrapping) {
        setInstant(true);
        setTrackIndex(trackIndexForReal(prevReal));
        settleInstant();
      }
      setIsAnimating(false);
    }, 500);
  }, [currentIndex, isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setInstant(false);
    const wrapping = currentIndex === projects.length - 1;
    const nextReal = wrapping ? 0 : currentIndex + 1;
    setCurrentIndex(nextReal);
    setTrackIndex((prev) => prev + 1);
    setTimeout(() => {
      if (wrapping) {
        setInstant(true);
        setTrackIndex(trackIndexForReal(nextReal));
        settleInstant();
      }
      setIsAnimating(false);
    }, 500);
  }, [currentIndex, isAnimating]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdKeyboardArrowRight />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${trackIndex * 100}%)`,
                transition: instant ? "none" : undefined,
              }}
            >
              {extendedProjects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{project.realIndex + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="carousel-description">
                          {project.description}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        {project.github && (
                          <a
                            className="carousel-github"
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="disable"
                          >
                            <FaGithub />
                            View on GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
