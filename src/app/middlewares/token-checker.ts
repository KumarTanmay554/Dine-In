"server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const tokenChecker = async function (serverAction: Function) {
  const cook = cookies();
  const token = cook.get("token")?.value;
  // console.log(token);

  if (!token) {
    redirect("/login");
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    // todo | check this function
    const data = await jwtVerify(token, secret);
    return await serverAction(data);
  } catch (error) {
    redirect("/login");
  }
  //   return { error: "Something went wrong" };
};
export default tokenChecker;
