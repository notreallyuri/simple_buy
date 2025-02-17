"use client";
import z from "zod";
import { Input } from "@/components/inputs";
import { Button } from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@acme/client";
import { useState } from "react";
import { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@acme/server";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const loginMutation = trpc.user.login.useMutation({
    onError: (err: TRPCClientErrorLike<AppRouter>) => {
      setErrorMessage(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (data: FormData) => {
    setErrorMessage("");

    try {
      const res = await loginMutation.mutateAsync(data);
      console.log("Login Success:", res);
      setCookie("token", res.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      router.push(`/user/${res.userId}`);
    } catch (err) {
      console.error("Login Failed", err);
      setErrorMessage(err as string);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex h-full w-full flex-col gap-4"
      >
        <h1 className="mb-4 text-4xl font-semibold">Sign in</h1>
        <Input
          label="Email"
          id="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          showPasswordToggle
        />
        <Button
          label="Sign in"
          className="mt-auto"
          variant="authPrimary"
          type="submit"
        />
        {errorMessage && (
          <p className="text-error-400 text-xs">{errorMessage}</p>
        )}
      </form>
    </>
  );
}
