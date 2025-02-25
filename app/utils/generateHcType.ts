import { inspectRoutes } from "hono/dev";
import path from "path";
import fs from "fs";
import { Env, Hono } from "hono";
import { BlankSchema } from "hono/types";

export const generateHcType = (
  app: Hono<Env, BlankSchema, "/">,
  filename: string = ".hc.type.ts"
) => {
  if (import.meta.env.PROD) {
    return;
  }
  console.log("🚀 Generating type definition...");
  try {
    const apiEndpoints = inspectRoutes(app).filter(
      ({ isMiddleware }) => !isMiddleware
    );
    const typesContent = `import { Hono, ToSchema } from "hono";\nimport { H, ExtractInput, Env, Env } from "hono/types";\n${apiEndpoints
      .map(
        ({ path, method }, i) =>
          `import { ${method} as ${method}${i} } from "./routes${path}"`
      )
      .join(
        "\n"
      )}\ntype PickIn<T extends any[]> = T["0"] extends H<any, any, infer R, any> ? R : never;\ntype PickRes<T extends any[]> = T["0"] extends H<any, any, any, infer R> ? R : never;\ntype RoutesType<T extends any[], M extends string, P extends string, E extends Env = Env> = Hono<E, ToSchema<M, P, ExtractInput<PickIn<T>>, PickRes<T>>, "/">;\n${apiEndpoints.reduce(
      (acc, { path, method }, i) =>
        `${acc}${i ? " | " : ""}RoutesType<typeof ${method}${i}, "${method}", "${path}">`,
      "export type Routes = "
    )}`;
    const outputPath = path.resolve(`app/${filename}`);

    fs.writeFileSync(outputPath, typesContent);
    console.log(`✅ Type definition generated: ${outputPath}`);
  } catch (e) {
    console.error("❌ Error generating types:", e);
  }
};
