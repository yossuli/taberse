import { zodResolver } from "@hookform/resolvers/zod";
import type { Routes } from "app/.hc.type";
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
    defaultValues: {
      player: {
        min: 1,
        max: 1,
      },
      roles: [{ name: "default" }],
      decks: [
        {
          name: "default",
          playableRoles: [],
          list: [
            {
              name: "default",
              description: "",
              num: 1,
            },
          ],
        },
      ],
      defaultHands: [
        {
          type: "fixed",
          roleFor: "default",
          deckFrom: "default",
          cards: [
            {
              name: "default",
              num: 1,
            },
          ],
        },
      ],
      fieldAreas: [
        {
          name: "default",
          roleFor: "default",
          fieldSize: {
            width: 1,
            height: 1,
          },
          field: [
            {
              name: "default",
              area: {
                l: 0,
                t: 0,
                r: 0,
                b: 0,
              },
            },
          ],
        },
      ],
    },
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
