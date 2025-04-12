import { zodResolver } from "@hookform/resolvers/zod";
import type { Routes } from "app/.hc.type";
import { RuleSchema, type RuleSchemaType } from "app/zodSchemas";
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
    formState: { errors },
  } = useForm<RuleSchemaType>({
    resolver: zodResolver(RuleSchema),
    shouldUnregister: false,
    reValidateMode: "onBlur",
  });
  const onError: SubmitErrorHandler<RuleSchemaType> = (error) => {
    console.error("error", error);
  };

  const onSubmit: SubmitHandler<RuleSchemaType> = (data) => {
    client.api.test.game.$post(
      {
        json: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit, onError),
    register,
    trigger,
    errors,
  };
};
