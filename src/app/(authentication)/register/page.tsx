"use client";
import { Box, Button, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { register } from "@/services/auth/service";
import { RegisterFormData, RegisterSchema } from "@/models/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { equals, isEmail } from "validator";
import FormField from "@/components/ui/form/field";
import FormFieldPassword from "@/components/ui/form/field-password";
import toast from "react-hot-toast";
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
    if (!isEmail(data.email)) {
      toast.error("Email tidak valid");
      return;
    }
    if (equals(data.password, data.confirmPassword)) {
      if (!(data.password.length >= 8)) {
        toast.error("Panjang password harus lebih dari 8 karakter");
        return;
      }
      const response = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.res) {
        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          router.push("/login");
        }
      } else {
        toast.success(response.message);
      }
    } else {
      toast.error("Password dan konfirmasi password tidak sama.");
    }
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
                    register={reg}
                    options={{ required: true }}
                  />
                  <FormField
                    label="Email"
                    placeholder="Masukan Email Anda"
                    type="email"
                    register={reg}
                    options={{ required: true }}
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <FormFieldPassword
                      label="Password"
                      placeholder="Password"
                      register={reg}
                      options={{ required: true, minLength: 8 }}
                    />
                    <FormFieldPassword
                      label="Konfirmasi Password"
                      regLabel="confirmPassword"
                      placeholder="Konfirmasi"
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
