import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import Skills from "../../components/sections/Skills";
import Experience from "../../components/sections/Experience";
import Projects from "../../components/sections/Projects";
import Education from "../../components/sections/Education";
import Contact from "../../components/sections/Contact";

const Home = () => {
    return (
        <Layout>
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
        </Layout>
    );
};

export default Home;
