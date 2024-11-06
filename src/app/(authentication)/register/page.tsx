"use client";
import { Box, Button, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { RegisterFormData, RegisterSchema } from "@/models/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { equals } from "validator";
import { toast } from "sonner";
import { validateEmail } from "@/lib/utils";
import FormField from "@/components/ui/form/field";
import FormFieldPassword from "@/components/ui/form/field-password";
import Image from "next/image";

export default function RegisterPage() {
  const {
    register: reg,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  async function onSubmit(data: RegisterFormData) {
    // Validate email
    const validateEmailResult = validateEmail(data.email);
    if (validateEmailResult.isValid === false) {
      toast.error(validateEmailResult.message);
      return;
    }

    // Validate password
    if (equals(data.password, data.confirmPassword!)) {
      if (!(data.password.length >= 8)) {
        toast.error("Panjang password harus lebih dari 8 karakter");
        return;
      }
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      }
    );
    if (response.ok) {
      if (response.status === 200) {
        toast.success("Registrasi Berhasil", {
          description: "Tolong cek email anda",
        });
        router.push(
          "/otp-verification?email=" +
            data.email +
            "&expires=" +
            Date.now() +
            10 * 60 * 1000
        );
      } else toast.error("Registratsi Gagal");
    } else toast.error("Registrasi Gagal");
  }

  return (
    <Flex className="h-full" direction="row">
      <div className="hidden md:block md:w-1/2">
        <Image
          src="/assets/auth-bg.png"
          alt="Register Image"
          width={500}
          height={500}
          className="object-contain h-full w-full"
          priority
        />
      </div>
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
                  <Heading>Registrasi</Heading>
                  <Text size="2">
                    Silakan isi formulir bawah untuk melanjutkan registrasi
                  </Text>
                </Flex>
              </div>
              <Heading className="mb-4 md:hidden">Registrasi</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="3">
                  <FormField
                    label="Nama"
                    regLabel="name"
                    placeholder="Masukan Nama Anda"
                    type="text"
                    errors={errors}
                    register={reg}
                    options={{ required: true }}
                  />
                  <FormField
                    label="Email"
                    placeholder="Masukan Email Anda"
                    type="email"
                    errors={errors}
                    register={reg}
                    options={{ required: true }}
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <FormFieldPassword
                      label="Password"
                      placeholder="Password"
                      errors={errors}
                      register={reg}
                      options={{ required: true, minLength: 8 }}
                    />
                    <FormFieldPassword
                      label="Konfirmasi Password"
                      regLabel="confirmPassword"
                      placeholder="Konfirmasi"
                      errors={errors}
                      register={reg}
                      options={{ required: true, minLength: 8 }}
                    />
                  </div>
                  <Flex
                    direction="row"
                    justify="center"
                    className="text-center">
                    <small>
                      Dengan membuat akun, Anda menyetujui{" "}
                      <Link href="/terms-conditions">
                        syarat dan ketentuan{" "}
                      </Link>
                      serta{" "}
                      <Link href="/privacy-policy">kebijakan privasi</Link> kami
                    </small>
                  </Flex>
                  <Button
                    size="3"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit">
                    Buat Akun
                  </Button>
                  <Flex justify="center">
                    <small>
                      Sudah memiliki akun?{" "}
                      <Link href="/login">Masuk disini</Link>
                    </small>
                  </Flex>
                </Flex>
              </form>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Flex>
  );
}
