import { cx } from "@ss/css";
import { grid } from "@ss/patterns";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import { type FieldArrayWithId, useFieldArray } from "react-hook-form";

export const PlayableRoles = ({
  trigger,
  register,
  control,
  rolesFields,
  index,
}: RuleMakeFormChildrenProps & {
  rolesFields: FieldArrayWithId<RuleType, "roles", "id">[];
  index: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `decks.${index}.playableRoles`,
  });
  console.log("p fields", fields);
  return (
    <div>
      <label htmlFor="playableRoles">プレイ可能な役職</label>
      <div
        className={cx(
          grid({
            columns: rolesFields.length,
          }),
        )}
      >
        {rolesFields.map((field, i) => (
          <div key={field.id}>
            {field.name}
            <input
              type="checkbox"
              {...register(`decks.${index}.playableRoles.${i}.roleName`)}
              checked={fields.some((f) => f.roleName === field.name)}
              onChange={(e) => {
                if (e.target.checked) {
                  append({ roleName: field.name });
                } else {
                  remove(fields.findIndex((f) => f.roleName === field.name));
                }
                trigger("decks", {
                  shouldFocus: true,
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
