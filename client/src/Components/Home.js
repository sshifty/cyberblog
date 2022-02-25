
import Posts from "./Posts";
import About from "./About";


const Home = (props) => {
  return (
    <div className="home">
      <About />
      <Posts />
      {/* Put other content like articles */}
    </div>
  );
};

export default Home;
