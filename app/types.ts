import type { z } from "zod";
import type { RuleSchema } from "./zodSchemas";

export type Rule = z.infer<typeof RuleSchema>;
