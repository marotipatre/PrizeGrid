import Navbar from "@/components/_navbar/Navbar";
import Banner from "../components/_banner";
import Footer from "@/components/_navbar/Footer";
import FAQs from "@/components/_banner/FAQs";
import FeaturedGigs from "@/components/_banner/FeaturedGigs";


export default function Home() {


  return (
    <main className="bg-white">
      <Navbar />
      <Banner />
      <FeaturedGigs />
      <FAQs />
      <Footer />
    </main>
  );
}
