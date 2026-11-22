import HeroSection from "@/components/home/hero-section";
import ScheduleSection from "@/components/home/schedule-section";
import NewsSection from "@/components/home/news-section";
import MemberSpotlight from "@/components/home/member-spotlight";
import {
  getAllMembers,
  getAllSchedules,
  getUpcomingSchedules,
  getLatestNews,
  getSpotlightMembers,
} from "@/lib/jkt48-data";

export default function Home() {
  const allMembers = getAllMembers();
  const allSchedules = getAllSchedules();
  const upcomingSchedules = getUpcomingSchedules(6);
  const latestNews = getLatestNews(6);
  const spotlightMembers = getSpotlightMembers(3);

  return (
    <main className="min-h-screen">
      {/* Hero Section with GSAP motion */}
      <HeroSection
        totalMembers={allMembers.length}
        totalShows={allSchedules.length}
      />

      {/* Member Spotlight Highlight */}
      <MemberSpotlight members={spotlightMembers} />

      {/* Upcoming Schedules Section */}
      <ScheduleSection schedules={upcomingSchedules} />

      {/* News & Official Announcements Section */}
      <NewsSection news={latestNews} />
    </main>
  );
}
