import { Metadata } from "next";
import PageWrapper from "@/components/wrapper/PageWrapper";

export const metadata: Metadata = {
  title: "FJKT48 | Profile",
  description: ""
};

function getProfile() {
}

export default function ProfilePage(props: any) {
  return (
    <PageWrapper>Profile of {props.params.slug.replaceAll("-", " ")}</PageWrapper>
  );
}