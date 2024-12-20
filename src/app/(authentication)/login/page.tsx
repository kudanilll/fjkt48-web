"use client";
import { Box, Button, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { LoginFormData, LoginSchema } from "@/models/schema/form";
import { login, loginGoogle } from "@/services/auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import FormField from "@/components/ui/form/field";
import FormFieldPassword from "@/components/ui/form/field-password";
import isEmail from "validator/lib/isEmail";
import Image from "next/image";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl: string = `${queryParams.callbackUrl}` || "/";

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setQueryParams(params);
  }, [searchParams]);

  async function onSubmit(data: LoginFormData) {
    if (!isEmail(data.email)) {
      toast.error("Email tidak valid");
      return;
    }
    try {
      const response = await login(data, callbackUrl, router);
      if (response?.error) {
        toast.error("Login gagal", { description: response?.error });
        return { error: true, message: response?.error };
      }
      toast.success("Login berhasil");
      router.push(callbackUrl);
    } catch (error) {
      toast.error("Login gagal", { description: `${error}` });
    }
  }

  async function handleGoogleLogin() {
    try {
      const res = await loginGoogle(callbackUrl);
      if (res.success) {
        toast.success("Login berhasil");
        router.push(res.callbackUrl || callbackUrl);
      } else {
        toast.error("Login dengan Google gagal", { description: res.error });
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat login dengan Google");
    }
  }

  return (
    <Flex className="h-full" direction="row">
      <Flex
        className="w-full md:w-1/2 p-6 items-center"
        justify="center"
        style={{
          minHeight: "100vh",
          alignItems: "center",
        }}>
        <Box className="w-full max-w-md">
          <Card>
            <Flex direction="column" px="4" py="6">
              <div className="hidden md:block">
                <Flex direction="column" className="mb-4">
                  <Heading>Selamat datang kembali!</Heading>
                  <Text size="2">Silakan masukkan detail login di bawah</Text>
                </Flex>
              </div>
              <Heading className="mb-4 md:hidden">
                Selamat datang kembali!
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="3">
                  <FormField
                    label="Email"
                    placeholder="Masukan Email Anda"
                    type="email"
                    errors={errors}
                    register={register}
                    options={{ required: true }}
                  />
                  <FormFieldPassword
                    label="Password"
                    placeholder="Masukan Password Anda"
                    errors={errors}
                    register={register}
                    options={{ required: true, minLength: 8 }}
                  />
                  <Flex justify="end">
                    <Link href="/" color="gray" size="1">
                      Lupa password?
                    </Link>
                  </Flex>
                  <Button
                    size="3"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit">
                    Masuk
                  </Button>
                </Flex>
              </form>
              <Flex direction="column" gap="3" pt="2">
                <Flex direction="row" justify="center" className="items-center">
                  <div className="border-b border-inherit flex-1" />
                  <small className="px-2">Atau masuk dengan</small>
                  <div className="border-b border-inherit flex-1" />
                </Flex>
                <Button
                  size="3"
                  color="blue"
                  variant="soft"
                  onClick={handleGoogleLogin}>
                  <FcGoogle /> Masuk dengan Google
                </Button>
                <Flex justify="center">
                  <small>
                    {"Tidak punya akun? "}
                    <Link href="/register">Daftar disini</Link>
                  </small>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Flex>
      <div className="hidden md:block md:w-1/2">
        <Image
          src="/assets/auth-bg.png"
          alt="Login Image"
          width={500}
          height={500}
          className="object-contain h-full w-full"
          priority
        />
      </div>
    </Flex>
  );
}
