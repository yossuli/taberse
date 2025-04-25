import { Checklist } from "app/components/Checklist";
import type { RuleMakeFormChildrenProps } from "app/types";

export const PlayableRoles = ({
  control,
  watch,
  index,
}: Pick<RuleMakeFormChildrenProps, "control" | "watch"> & {
  index: number;
}) => {
  const rolesFields = watch("roles");
  return (
    <>
      <label htmlFor="playableRoles">プレイ可能な役職</label>
      <Checklist
        control={control}
        name={`decks.${index}.playableRoles`}
        labels={rolesFields.map(({ name }) => name)}
        checkOn={(append) => (value) => append({ roleName: value })}
        checkOff={(remove) => (field, value) =>
          remove(field.findIndex((f) => f.roleName === value))
        }
      />
    </>
  );
};
