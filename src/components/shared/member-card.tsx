"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react";
import TeamBadge from "@/components/shared/team-badge";
import type { JKT48Member } from "@/types/jkt48-types";

interface MemberCardProps {
  member: JKT48Member;
  priority?: boolean;
}

export default function MemberCard({
  member,
  priority = false,
}: MemberCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-300 dark:hover:border-crimson-900/60 hover:shadow-xl hover:shadow-crimson-950/5">
      {/* Photo Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {!imageError ? (
          <Image
            src={member.photo}
            alt={`Foto profil resmi ${member.name} (${member.nickname})`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={priority}
            onError={() => setImageError(true)}
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-400 text-xs font-medium">
            {member.nickname}
          </div>
        )}

        {/* Gradient Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10 opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Team Badge Top Left */}
        <div className="absolute top-2.5 left-2.5">
          <TeamBadge team={member.type} size="sm" />
        </div>

        {/* Favorite / Oshi Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
          aria-label={`Jadikan ${member.name} sebagai oshi`}
          className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 active:scale-95"
        >
          <Heart
            weight={isFavorited ? "fill" : "bold"}
            className={`h-4 w-4 transition-colors ${
              isFavorited ? "text-crimson-500" : "text-white"
            }`}
          />
        </button>

        {/* Nickname overlay on bottom of photo */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-baseline justify-between text-white">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200 drop-shadow-sm">
            {member.nickname}
          </span>
          <span className="text-[10px] font-mono text-neutral-300">
            #{member.jkt48_member_id}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3.5 flex flex-col justify-between gap-1 flex-1">
        <h3 className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-50 truncate group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
          Team {member.type.charAt(0) + member.type.slice(1).toLowerCase()}
        </p>
      </div>
    </article>
  );
}
