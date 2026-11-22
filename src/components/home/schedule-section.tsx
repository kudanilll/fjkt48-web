import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/shared/section-heading";
import ScheduleCard from "@/components/shared/schedule-card";
import ScrollReveal from "@/components/animation/scroll-reveal";
import type { JKT48Schedule } from "@/types/jkt48-types";

interface ScheduleSectionProps {
  schedules: JKT48Schedule[];
}

export default function ScheduleSection({ schedules }: ScheduleSectionProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow="Jadwal Mendatang"
            title="Panggung & Pertunjukan Terdekat"
            description="Informasi setlist teater fX Sudirman, tiket 2-shot, dan jadwal event spesial JKT48 bulan ini."
          />

          <Link
            href="/schedule"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300 transition-colors"
          >
            <span>Lihat Semua Jadwal</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {schedules.map((schedule, idx) => (
            <ScrollReveal key={schedule.schedule_id} delay={idx * 0.08}>
              <ScheduleCard schedule={schedule} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
