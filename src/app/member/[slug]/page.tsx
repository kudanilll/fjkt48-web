import PageWrapper from "@/app/page-wrapper";

function getProfile() {
}

export default function ProfilePage(props: any) {
  return (
    <PageWrapper>Profile of {props.params.slug.replaceAll("-", " ")}</PageWrapper>
  );
}