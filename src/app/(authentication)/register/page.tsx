"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import { register } from "@/services/auth/service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiHide, BiShow } from "react-icons/bi";
import { equals, isEmail } from "validator";
import toast from "react-hot-toast";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputConfirmPass, setInputConfirmPass] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  async function handleSubmit() {
    if (!isEmail(inputEmail)) {
      toast.error("Email tidak valid");
      return;
    }
    setIsLoading(true);
    if (equals(inputPassword, inputConfirmPass)) {
      if (!(inputPassword.length >= 8)) {
        toast.error("Panjang password harus lebih dari 8 karakter");
        setIsLoading(false);
        return;
      }
      const response = await register({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      });
      setIsLoading(false);
      if (response.res) {
        if (response.error) {
          toast.error(response.message);
        } else {
          // reset
          setInputName("");
          setInputEmail("");
          setInputPassword("");
          setInputConfirmPass("");

          toast.success(response.message);
          router.push("/login");
        }
      } else {
        toast.success(response.message);
      }
    } else {
      setIsLoading(false);
      toast.error("Password dan konfirmasi password tidak sama.");
    }
  }

  return (
    <Flex className="min-h-screen" direction="row">
      <div className="hidden md:block md:w-1/2">
        <Image
          src="/assets/auth-bg.png"
          alt="Login Image"
          width={500}
          height={500}
          className="object-contain h-full w-full"
        />
      </div>
      <Flex className="w-full md:w-1/2 p-6 items-center" justify="center">
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
              <Flex direction="column" gap="3">
                <Box>
                  <Text size="2">Nama</Text>
                  <TextField.Root
                    size="3"
                    placeholder="Masukan Nama Anda"
                    type="text"
                    onChange={(e) => setInputName(e.target.value)}
                    required>
                    <TextField.Slot />
                  </TextField.Root>
                </Box>
                <Box>
                  <Text size="2">Email</Text>
                  <TextField.Root
                    size="3"
                    placeholder="Masukan Email Anda"
                    type="email"
                    onChange={(e) => setInputEmail(e.target.value)}
                    required>
                    <TextField.Slot />
                  </TextField.Root>
                </Box>
                <Box>
                  <Text size="2">Password</Text>
                  <TextField.Root
                    size="3"
                    placeholder="Masukan Password Anda"
                    type={hidePassword ? "password" : "text"}
                    onChange={(e) => setInputPassword(e.target.value)}
                    required>
                    <TextField.Slot />
                    <TextField.Slot>
                      <IconButton
                        size="2"
                        variant="ghost"
                        onClick={() => setHidePassword(!hidePassword)}>
                        {hidePassword ? <BiHide /> : <BiShow />}
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
                <Box>
                  <Text size="2">Konfirmasi Password</Text>
                  <TextField.Root
                    size="3"
                    placeholder="Konfirmasi Password Anda"
                    type={hidePassword ? "password" : "text"}
                    onChange={(e) => setInputConfirmPass(e.target.value)}
                    required>
                    <TextField.Slot />
                    <TextField.Slot>
                      <IconButton
                        size="2"
                        variant="ghost"
                        onClick={() => setHidePassword(!hidePassword)}>
                        {hidePassword ? <BiHide /> : <BiShow />}
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
                <Flex direction="row" justify="center" className="text-center">
                  <small>
                    Dengan membuat akun, Anda menyetujui{" "}
                    <Link href="/terms-conditions">syarat dan ketentuan </Link>
                    serta <Link href="/privacy-policy">
                      kebijakan privasi
                    </Link>{" "}
                    kami
                  </small>
                </Flex>
                <Button size="3" loading={isLoading} onClick={handleSubmit}>
                  Buat Akun
                </Button>
                <Flex justify="center">
                  <small>
                    Sudah memiliki akun? <Link href="/login">Masuk disini</Link>
                  </small>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Flex>
  );
}
