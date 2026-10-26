import * as z from "zod";

export const UserObj = z.object({
    username: z.string(),
    email: z.email(),
    password:z.string()
});

export const UserSigninObj = z.object({
    email: z.email(),
    password:z.string()
});