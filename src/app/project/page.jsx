"use client";

import ProjectCard from "@/components/projectCard";
import Detail from "@/components/detail";
import { useState, useEffect } from "react";
import DateContainer from "@/components/dateContainer";

// TODO
// 나중에 projects DB에서 받아오게 수정

const getProjects = async () => {
  return [
    {
      _id: "abcd",
      owner: "1234",
      title: "토이 프로젝트",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "성균관대 여름방학 토이 프로젝트",
    },
    {
      _id: "efgh",
      owner: "1234",
      title: "정보보호개론",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "3-2 수업 김형식 교수님 정보보호개론",
    },
    {
      _id: "ijkl",
      owner: "1234",
      title: "다이어트",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "다이어트",
    },
  ];
};

export default function ProjcetPage() {
  const [projects, setProjects] = useState([]);
  const [todos, setTodos] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 flex justify-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col h-full w-140 gap-4 p-4 overflow-y-auto shrink-0 no-scrollbar">
            {projects.map((data, idx) => (
              <ProjectCard key={idx} data={data} />
            ))}
          </div>
          <div className="w-full flex justify-center">
            <div className="flex flex-col gap-8 overflow-y-auto no-scrollbar">
              <DateContainer date={"2024-08-31"} events={[1, 2, 3]} />
              <ArrowDown size={48} color="blue" />
              <DateContainer date={"2024-08-31"} events={[1, 2, 3]} />
              <ArrowDown size={48} color="blue" />

              <DateContainer date={"2024-08-31"} events={[1, 2, 3]} />
            </div>
          </div>
        </div>
      </main>
      <Detail />
    </div>
  );
}

const ArrowDown = ({ size = 24, color = "black" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 16L8 12H11V8H13V12H16L12 16Z" fill={color} />
    </svg>
  );
};
