import { css } from "@ss/css";
import { Checklist } from "app/components/Checklist";
import type { RuleMakeFormChildrenProps } from "app/types";
import { parseName } from "app/utils/parseName";

export const VisibleRoles = ({
  control,
  index,
  areaIndex,
  roleNames,
}: Pick<RuleMakeFormChildrenProps, "control"> & {
  index: number;
  areaIndex: number;
  roleNames: string[];
}) => {
  return (
    <>
      <label
        htmlFor="visibleRoles"
        className={css({
          gridColumn: "3/-1",
        })}
      >
        確認可能なロール
      </label>
      <Checklist
        control={control}
        name={`fieldAreas.${index}.field.${areaIndex}.visibleRoles`}
        labels={roleNames}
        checkOn={(append) => (value) =>
          append({ roleName: parseName(value, "RoleName") })
        }
        checkOff={(remove) => (field, value) =>
          remove(field.findIndex((f) => f.roleName === value))
        }
        className={css({
          gridColumn: "3/-1",
        })}
      />
    </>
  );
};
