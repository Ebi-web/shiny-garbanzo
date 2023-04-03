import z from "zod";

export enum Role {
  User = "user",
  Assistant = "assistant",
  System = "system",
}

export type RoleValuesUnion = (typeof Role)[keyof typeof Role];

export const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.nativeEnum(Role),
      content: z.string(),
    })
  ),
  model: z.string().optional(),
  max_tokens: z.number().int().positive().optional(),
  n: z.number().int().positive().optional(),
});

export type chatInput = z.TypeOf<typeof chatSchema>;
