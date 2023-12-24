import PageWrapper from "@/app/page-wrapper";

export default function ProfilePage(props: any) {
  return (
    <PageWrapper>Profile of {props.params.slug}</PageWrapper>
  );
}