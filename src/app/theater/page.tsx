import TheaterSlider from "@/components/ui/slider/theater-slider";
import Image from "next/image";

export default function TheaterPage() {
  return (
    <div className="mt-8">
      <Image
        src="/assets/theater/theater_logo.png"
        alt="Theater JKT48 Logo"
        width={500}
        height={500}
      />
      <div className="md:my-6">
        <TheaterSlider />
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.296141311768!2d106.8040985!3d-6.2246286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14e5ad79c69%3A0x4cba8ea123da1241!2sJKT48%20Theater!5e0!3m2!1sen!2sid!4v1733344848309!5m2!1sen!2sid"
        width="600"
        height="450"
        className="mb-6 justify-center w-full md:hidden rounded-md border-red-400 border-2"
        loading="lazy"></iframe>
    </div>
  );
}
