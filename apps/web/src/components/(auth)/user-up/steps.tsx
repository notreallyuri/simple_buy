import { useFormContext } from "react-hook-form";
import { Input } from "@/components/inputs";

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
        type="password"
        showPasswordToggle
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
