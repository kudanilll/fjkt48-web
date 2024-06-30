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
import { FcGoogle } from "react-icons/fc";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  function handleLogin() {
    setIsLoading(!isLoading);
  }
  return (
    <Flex className="min-h-screen" direction="row">
      <Flex className="w-full md:w-1/2 p-6 items-center" justify="center">
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
              <Flex direction="column" gap="3">
                <Box>
                  <Text size="2">Email</Text>
                  <TextField.Root
                    size="3"
                    placeholder="Masukan Email Anda"
                    type="email"
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
                <Flex justify="end">
                  <Link href="/" color="gray" size="1">
                    Lupa password?
                  </Link>
                </Flex>
                <Button size="3" loading={isLoading} onClick={handleLogin}>
                  Masuk
                </Button>
                <Flex direction="row" justify="center" className="items-center">
                  <div className="border-b border-inherit flex-1" />
                  <small className="px-2">Atau masuk dengan</small>
                  <div className="border-b border-inherit flex-1" />
                </Flex>
                <Button size="3" color="blue" variant="soft">
                  <FcGoogle /> Masuk dengan Google
                </Button>
                <Flex justify="center">
                  <small>
                    Tidak punya akun?{" "}
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
          src="/test/auth-bg.png"
          alt="Login Image"
          width={500}
          height={500}
          className="object-contain h-full w-full"
        />
      </div>
    </Flex>
  );
}
