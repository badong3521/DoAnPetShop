"use client";
import Link from "next/link";
import { SignIn } from "phosphor-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="navbar border-b-2">
      <div className="flex-1">
        <Link href="/" className="btn btn-link prose">
          <h1>Petshop</h1>
        </Link>
      </div>
      <Button
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
