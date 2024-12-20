"use client";
import { Button } from "@radix-ui/themes";
// import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/api/auth/signin?callbackUrl=" + pathname);
  //   }
  // }, [pathname, router, status]);
  // if (status === "unauthenticated") return <></>;
  return (
    <div>
      <h1>Halaman ini sedang dalam tahap pengembangan.</h1>
      {/* <Button onClick={logout}>Keluar</Button> */}
    </div>
  );
}
