"use server";
import { PrismaClient } from "@prisma/client";
import tokenChecker from "@/app/middlewares/token-checker";

const prisma = new PrismaClient();

export const getuserbyToken = async () =>
  tokenChecker(async ({ payload: decodedEmail }: { payload: any }) => {
    console.log("This function is running");
    try {
      console.log(decodedEmail);
      if (!decodedEmail || !decodedEmail.email) {
        throw new Error(
          "Unauthorized Request: Invalid token (email not found)"
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: decodedEmail.email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          city: true,
          phone: true,
          created_at: true,
        },
      });
      if (!user) {
        throw new Error("Unauthorized Request: User Not Found");
      }

      return {
        data: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          city: user.city,
          phone: user.phone,
          created_at: user.created_at,
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
    // const tokenbearer = req.headers.authorization as string;
    // if(!tokenbearer){
    //     return res.status(401).json({error:"Unauthorized Request: No Token Provided"});
    // }

    // const token = tokenbearer.split(" ")[1];

    // const decoded = jwt.decode(token) as {email:string};
    // if(!decoded.email){
    //     return res.status(401).json({error:"Unauthorized Request"})
    // }

    // const userdecoed = await prisma.user.findUnique({
    //     where:{
    //         email:decoded.email
    //     },
    //     select:{
    //         email:true,
    //         first_name:true,
    //         last_name:true,
    //         city:true,
    //         phone:true,
    //         created_at:true,
    //         updated_at:true,
    //         id:true
    //     }
    // })
    // if(!userdecoed){
    //     return res.status(401).json({error:"User Not Found"})
    // }
    // return res.status(200).json({
    //     id:userdecoed?.id,
    //     email:userdecoed?.email,
    //     firstName:userdecoed?.first_name,
    //     lastName:userdecoed?.last_name,
    //     city:userdecoed?.city,
    //     phone:userdecoed?.phone,
    //     created_at:userdecoed?.created_at,
    // })
  });
