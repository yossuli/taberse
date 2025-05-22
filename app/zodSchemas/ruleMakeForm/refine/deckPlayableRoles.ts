import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { emptyIter2Null } from "app/utils/emptyIter2Null";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { decksSchema } from "../decksSchema";
import { template } from "./template";

export type Decks = z.infer<typeof decksSchema>;

export const deckPlayableRoles = (
  decks: Decks,
  roleNames: string[],
  ctx: z.RefinementCtx,
) => {
  callWithIfDefine(
    findWithIndexResult(decks, (deck) =>
      emptyIter2Null(
        deck.playableRoles.filter(
          ({ roleName }) => !roleNames.includes(roleName),
        ),
      ),
    ),
    ([_, index, outliers]) => {
      if (outliers) {
        ctx.addIssue({
          code: "custom",
          message: template.roles(
            roleNames,
            `decks[${index}].deck.playableRoles`,
            objArr2StrArr(outliers, "roleName"),
          ),
        });
      }
    },
  );
};
