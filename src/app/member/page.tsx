import { Metadata } from "next";
import PageWrapper from "@/components/wrapper/PageWrapper";
import MemberCard  from "@/components/card/MemberCard";
import SearchBar from "@/components/searchbar";
import { getDataFromAPI } from "@/utils/get-data";

export const metadata: Metadata = {
  title: "FJKT48 | Member",
  description: "Daftar Member & Trainee JKT48"
};

export default async function MemberPage() {
  const members  = await getDataFromAPI("member");
  const trainees = await getDataFromAPI("trainee");
  
  const handleSearchInput = (event) => {
  };
  
  return (
    <PageWrapper>
      <SearchBar
        label="Sedang Mencari Oshi-mu?"
        placeholder="Cari disini"/>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Member JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {members.content.map((member, index) => (
            <MemberCard
              key={index}
              name={member.id.replaceAll("-", " ")}
              gen={member.gen}
              image={member.image}/>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Trainee JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {trainees.content.map((trainee, index) => (
            <MemberCard
              key={index}
              name={trainee.id.replaceAll("-", " ")}
              image={trainee.image}/>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}