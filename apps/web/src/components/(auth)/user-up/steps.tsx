import { createUserSchema, type CreateUserType } from "@acme/schemas";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { trpc } from "@acme/client";
import { Input } from "@/components/inputs";
import { Button } from "@/components/button";
import { useState } from "react";
import { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@acme/server";
import { useRouter } from "next/navigation";
import { toNumber } from "@acme/utils";

function Step_1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold text-indigo-200">
        Account Data
      </h2>
      <Input
        label="Username"
        {...register("username")}
        error={errors.username?.message?.toString()}
      />
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message?.toString()}
      />
      <Input
        label="Password"
        {...register("password")}
        error={errors.password?.message?.toString()}
      />
      <Input
        label="Phone"
        {...register("phone")}
        error={errors.phone?.message?.toString()}
      />
    </div>
  );
}

function Step_2() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold text-indigo-200">
        Personal Data
      </h2>
      <Input
        label="Name"
        {...register("name")}
        error={errors.name?.message?.toString()}
      />
      <Input
        label="Age"
        {...register("age")}
        error={errors.age?.message?.toString()}
        onChange={(e) => setValue("age", toNumber(e.target.value))}
      />
    </div>
  );
}

export function Steps({ current }: { current: number }) {
  if (current === 1) return <Step_1 />;
  if (current === 2) return <Step_2 />;
}
