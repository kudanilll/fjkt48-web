"use client";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import PageWrapper from "@/components/wrapper/PageWrapper";
import MemberCard  from "@/components/card/MemberCard";
import SearchBar from "@/components/searchbar";

export const metadata: Metadata = {
  title: "FJKT48 | Member",
  description: "Daftar Member & Trainee JKT48"
};

export default function MemberPage() {
  const [memberList,  setMemberList]  = useState([]);
  const [traineeList, setTraineeList] = useState([]);
  const [successFetchMember,  setSuccessFetchMember]  = useState(false);
  const [successFetchTrainee, setSuccessFetchTrainee] = useState(false);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    // fetch member data
    function fetchMember() {
      fetch("/api/v1/member", {
        cache: "no-store",
        method: "GET"
      }).then((response) => response.json())
        .then((data) => {
          setMemberList(data.content);
          setSuccessFetchMember(true);
        });
    }
    
    // fetch trainee data
    function fetchTrainee() {
      fetch("/api/v1/trainee", {
        cache: "no-store",
        method: "GET"
      }).then((response) => response.json())
        .then((data) => {
          setTraineeList(data.content);
          setSuccessFetchTrainee(true);
        });
    }
    
    fetchMember();
    fetchTrainee();
  }, []);
  
  return (
    <PageWrapper>
      <SearchBar
        label="Sedang Mencari Oshi-mu?"
        placeholder="Cari disini"
        onChange={(event) => setQuery(event.target.value)}/>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Member JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
        {successFetchMember ? (
          memberList.filter((data) => {
            if(query === "")
              return data;
            else if(data.name.toLowerCase().includes(query.toLowerCase()))
              return data;
          }).map((member, index) => (
            <MemberCard
              key={index}
              name={member.id.replaceAll("-", " ")}
              gen={member.gen}
              image={member.image}/>
          ))) : ([...Array(6)].map((_, index) => (
            <div key={index} className="rounded-2xl bg-white m-1.5">
              <ShimmerThumbnail height={250} rounded/>
              <ShimmerTitle line={2} gap={10} variant="primary" className="py-3 px-4"/>
            </div>
          )))
        }
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Trainee JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
        {successFetchTrainee ? (
          traineeList.filter((data) => {
            if(query === "")
              return data;
            else if(data.name.toLowerCase().includes(query.toLowerCase()))
              return data;
          }).map((trainee, index) => (
            <MemberCard
              key={index}
              name={trainee.id.replaceAll("-", " ")}
              image={trainee.image}/>
          ))) : ([...Array(6)].map((_, index) => (
            <div key={index} className="rounded-2xl bg-white m-1.5">
              <ShimmerThumbnail height={250} rounded/>
              <ShimmerTitle line={2} gap={10} variant="primary" className="py-3 px-4"/>
            </div>
          )))
        }
        </div>
      </div>
    </PageWrapper>
  );
}