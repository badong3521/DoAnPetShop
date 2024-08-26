import Adoption from "@/components/home/Adoption";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Pets from "@/components/home/Pets";
import Services from "@/components/home/Services";

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <Hero />
      <Pets />
      <Services />
      <Adoption />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
