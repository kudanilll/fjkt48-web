import Tab from "@/components/ui/tabs/tab";
import Image from "next/image";

function DummyContent() {
  return (
    <Image
      src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/assets/release/hightension.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
}

const sections: Tab[] = [
  {
    title: "Baju & Jaket",
    value: "Baju & Jaket",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
        <p>Baju & Jaket Tab</p>
        <DummyContent />
      </div>
    ),
  },
  {
    title: "Aksesoris",
    value: "Aksesoris",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
        <p>Aksesoris tab</p>
        <DummyContent />
      </div>
    ),
  },
  {
    title: "Photopack",
    value: "Photopack",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
        <p>Photopack tab</p>
        <DummyContent />
      </div>
    ),
  },
  {
    title: "Poster & Kalendar",
    value: "Poster & Kalendar",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
        <p>Poster & Kalendar tab</p>
        <DummyContent />
      </div>
    ),
  },
  {
    title: "Botol Minum",
    value: "Botol Minum",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
        <p>Botol Minum tab</p>
        <DummyContent />
      </div>
    ),
  },
];

export default sections;
