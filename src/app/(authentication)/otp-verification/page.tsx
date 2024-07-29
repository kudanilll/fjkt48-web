"use client";
import {
  Flex,
  Text,
  Heading,
  TextField,
  Button,
  Card,
  Link,
} from "@radix-ui/themes";
import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { toast } from "sonner";

export default function VerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback((index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  }, []);

  const verifyOtp = useCallback(
    async (otpString: string) => {
      setIsVerifying(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/verify/otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: searchParams.get("email"),
              otp: otpString,
            }),
          }
        );
        if (response) {
          if (response.status === 200) {
            toast.success("OTP berhasil diverifikasi");
            router.push("/login");
          } else {
            toast.error("OTP tidak valid atau sudah kadaluarsa", {
              description: "Silakan coba lagi",
            });
          }
        }
      } catch (error) {
        toast.error("Terjadi kesalahan", { description: "Silakan coba lagi" });
      } finally {
        setIsVerifying(false);
      }
    },
    [router, searchParams]
  );

  const debouncedVerify = useMemo(
    () =>
      debounce(() => {
        const otpString = otp.join("");
        if (otpString.length === 6) {
          verifyOtp(otpString);
        }
      }, 300),
    [otp, verifyOtp]
  );

  const handleVerify = useCallback(() => {
    debouncedVerify();
  }, [debouncedVerify]);

  const otpInputs = useMemo(
    () =>
      otp.map((digit, index) => (
        <TextField.Root
          key={index}
          size="3"
          id={`otp-${index}`}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          style={{
            width: "40px",
            textAlign: "left",
            paddingLeft: "4px",
          }}
          maxLength={1}></TextField.Root>
      )),
    [otp, handleChange]
  );

  if (
    !searchParams.get("email") ||
    !searchParams.get("expires") ||
    Date.now() > Number(searchParams.get("expires"))
  )
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: "100vh" }}>
        <Text mb="4">Ups, terjadi kesalahan :(</Text>
        <Button onClick={() => router.back()}>Kembali</Button>
      </Flex>
    );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <Flex direction="column" mb="6">
          <Heading size="6">Verifikasi Email Anda</Heading>
          <Text size="2">
            Masukkan kode 6 digit yang dikirim ke alamat email Anda.
          </Text>
        </Flex>
        <Flex direction="row" gap="2" mb="6" justify="center">
          {otpInputs}
        </Flex>
        <Flex justify="center">
          <Button onClick={handleVerify} disabled={isVerifying}>
            {isVerifying ? "Memverifikasi..." : "Verifikasi OTP"}
          </Button>
        </Flex>
        <Flex justify="center" mt="4">
          <Text size="2">
            {"Tidak menerima kode? "}
            <Link color="blue" href="">
              Kirim ulang
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
