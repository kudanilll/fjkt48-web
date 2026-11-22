import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMemberDetail, getAllMemberCodes } from "@/data/member-details-data";
import MemberHeroSection from "@/components/member/member-hero-section";
import MemberScheduleSection from "@/components/member/member-schedule-section";
import MemberDiscussionSection from "@/components/member/member-discussion-section";
import MemberTeammatesSection from "@/components/member/member-teammates-section";

interface MemberPageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateStaticParams() {
  const codes = getAllMemberCodes();
  return codes.map((code) => ({
    code: code,
  }));
}

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { code } = await params;
  const member = getMemberDetail(code);

  if (!member) {
    return {
      title: "Member Tidak Ditemukan | FJKT48",
    };
  }

  return {
    title: `${member.name} (${member.nickname}) | FJKT48`,
    description: `Profil lengkap ${member.name} (${member.nickname}) JKT48: biodata, jadwal teater, dan obrolan forum penggemar.`,
  };
}

export default async function MemberDetailPage({ params }: MemberPageProps) {
  const { code } = await params;
  const member = getMemberDetail(code);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)]">
      {/* 1. Member Hero with Spotlit Portrait */}
      <MemberHeroSection member={member} />

      {/* 2. Jadwal Pertunjukan Member */}
      <MemberScheduleSection member={member} />

      {/* 3. Diskusi Forum tentang Member */}
      <MemberDiscussionSection member={member} />

      {/* 4. Rekan Satu Tim */}
      <MemberTeammatesSection member={member} />
    </main>
  );
}
