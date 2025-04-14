import { Checklist } from "app/components/Checklist";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import { type FieldArrayWithId, useFieldArray } from "react-hook-form";

export const PlayableRoles = ({
  control,
  rolesFields,
  index,
}: Pick<RuleMakeFormChildrenProps, "control"> & {
  rolesFields: FieldArrayWithId<RuleType, "roles", "id">[];
  index: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `decks.${index}.playableRoles`,
  });
  return (
    <>
      <label htmlFor="playableRoles">プレイ可能な役職</label>
      <Checklist
        field={fields}
        labels={[...rolesFields.map(({ name, id }) => ({ label: name, id }))]}
        append={(roleName) => append({ roleName })}
        remove={(field, value) =>
          remove(field.findIndex((f) => f.roleName === value))
        }
      />
    </>
  );
};
