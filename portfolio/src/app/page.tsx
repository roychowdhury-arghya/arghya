import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import SocialMarquee from "@/components/SocialMarquee";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <PageLoader>
      <main className="bg-background min-h-screen relative">
        <Navbar />
        
        <ScrollyCanvas>
          <Overlay />
        </ScrollyCanvas>
        
        <Projects />
        <SocialMarquee />
        <Footer />
      </main>
    </PageLoader>
  );
}
