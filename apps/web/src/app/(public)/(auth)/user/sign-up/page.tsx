"use client";
import { createUserSchema, type CreateUserType } from "@acme/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { trpc } from "@acme/client";
import { Input } from "@/components/inputs";
import { Button } from "@/components/button";
import { useState } from "react";
import { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@acme/server";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
  });

  const signUpMutation = trpc.user.create.useMutation({
    onError: (err: TRPCClientErrorLike<AppRouter>) => {
      setErrorMessage(err.message);
    },
  });

  const submit = async (data: CreateUserType) => {
    const res = await signUpMutation.mutateAsync(data);
    console.log("Login Success:", res.user);

    setCookie("token", res.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    router.push(`/${res.user.id}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex h-full w-full flex-col gap-4"
      >
        <h1 className="mb-4 text-4xl font-semibold">Sign up</h1>
        <Input
          label="Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Username"
          {...register("username")}
          error={errors.username?.message}
        />
        <Input
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input label="Age" {...register("age")} error={errors.age?.message} />
        {errorMessage && (
          <p className="py-2 font-medium text-red-500">{errorMessage}</p>
        )}
        <Button
          label="Sign up"
          className="mt-auto"
          variant="authPrimary"
          type="submit"
        />
      </form>
    </>
  );
}
