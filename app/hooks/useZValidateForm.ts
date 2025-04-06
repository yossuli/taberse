import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import type { z } from "zod";
export const useZValidateForm = <T extends z.ZodObject<any>>(schema: T) => {
  type SchemaType = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    shouldUnregister: false,
    reValidateMode: "onBlur",
  });
  const onError: SubmitErrorHandler<SchemaType> = (error) => {
    console.error("error", error);
  };

  return {
    control,
    handleSubmit,
    register,
    trigger,
    onSubmit: (onSubmit: SubmitHandler<SchemaType>) =>
      handleSubmit(onSubmit, onError),
    errors,
  };
};
