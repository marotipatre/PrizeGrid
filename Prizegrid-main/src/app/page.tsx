
import Navbar from "@/components/_navbar/Navbar";
import Banner from "../components/_banner";
import Footer from "@/components/_navbar/Footer";
import FAQs from "@/components/_banner/FAQs";
import FeaturedGigsServer from "@/components/_banner/FeaturedGigsServer";


export default function Home() {


  return (
    <main className="bg-white">
      <Navbar />
      <Banner />
      <FeaturedGigsServer />
      <FAQs />
      <Footer />
    </main>
  );
}
