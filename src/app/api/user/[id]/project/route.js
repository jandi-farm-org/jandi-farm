import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { connectToDB } from "@/utils/database";
import Project from "@/models/project";
import User from "@/models/user"
import mongoose from "mongoose";
import { NextResponse } from "next/server";

/// /api/user/[id]/project GET 요청
/// [요약] id에 해당하는 User의 Project Document들을 불러옵니다.
/// id에 해당하는 User의 공개 설정된 Project들을 불러오며,
/// 소유자 본인인 경우, 공개 설정과 관계 없이 모든 Project를 불러옵니다.
/// 권한: 소유자(비공개) | 없음(공개)
///
/// * session이 없으면 401 반환
/// * 성공시 200 반환(*아무것도 없어도 200 반환)
/// * 존재하지 않는 User인 경우, 404 반환
/// * 서버 에러시 500 반환
export const GET = async (req, { params }) => {
  const { id: userId } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json("You must be logged in.", { status: 401 });
  }

  if (!mongoose.isValidObjectId(userId)) {
    return NextResponse.json("Invalid User ID.", { status: 422 });
  }

  try {
    await connectToDB();
    
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json("User not found.", { status: 404 });
    }

    // let filter = {};
    // filter.owner = userId;
    // if (userId !== session.user.id) {
    //   filter.is_public = true;
    // }

    const existingProjects = await Project.find((userId === session.user.id) ? {
      $or: [
        { owner: userId },
        { shared_users: userId },
        { is_public: true }
      ]
    } : {
      is_public: true
    }).lean();

    return NextResponse.json(existingProjects, { status: 200 });
  } catch (error) {
    console.log('[에러] /api/user/[id]/project GET 실패');
    console.log(error);
    return NextResponse.json('Failed to fetch requested Project Lists', { status: 500 });
  }
}