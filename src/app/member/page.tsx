"use client";
import { useState, useEffect } from "react";
import MemberCard from "@/components/card/MemberCard";
import SearchBar from "@/components/searchbar";

// Shimmer Effect
import ShimmerCard from "@/components/shimmer/ShimmerCard";

export default function MemberPage() {
  const [memberList, setMemberList] = useState([]);
  const [traineeList, setTraineeList] = useState([]);
  const [successFetchMember, setSuccessFetchMember] = useState<boolean>(false);
  const [successFetchTrainee, setSuccessFetchTrainee] =
    useState<boolean>(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // fetch member data
    function fetchMember() {
      fetch("/api/v1/member", {
        cache: "no-store",
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setMemberList(data.content);
          setSuccessFetchMember(true);
        });
    }

    // fetch trainee data
    function fetchTrainee() {
      fetch("/api/v1/trainee", {
        cache: "no-store",
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setTraineeList(data.content);
          setSuccessFetchTrainee(true);
        });
    }

    fetchMember();
    fetchTrainee();
  }, []);

  return (
    <div>
      <SearchBar
        label="Sedang Mencari Oshi-mu?"
        placeholder="Cari disini"
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Member JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {successFetchMember
            ? memberList
                .filter((data) => {
                  if (query === "") return data;
                  else if (
                    data.name.toLowerCase().includes(query.toLowerCase())
                  )
                    return data;
                })
                .map((member, index) => (
                  <MemberCard
                    key={index}
                    name={member.id.replaceAll("-", " ")}
                    gen={member.gen}
                    image={member.image}
                  />
                ))
            : [...Array(6)].map((_, index) => (
                <ShimmerCard key={index} style="member-card" />
              ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Trainee JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {successFetchTrainee
            ? traineeList
                .filter((data) => {
                  if (query === "") return data;
                  else if (
                    data.name.toLowerCase().includes(query.toLowerCase())
                  )
                    return data;
                })
                .map((trainee, index) => (
                  <MemberCard
                    key={index}
                    name={trainee.id.replaceAll("-", " ")}
                    image={trainee.image}
                  />
                ))
            : [...Array(6)].map((_, index) => (
                <ShimmerCard key={index} style="member-card" />
              ))}
        </div>
      </div>
    </div>
  );
}
