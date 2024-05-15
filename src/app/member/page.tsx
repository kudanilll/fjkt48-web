"use client";
import { useState, useEffect } from "react";
import MemberType from "@/common/typedata/member-type";
import MemberCard from "@/components/card/MemberCard";
import SearchBar from "@/components/searchbar";

// Shimmer Effect
import ShimmerCard from "@/components/shimmer/ShimmerCard";

function doSearch(members: any, query: string): string[] {
  const filteredData = Object.keys(members).filter((key) => {
    const data = members[key];
    if (query === "") return members;
    else if (data.name.toLowerCase().includes(query.toLowerCase())) return data;
  });
  return filteredData;
}

function sort(data: MemberType[]): MemberType[] {
  const sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));
  const result: MemberType[] = [];
  for (const member of sortedData) {
    const firstLetter = member.name[0].toLowerCase();
    if (
      result.length === 0 ||
      result[result.length - 1].name[0].toLowerCase() !== firstLetter
    ) {
      result.push(member);
    } else {
      result.push(member);
    }
  }
  return result;
}

export default function MemberPage() {
  const [memberList, setMemberList] = useState<any>(null);
  const [traineeList, setTraineeList] = useState<any>(null);
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
          const memberData: MemberType[] = [];
          for (const i in data.content) {
            const item = data.content[i];
            memberData.push(item);
          }
          setMemberList(memberData);
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
          const traineeData: MemberType[] = [];
          for (const i in data.content) {
            const item = data.content[i];
            traineeData.push(item);
          }
          setTraineeList(traineeData);
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
        handleOnClear={() => {
          /* bug while inputting, then click on one of the cards */
          setQuery("");
          setIsInput(false);
        }}
        icon={isInput ? "close" : "search"}
      />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-poppins text-red-600 mb-2">
          {!isInput ? "Member JKT48" : ""}
        </h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-4 content-center">
          {successFetchMember // when success fetch MemberData
            ? isInput // when user input in SearchBar
              ? doSearch(memberList, query).map((item) => (
                  <MemberCard
                    key={item}
                    name={memberList[item].name}
                    img_path={memberList[item].img_path}
                    image={memberList[item].image}
                    instagram={memberList[item].instagram}
                    twitter={memberList[item].twitter}
                    tiktok={memberList[item].tiktok}
                  />
                ))
              : sort(memberList).map((item, index) => (
                  <MemberCard
                    key={index}
                    name={item.name}
                    img_path={item.img_path}
                    image={item.image}
                    instagram={item.instagram}
                    twitter={item.twitter}
                    tiktok={item.tiktok}
                  />
                ))
            : [...Array(6)].map((_, index) => (
                <ShimmerCard key={index} style="member-card" />
              ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-poppins text-red-600 mb-2">
          {!isInput ? "Trainee JKT48" : ""}
        </h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-4 content-center">
          {successFetchTrainee // when success fetch TraineeData
            ? isInput // when user input in SearchBar
              ? doSearch(traineeList, query).map((item) => (
                  <MemberCard
                    key={item}
                    name={traineeList[item].name}
                    img_path={traineeList[item].img_path}
                    image={traineeList[item].image}
                    instagram={traineeList[item].instagram}
                    twitter={traineeList[item].twitter}
                    tiktok={traineeList[item].tiktok}
                  />
                ))
              : sort(traineeList).map((item, index) => (
                  <MemberCard
                    key={index}
                    name={item.name}
                    img_path={item.img_path}
                    image={item.image}
                    instagram={item.instagram}
                    twitter={item.twitter}
                    tiktok={item.tiktok}
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
