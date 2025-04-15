import { Checklist } from "app/components/Checklist";
import type { RuleMakeFormChildrenProps } from "app/types";
import { useFieldArray } from "react-hook-form";

export const PlayableRoles = ({
  control,
  watch,
  index,
}: Pick<RuleMakeFormChildrenProps, "control" | "watch"> & {
  index: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `decks.${index}.playableRoles`,
  });
  const rolesFields = watch("roles");
  return (
    <>
      <label htmlFor="playableRoles">プレイ可能な役職</label>
      <Checklist
        fields={fields}
        labels={rolesFields.map(({ name }) => name)}
        append={(roleName) => append({ roleName })}
        remove={(field, value) =>
          remove(field.findIndex((f) => f.roleName === value))
        }
      />
    </>
  );
};
