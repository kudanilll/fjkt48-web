import ShimmerTitle from "@/components/shimmer/ShimmerTitle";
import "@/assets/styles/shimmer.scss";
import "./styles.scss";

function ShimmerMemberCard() {
  return (
    <div className="rounded-2xl bg-white m-1.5" style={{ height: "300px" }}>
      <div className="shimmer shimmer-member-card-image" />
      <div className="py-3 px-4 h-16">
        <ShimmerTitle width={70} />
      </div>
    </div>
  );
}

function ShimmerNewsCard() {
  return (
    <div className="rounded-2xl bg-white mb-1.5" style={{ height: "150px" }}>
      <div className="shimmer shimmer-news-card-image" />
    </div>
  );
}

function ShimmerProductCard() {
  return (
    <div className="rounded-2xl bg-white m-1.5" style={{ height: "300px" }}>
      <div className="shimmer shimmer-product-card-image" />
      <div className="py-3 px-4 h-16">
        <ShimmerTitle width={70} />
        <ShimmerTitle />
      </div>
    </div>
  );
}

function ShimmerScheduleCard() {
  return (
    <div
      className="shimmer rounded-xl flex bg-white w-full mb-2"
      style={{ height: "72px" }}
    />
  );
}

export default function ShimmerCard(props: { style: string }) {
  const styles = ["member-card", "news-card", "product-card", "schedule-card"];
  if (styles.includes(props.style)) {
    switch (props.style) {
      case styles[0]:
        return <ShimmerMemberCard />;
      case styles[1]:
        return <ShimmerNewsCard />;
      case styles[2]:
        return <ShimmerProductCard />;
      case styles[3]:
        return <ShimmerScheduleCard />;
    }
  }
  return (
    <div className="rounded-2xl bg-white m-1.5" style={{ height: "300px" }} />
  );
}
