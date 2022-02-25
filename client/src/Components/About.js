import githubImg from "../images/github.svg";
const About = (props) => {
  return (
    <div className="home-about main-container">
      <div className="home-about-sub">
        <div className="post-header about-header">
          <h3>About this page</h3>
        </div>

        <p>
          Built with React, NodeJs, Express, and MongoDB, this blog was made for
          The Odin Project's NodeJs curriculum by me.
        </p>
        <div className="img-container">
          <a href="https://github.com/sshifty/cyberblog" target="_blank">
            <img className="logo" src={githubImg} alt="github logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
