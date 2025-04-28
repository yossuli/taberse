import { zodResolver } from "@hookform/resolvers/zod";
import type { Routes } from "app/.hc.type";
import { defaultValues } from "app/constants/ruleMakeForm/defaultValues";
import type { RuleType } from "app/types";
import { RuleSchema } from "app/zodSchemas/ruleMakeForm";
import { hc } from "hono/client";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
export const useRuleMakeForm = () => {
  const client = hc<Routes>("");

  const {
    control,
    handleSubmit,
    register,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RuleType>({
    resolver: zodResolver(RuleSchema),
    reValidateMode: "onBlur",
    defaultValues,
  });
  const onError: SubmitErrorHandler<RuleType> = (error) => {
    console.error("error", error);
  };
  const onSubmit: SubmitHandler<RuleType> = async (data) => {
    const res = await client.api.test.game.$post(
      {
        json: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const json = await res.json();
    console.log("response", json);
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit, onError),
    register,
    trigger,
    watch,
    errors,
  };
};
