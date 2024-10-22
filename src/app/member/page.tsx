"use client";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import MemberType from "@/common/typedata/member-type";
import MemberCard from "@/components/ui/card/member";
import SearchBar from "@/components/ui/search-bar";
import ShimmerCard from "@/components/ui/shimmer/card";
import Heading from "@/components/typography/heading";

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

function normalize(data: any) {
  const list: MemberType[] = [];
  for (const i in data.content) {
    const item = data.content[i];
    list.push(item);
  }
  return list;
}

export default function MemberPage() {
  const [query, setQuery] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);

  const [memberList, successFetchMember] = useFetch<any>(
    "/member",
    (url: string) =>
      fetch(url, {
        method: "GET",
        next: { tags: ["member"] },
      })
        .then((res) => res.json())
        .then((data) => normalize(data))
  );

  const [traineeList, successFetchTrainee] = useFetch<any>(
    "/trainee",
    (url: string) =>
      fetch(url, {
        method: "GET",
        next: { tags: ["trainee"] },
      })
        .then((res) => res.json())
        .then((data) => normalize(data))
  );

  return (
    <div className="mt-8">
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
          setQuery("");
          setIsInput(false);
        }}
        icon={isInput ? "close" : "search"}
      />
      <div className="mb-6">
        <Heading>{!isInput ? "Member JKT48" : ""}</Heading>
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
        <Heading>{!isInput ? "Trainee JKT48" : ""}</Heading>
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
