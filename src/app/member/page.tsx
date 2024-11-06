"use client";
import { MemberType } from "@/models/types/member.type";
import { useState } from "react";
import MemberCard from "@/components/ui/card/member";
import SearchBar from "@/components/ui/search-bar";
import ShimmerCard from "@/components/ui/shimmer/card";
import Heading from "@/components/typography/heading";
import useFetch from "@/hooks/use-fetch";

function doSearch(members: MemberType[], query: string): MemberType[] {
  return members.filter((member) =>
    member.biodata?.name?.toLowerCase().includes(query.toLowerCase())
  );
}

function sort(data: MemberType[]): MemberType[] {
  const sortedData = data
    .slice()
    .sort((a, b) => a.biodata.name.localeCompare(b.biodata.name));
  const result: MemberType[] = [];
  for (const member of sortedData) {
    const firstLetter = member.biodata.name[0].toLowerCase();
    if (
      result.length === 0 ||
      result[result.length - 1].biodata.name[0].toLowerCase() !== firstLetter
    ) {
      result.push(member);
    } else {
      result.push(member);
    }
  }
  return result;
}

export default function MemberPage() {
  const [query, setQuery] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);

  const [memberList, successFetchMember] = useFetch<MemberType[]>(
    "/member",
    "member"
  );

  const [traineeList, successFetchTrainee] = useFetch<MemberType[]>(
    "/trainee",
    "trainee"
  );

  return (
    <div className="mt-8">
      <SearchBar
        label="Sedang Mencari Oshi-mu?"
        placeholder="Cari disini"
        handleInputChange={(event) => {
          const value = event.target.value;
          if (value.length <= 10) {
            setQuery(value);
            setIsInput(true);
            if (value === "") setIsInput(false);
          }
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
          {successFetchMember && memberList
            ? (isInput ? doSearch(memberList, query) : sort(memberList)).map(
                (item, index) => <MemberCard key={index} data={item} />
              )
            : [...Array(6)].map((_, index) => (
                <ShimmerCard key={index} style="member-card" />
              ))}
        </div>
      </div>
      <div className="mb-8">
        <Heading>{!isInput ? "Trainee JKT48" : ""}</Heading>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-4 content-center">
          {successFetchTrainee && traineeList
            ? (isInput ? doSearch(traineeList, query) : sort(traineeList)).map(
                (item, index) => <MemberCard key={index} data={item} />
              )
            : [...Array(6)].map((_, index) => (
                <ShimmerCard key={index} style="member-card" />
              ))}
        </div>
      </div>
    </div>
  );
}
