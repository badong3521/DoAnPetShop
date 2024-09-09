import Adoption from "@/components/home/Adoption";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Pets from "@/components/home/Pets";
import Services from "@/components/home/Services";
import ComponentMain from "@/components/main-component";

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <ComponentMain>
        <Hero />
        <Pets />
        <Services />
        <Adoption />
        <Newsletter />
      </ComponentMain>
    </div>
  );
};

export default Home;
