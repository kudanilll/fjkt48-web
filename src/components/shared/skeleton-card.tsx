export function SkeletonMemberCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-3 dark:border-neutral-800/80 dark:bg-neutral-900/60 animate-pulse">
      <div className="aspect-3/4 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

export function SkeletonScheduleCard() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-800/80 dark:bg-neutral-900/60 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2">
          <div className="h-4 w-44 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="h-8 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}

export function SkeletonNewsCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800/80 dark:bg-neutral-900/60 animate-pulse space-y-4">
      <div className="space-y-2.5">
        <div className="h-4 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}
