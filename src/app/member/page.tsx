"use client";
import { useState, useEffect } from "react";
import MemberCard from "@/components/card/MemberCard";
import SearchBar from "@/components/searchbar";

// Shimmer Effect
import ShimmerCard from "@/components/shimmer/ShimmerCard";

export default function MemberPage() {
  const [memberList, setMemberList] = useState<any[]>([]);
  const [traineeList, setTraineeList] = useState<any[]>([]);
  const [successFetchMember, setSuccessFetchMember] = useState<boolean>(false);
  const [successFetchTrainee, setSuccessFetchTrainee] =
    useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);

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
        handleInputChange={(event) => {
          const value = event.target.value;
          if (value.length <= 10) setQuery(value);
          setIsInput(true);
        }}
        onCloseIcon={() => {
          if (isInput) {
            setQuery("");
            setIsInput(false);
          }
        }}
        inputValue={query}
        handleOnBlur={() => {
          /* bug while inputting, then click on one of the cards */
          // setQuery("");
          // setIsInput(false);
        }}
        icon={isInput ? "close" : "search"}
      />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-1 font-semibold">
          {!isInput ? "Member JKT48" : ""}
        </h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 md:px-12 content-center">
          {successFetchMember
            ? isInput
              ? memberList
                  .filter((data) => {
                    if (query === "") return data;
                    else if (
                      data.name.toLowerCase().includes(query.toLowerCase())
                    )
                      return data;
                  })
                  .map((member) => (
                    <MemberCard
                      key={member.id}
                      name={member.id.replaceAll("-", " ")}
                      gen={member.gen}
                      image={member.image}
                    />
                  ))
              : memberList.map((member) => (
                  <MemberCard
                    key={member.id}
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
        <h1 className="text-2xl md:text-3xl mb-1 font-semibold">
          {!isInput ? "Trainee JKT48" : ""}
        </h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 md:px-12 content-center">
          {successFetchTrainee
            ? isInput
              ? traineeList
                  .filter((data) => {
                    if (query === "") return data;
                    else if (
                      data.name.toLowerCase().includes(query.toLowerCase())
                    )
                      return data;
                  })
                  .map((trainee) => (
                    <MemberCard
                      key={trainee.id}
                      name={trainee.id.replaceAll("-", " ")}
                      image={trainee.image}
                    />
                  ))
              : traineeList.map((trainee) => (
                  <MemberCard
                    key={trainee.id}
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
