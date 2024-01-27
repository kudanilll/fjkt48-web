import "@/assets/styles/shimmer.scss";
import "./styles.scss";

export default function ShimmerTitle(props: { line: number; width: number }) {
  const style = {};
  style.width = props.width ? `${props.width}%` : "100%";
  return (
    <div className="shimmer-title grid grid-gap-10" style={style}>
      {[...Array(props.line ? props.line : 1)].map((_, index) => (
        <div key={index} className="shimmer shimmer-title-line" />
      ))}
    </div>
  );
}
