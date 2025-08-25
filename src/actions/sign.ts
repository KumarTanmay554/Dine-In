// "use server"

// import { z } from "zod"
// import { validationSchema } from "../../pages/api/auth/signup"

// export const handleRegister = (values:z.infer<typeof validationSchema>)=>{
//     const validated = validationSchema.safeParse(values);

//     if(!validated.success){
//         return {error:"Invalid Inputs",errors:validated.error.errors}
//     }
//     return {success:"Registered Successfully"}
// }