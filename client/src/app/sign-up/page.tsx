"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/services/queries/Session";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string({
      required_error: "Tên là bắt buộc!",
    }),
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
    confirmPassword: z.string({
      required_error: "Xác nhận mật khẩu là bắt buộc",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và Xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SIGNUP_DEFAULT_USER = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: SIGNUP_DEFAULT_USER.name,
      email: SIGNUP_DEFAULT_USER.email,
      password: SIGNUP_DEFAULT_USER.password,
      confirmPassword: SIGNUP_DEFAULT_USER.confirmPassword,
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (payload: SignUpFormData) => signUp(payload),
    onSuccess: (data) => {
      toast.success("Đăng ký khách hàng thành công");
      router.push("/login");
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(
          `Đã xảy ra sự cố khi cố gắng đăng ký ${err.response?.data.message}`
        );
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
      }
    },
  });

  function handleSignUp(data: SignUpFormData) {
    signUpMutation.mutate(data);
  }

  return (
    <div className="h-screen flex flex-col text-white">
      <Header />
      <div className="card bg-neutral-focus shadow-md m-auto w-96 flex flex-col p-2 items-center">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="card-body w-full flex flex-col gap-1"
        >
          <div className="prose">
            <h2 className="text-center text-white">Đăng ký</h2>
          </div>
          <Input
            label="Tên"
            {...register("name")}
            id="name"
            placeholder={SIGNUP_DEFAULT_USER.name}
            errorMessage={errors.name?.message}
          />
          <Input
            label="Email"
            {...register("email")}
            id="email"
            placeholder={SIGNUP_DEFAULT_USER.email}
            errorMessage={errors.email?.message}
          />
          <Input
            label="Mật khẩu"
            {...register("password")}
            id="password"
            type="password"
            placeholder={SIGNUP_DEFAULT_USER.password}
            errorMessage={errors.password?.message}
          />
          <Input
            label="Nhập lại mật khẩu"
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder={SIGNUP_DEFAULT_USER.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
          <div className="h-3" />
          <Button
            type="submit"
            isLoading={signUpMutation.isLoading}
            bg="submit"
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </div>
  );
}
