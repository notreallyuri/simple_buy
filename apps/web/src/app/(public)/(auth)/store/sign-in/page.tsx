"use client";
import z from "zod";
import { Input } from "@/components/inputs";
import { Button } from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const submit = (data: FormData) => {
    console.log("Form data:", data);
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
        <a
          href=""
          className="text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Forgot password ?
        </a>
        <h2 className="text-2xl font-semibold">Verify 2FA</h2>
        <div className="flex items-end gap-2">
          <Input
            label="Token"
            id="token"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Button
            label="Request"
            variant="authPrimary"
            className="text-medium w-32"
          />
        </div>
        <Button
          label="Sign in"
          className="mt-2"
          variant="authPrimary"
          type="submit"
        />
      </form>
    </>
  );
}
