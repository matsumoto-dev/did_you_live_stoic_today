import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const mockQuestions = [
    { id: 1, text: "question1", answer: "" },
    { id: 2, text: "question2", answer: "" },
    { id: 3, text: "question3", answer: "" },
  ];

  return NextResponse.json(mockQuestions);
}

export async function POST(req: NextRequest) {
  const body = req;
  console.log(body);

  // 回答をDBに登録する
  // 回答に対するコメントを生成する
  const comment = "回答に対するコメントです。";

  return NextResponse.json({ comment: comment });
}
