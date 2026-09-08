import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          AI / ML engineer focused on what happens after a model is trained:
          RAG, agentic workflows, inference optimization, and the
          infrastructure that makes it all reliable in production.
        </p>
      </div>
    </div>
  );
};

export default About;
