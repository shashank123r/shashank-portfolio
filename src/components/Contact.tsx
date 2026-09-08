import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Let's build something.</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Get in touch</h4>
            <p>
              If you're working on an interesting AI/ML problem, I'd be happy
              to talk.
            </p>
            <a
              href="mailto:shashank.r2005@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Get in touch <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h4>Resume</h4>
            <a
              href="/Shashank_R_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Download resume <MdArrowOutward />
            </a>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
