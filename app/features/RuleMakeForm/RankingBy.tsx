import type { RuleMakeFormChildrenProps } from "app/types";

export const RankingBy = ({ register }: RuleMakeFormChildrenProps) => {
  return (
    <>
      <label htmlFor="rankingBy">ランキング方法</label>
      <select {...register("rankingBy")}>
        <option value="hands">手札</option>
        <option value="points">ポイント </option>
        <option value="manual">手動 </option>
        <option value="none">無し </option>
      </select>
    </>
  );
};
