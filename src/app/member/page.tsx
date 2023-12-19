import PageWrapper from "../page-wrapper";
import CardItem from "../../components/CardItem";

async function getData(endpoint: string) {
  const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
    cache: "no-store",
    method: "GET"
  });
  if(!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export default async function MemberPage() {
  const member  = await getData("member");
  const trainee = await getData("trainee");
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold">Anggota JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {member.content.map((item) => (
            <CardItem
              key={item.id}
              name={item.name}
              gen={item.gen}
              ttl={item.ttl}
              image={item.image}/>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold">Trainee JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {trainee.content.map((item) => (
            <CardItem
              key={item.id}
              name={item.name}
              gen={item.gen}
              ttl={item.ttl}
              image={item.image}/>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}