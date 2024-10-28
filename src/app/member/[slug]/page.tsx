export default function ProfilePage(props: any) {
  return <div>Profile of {props.params.slug.replaceAll("-", " ")}</div>;
}
