import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI / ML Engineer</h4>
                <h5>Tensorgo</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Working on AI/ML systems across inference, RAG, automation,
              testing, and infrastructure. The work has included model
              serving and optimization, vLLM/CUDA experimentation, AI
              application testing, security testing, and building tooling
              around AI products. A lot of the work is less about training a
              model from scratch and more about making the entire system
              behave reliably: latency, evaluation, deployment, failure
              cases, and everything around the model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
