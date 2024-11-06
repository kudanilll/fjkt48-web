import TheaterSlider from "@/components/ui/slider/theater-slider";
import Image from "next/image";
import Link from "next/link";

export default function TheaterPage() {
  return (
    <div className="mt-8">
      <Image
        src="/assets/theater/theater_logo.png"
        alt="Theater JKT48 Logo"
        width={500}
        height={500}
      />
      <div className="my-6">
        <TheaterSlider />
      </div>
    </div>
  );
}
