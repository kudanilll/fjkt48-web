import "@/assets/styles/shimmer.scss";
import "./styles.scss";

export default function ShimmerBanner(props: {
  width: number;
  height: number;
}) {
  const width = props.width ? `w-${props.width}` : "w-auto";
  const height = props.height ? `h-${props.height}px` : "h-300px";
  return (
    <div className={`shimmer shimmer-banner rounded-2xl ${width} ${height}`} />
  );
}
