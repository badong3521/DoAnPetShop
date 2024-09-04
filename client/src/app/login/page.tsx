"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/services/queries/Session";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSessionStore } from "src/stores/session";
import { z } from "zod";
import { useForm } from "react-hook-form";

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
    .min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    }),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const LOGIN_DEFAULT_USER = {
  email: "",
  password: "",
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
      rememberMe: false,
    },
  });

  const signInMutation = useMutation({
    mutationFn: (payload: SignInFormData) => signIn(payload),
    onSuccess: (data, variables) => {
      signInUser(data.user, data.accessToken, data.refreshToken);

      if (variables.rememberMe) {
        localStorage.setItem("rememberedEmail", variables.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (data.user.name === "ADMIN") {
        toast.success("Đăng nhập ADMIN thành công.");
        router.push("/dashboard/appointments");
        return;
      }
      toast.success("Đăng nhập khách hàng thành công.");
      router.push("/home");
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        toast.error("Email hoặc mật khẩu không hợp lệ");
      } else if (isAxiosError(err)) {
        toast.error(
          `Đã xảy ra sự cố khi cố gắng đăng nhập! ${
            err.response?.data?.message || "Lỗi không xác định"
          }`
        );
      } else {
        toast.error("Đã xảy ra sự cố không xác định khi cố gắng đăng nhập");
      }
    },
  });

  function handleSignIn(data: SignInFormData) {
    signInMutation.mutate(data);
  }

  return (
    <div className="h-screen flex flex-col text-white">
      <Header />
      <div className="card bg-neutral-focus shadow-md m-auto w-96 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="card-body w-full flex flex-col gap-2"
        >
          <div className="prose">
            <h2 className="text-center text-white">Đăng nhập</h2>
          </div>
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
          <div className="flex gap-2 items-center" {...register("rememberMe")}>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-accent"
            />
            <label className="label gap-5 cursor-pointer">
              <span className="label-text text-left">
                Ghi nhớ thông tin đăng nhập
              </span>
            </label>
          </div>
          <div className="h-3" />
          <Button
            type="submit"
            isLoading={signInMutation.isLoading}
            bg="submit"
          >
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}
