import LiveTicker from "@/components/home/live-ticker";
import HeroNightTheater from "@/components/home/hero-night-theater";
import TrendingThreadsSection from "@/components/home/trending-threads-section";
import SeatBlocksSection from "@/components/home/seat-blocks-section";
import TheaterScheduleSection from "@/components/home/theater-schedule-section";
import LiveStageSection from "@/components/home/live-stage-section";
import MemberMarqueeSection from "@/components/home/member-marquee-section";
import EditorialNewsSection from "@/components/home/editorial-news-section";
import CurtainEncoreSection from "@/components/home/curtain-encore-section";
import {
  getAllMembers,
  getUpcomingSchedules,
  getLatestNews,
} from "@/lib/jkt48-data";

export default function Home() {
  const allMembers = getAllMembers();
  const upcomingSchedules = getUpcomingSchedules(6);
  const latestNews = getLatestNews(6);

  return (
    <main className="min-h-screen">
      {/* Live Ticker Bar at the top */}
      <LiveTicker />

      {/* Hero Section with Interactive Cursor Spotlight */}
      <HeroNightTheater />

      {/* Trending Forum Hot Threads */}
      <TrendingThreadsSection />

      {/* Forum Categories / Seat Blocks Grid */}
      <SeatBlocksSection />

      {/* Theater Tickets Schedule */}
      <TheaterScheduleSection schedules={upcomingSchedules} />

      {/* Live Streaming Stage Zone */}
      <LiveStageSection />

      {/* 58 Members Lineup Marquee */}
      <MemberMarqueeSection members={allMembers} />

      {/* Official Editorial News Announcements */}
      <EditorialNewsSection news={latestNews} />

      {/* Curtain Call Encore Section */}
      <CurtainEncoreSection />
    </main>
  );
}
