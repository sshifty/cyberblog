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
          <img className="logo" src={githubImg} alt="github logo" />
        </div>
      </div>
    </div>
  );
};

export default About;
