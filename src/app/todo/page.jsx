"use client";

import { useState } from "react";
import Detail from "@/components/detail";
import ProjectCard from "@/components/projectCard";
import TodoCard from "@/components/todoCard";

export default function TodoPage() {
  const testData = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 flex justify-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col h-full w-140 gap-4 p-4 overflow-y-auto shrink-0 no-scrollbar">
            <ProjectCard data={"debug"} />
            <ProjectCard data={"debug"} />
          </div>
          <div className="w-full flex justify-center">
            <div className="border-4">
              <div className="flex justify-center items-center w-144 m-4">
                <span>2024.07.30</span>
              </div>
              <div>
                <ul className="divide-y divide-gray-200 px-4">
                  <div className="flex flex-col gap-2">
                    {testData.map((data, idx) => (
                      <TodoCard key={idx} id={data} />
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Detail />
    </div>
  );
}

function Todo() {
  const [post, setPost] = useState({
    title: "",
    detail: "",
    due_date: "",
    tag: "",
    project: "",
    status: {
      done: false,
      is_public: false,
    },
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/todo/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          detail: post.detail,
          due_date: post.due_date,
          tag: post.tag,
          project: post.project,
          status: post.status,
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="m-3 flex flex-col gap-3">
      <h1>TODO Page</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-2xl gap-1 rounded-md outline outline-black-500"
      >
        <label className="flex flex-col m-1">
          <span className="font-semibold">title</span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          ></input>
        </label>
        <label className="flex flex-col m-1">
          <span className="font-semibold">details</span>
          <textarea
            value={post.detail}
            onChange={(e) => setPost({ ...post, detail: e.target.value })}
            placeholder="입력..."
            required
          ></textarea>
        </label>
        <label className="flex flex-col m-1">
          <span className="font-semibold">due date</span>
          <input
            value={post.due_date}
            onChange={(e) => setPost({ ...post, due_date: e.target.value })}
            placeholder="2024/07/31"
            required
          ></input>
        </label>
        <label className="flex flex-col m-1">
          <span className="font-semibold">tag</span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            pattern="^#[^# ]+$"
            placeholder="#example_tag"
          ></input>
        </label>
        <label className="flex flex-row-reverse m-1 gap-2">
          <span className="font-semibold mr-3">Make Public</span>
          <input
            type="checkbox"
            className="accent-blue-500"
            checked={post.status.is_public}
            onChange={(e) =>
              setPost({
                ...post,
                status: {
                  ...post.status,
                  is_public: !post.status.is_public,
                },
              })
            }
          ></input>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {submitting ? "submitting..." : "submit"}
        </button>
      </form>
    </div>
  );
}
