"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/services/queries/Session";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSessionStore } from "src/stores/session";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email là bắt buộc!",
    })
    .email({
      message: "Email không hợp lệ!",
    }),
  password: z
    .string({
      required_error: "Mật khẩu là bắt buộc",
    })
    .min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    }),
});

type SignInFormData = z.infer<typeof signInSchema>;

const LOGIN_DEFAULT_USER = {
  email: "admin@email.com",
  password: "123456",
};

export default function Login() {
  const signInUser = useSessionStore((state) => state.signIn);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: LOGIN_DEFAULT_USER.email,
      password: LOGIN_DEFAULT_USER.password,
    },
  });

  const signInMutation = useMutation({
    mutationFn: (payload: SignInFormData) => signIn(payload),
    onSuccess: (data) => {
      signInUser(data.user, data.accessToken, data.refreshToken);
      router.push("/home");
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        toast.error("Email hoặc mật khẩu không hợp lệ");
      } else {
        toast.error("Đã xảy ra sự cố khi cố gắng đăng nhập !");
      }
    },
  });

  function handleSignIn(data: SignInFormData) {
    signInMutation.mutate(data);
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="card bg-neutral-focus shadow-md m-auto w-96 flex flex-col p-2 items-center">
        <div className="prose">
          <h2>LOGIN</h2>
        </div>

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="card-body w-full flex flex-col gap-4"
        >
          <Input
            label="Email"
            {...register("email")}
            id="email"
            placeholder={LOGIN_DEFAULT_USER.email}
            errorMessage={errors.email?.message}
          />
          <Input
            label="Mật khẩu"
            {...register("password")}
            id="password"
            type="password"
            placeholder={LOGIN_DEFAULT_USER.password}
            errorMessage={errors.password?.message}
          />

          <Button
            bg="primary"
            type="submit"
            isLoading={signInMutation.isLoading}
          >
            Đăng nhập
          </Button>
        </form>
        {/* <span className={isSubmitted ? "opacity-100" : "opacity-0"}>
          THÔNG TIN XÁC NHẬN: <b>{LOGIN_DEFAULT_USER.email}</b> -{" "}
          <b>{LOGIN_DEFAULT_USER.password}</b>
        </span> */}
      </div>
    </div>
  );
}
