"use client";
import Link from "next/link";
import { PawPrint, SignIn } from "phosphor-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="navbar border-b-2">
      <div className="flex-1">
        <Link href="/" className="btn-client btn-link prose">
          <h2 className="flex items-center justify-center font-bold underline text-white">
            <PawPrint size={32} weight="fill" /> PETSHOP{" "}
            <PawPrint size={32} weight="fill" />
          </h2>
        </Link>
      </div>
      <Button
        bg={"accent"}
        onClick={() => {
          router.push("/sign-up");
        }}
      >
        Đăng Ký
      </Button>
      <Button bg="ghost" tooltipText="Đăng nhập" tooltipBottom asChild>
        <Link href={"/login"}>
          <SignIn className="h-5 w-5" />
        </Link>
      </Button>
    </header>
  );
}
