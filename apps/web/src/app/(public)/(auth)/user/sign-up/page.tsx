"use client";
import { createUserSchema, type CreateUserType } from "@acme/schemas";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { trpc } from "@acme/client";
import { Button } from "@/components/button";
import { useState } from "react";
import { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@acme/server";
import { useRouter } from "next/navigation";
import { Steps } from "@/components/(auth)/user-up/steps";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const methods = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
  });

  const signUpMutation = trpc.user.create.useMutation({
    onError: (err: TRPCClientErrorLike<AppRouter>) => {
      setErrorMessage(err.message);
    },
  });

  const handleNext = () => {
    if (step < 2) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submit)}
          className="flex h-full w-full flex-col gap-4"
        >
          <h1 className="mb-2 text-4xl font-semibold">Sign up</h1>
          <Steps current={step} />
          {errorMessage && (
            <p className="py-2 font-medium text-red-500">{errorMessage}</p>
          )}
          <div className="flex gap-4">
            {step === 2 && (
              <Button
                label="Back"
                className=""
                variant="authPrimary"
                type="button"
                onClick={() => handleBack()}
              />
            )}
            {step === 2 ? (
              <Button label="Send" variant="authPrimary" type="submit" />
            ) : (
              <Button
                label="Next"
                variant="authPrimary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
