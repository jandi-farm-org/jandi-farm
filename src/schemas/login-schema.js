import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({
    message: "잘못된 email 주소입니다."
  }),
  password: z.string()
});

export default LoginSchema;