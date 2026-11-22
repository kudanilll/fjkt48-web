import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/shared/section-heading";
import MemberCard from "@/components/shared/member-card";
import ScrollReveal from "@/components/animation/scroll-reveal";
import type { JKT48Member } from "@/types/jkt48-types";

interface MemberSpotlightProps {
  members: JKT48Member[];
}

export default function MemberSpotlight({ members }: MemberSpotlightProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow="Sorotan Roster"
            title="Kenali Idol Favoritmu"
            description="Profil perwakilan member dari Team Love, Team Dream, Team Passion, hingga Trainee generasi terbaru."
          />

          <Link
            href="/member"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300 transition-colors"
          >
            <span>Lihat Semua 50+ Member</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Spotlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {members.map((member, idx) => (
            <ScrollReveal key={member.code} delay={idx * 0.05}>
              <MemberCard member={member} priority={idx < 6} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
