'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import CardWrapper from "./new-todo-comp/cardwrapper"
import ProjectSelector from "./new-todo-comp/project-selector"
import TagSelector from "./new-todo-comp/tag-selector"
import DatePicker from "./new-todo-comp/datepicker"
import { convertTodoFromResponseJSON } from "./utils"

const SubHeader = ({ children }) => (<h2 className="text-xl font-bold mb-3">{children}</h2>)
const VSeperator = () => (<Separator orientation="vertical" className="absolute right-0"/>)

const formSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  due_date: z.date(),
  tag: z.array(z.string()),
  project: z.string(),
  status: z.object({
    done: z.boolean(),
    is_public: z.boolean()
  })
})

const TodoEditor = React.forwardRef(({ gs = placeholder, className, unmount, todoId = null }, ref) => {
  const {
    focusedDate,
    selectedTags,
    selectedProject,
    todoList,
    setTodoList,
    projectList,
    tagList
  } = gs;

  const selectedTodo = todoList.find(todo => todo === todoId);
  if (!selectedTodo && todoId != null) {
    alert('Invalid todo ID detected!')
    unmount();
  }

  const form = useForm({
    defaultValues: {
      title:    selectedTodo?.title ?? '',
      detail:   selectedTodo?.detail ?? '',
      due_date: selectedTodo?.due_date ?? focusedDate,
      tag:      selectedTodo?.tags ?? selectedTags,
      project:  selectedTodo?.project ?? (selectedProject?.title ?? "(없음)"),
      status:   selectedTodo?.status ?? {
        done: false,
        is_public: false
      }
    },
    resolver: zodResolver(formSchema)
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    if (!projectList.find(x => x.title === values.project)) {
      values.project = null;
    }
    values.due_date = format(values.due_date, 'P');

    console.log(values)

    setSubmitting(true);
    try {
      if (!todoId) {
        const res = await fetch("/api/todo/new", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        const json = await res.json();
        setTodoList([...todoList, convertTodoFromResponseJSON(json)]);
      } else {
        const res = await fetch(`/api/todo/${todoId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        const json = await res.json();
        setTodoList(todoList.map(todo => (todo._id === todoId
          ? convertTodoFromResponseJSON(json)
          : todo
        )))
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
    unmount();
  }

  return (
    <CardWrapper title="TODO Editor" className={ className } ref={ref}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="제목"
                    className="border-none
                              focus-visible:ring-offset-0
                              focus-visible:ring-inset
                              font-semibold
                              text-xl"
                    { ...field }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator className="my-0" />
          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    placeholder="내용..."
                    className="w-full h-40 rounded-md px-3 pb-2 pt-3 text-sm focus:outline-none"
                    { ...field }
                  >
                  </textarea>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="mb-1">
                <FormControl>
                  <DatePicker placeholder="마감일을 지정해주십시오..." { ...field } required />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProjectSelector projectList={ projectList.map(x => x.title) } { ...field }/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <TagSelector tagList={tagList} { ...field } />
                </FormControl>
              </FormItem>

            )}
          />
          <div className="flex flex-row-reverse gap-3">
            {
              !submitting ? (
                <Button className="rounded-3xl" type="submit" variant="pcw_create">{todoId ? "저장" : "추가"}</Button>
              ) : (
                <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin"/>{todoId ? "저장 중..." : "추가 중..."}</Button>
              )
            }
            <Button className="rounded-3xl" variant="destructive" onClick={(e)=>{e.preventDefault(); unmount();}}>취소</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
})

export default TodoEditor