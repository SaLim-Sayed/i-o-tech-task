import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const ref = (await cookies()).get("NEXT_LOCALE");
  const data = (await cookies()).getAll();

  return new NextResponse(JSON.stringify({ lang: ref?.value }));
};
