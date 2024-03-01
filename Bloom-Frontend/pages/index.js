import Channels from "components/sections/Channels";
import Courses from "components/sections/Courses";
import Features from "components/sections/Features";
import Header from "components/sections/Header";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Channels />
      <Courses />
      <Features />
    </div>
  );
}
