"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  File,
  Github,
  Plus,
  Settings,
  Bot,
  Code,
  Play,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroup,
  SidebarInset,
} from '@/components/ui/sidebar';
import { CodeAILogo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';

export default function ProjectWorkspace({ params }: { params: { projectId: string } }) {
  const [generatedCode, setGeneratedCode] = useState(`
'use client';

import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r-md"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => toggleTodo(index)}
            className={\`cursor-pointer p-2 mb-2 rounded-md \${
              todo.completed ? 'line-through bg-gray-200' : 'bg-gray-100'
            }\`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
  `.trim());

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar collapsible="icon" side="left" variant="sidebar">
          <SidebarHeader className="h-16 justify-between border-b px-2">
            <Link href="/" className="flex items-center gap-2">
              <CodeAILogo className="size-7" />
            </Link>
            <SidebarTrigger className="hidden md:flex" />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarGroup>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Files" isActive>
                    <File />
                    <span className="truncate">Files</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span className="truncate">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center gap-3 rounded-md px-2 py-1.5">
                  <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-sidebar-foreground">
                      User
                    </span>
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h2 className="text-lg font-semibold capitalize">{params.projectId.replace('-', ' ')}</h2>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary">
                    <Github className="mr-2" />
                    Push to GitHub
                </Button>
                <Button>
                    <Play className="mr-2" />
                    Run
                </Button>
            </div>
          </header>
          
          <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {/* Editor Panel */}
            <div className="lg:col-span-2 flex flex-col bg-background">
                <div className="flex items-center justify-between p-2 border-b h-12">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="bg-muted">
                            app/page.tsx <ChevronRight className="size-3 ml-1" />
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                    </Button>
                </div>
                <div className="flex-1 overflow-auto p-1">
                     <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto text-sm h-full">
                        <code>{generatedCode}</code>
                    </pre>
                </div>
            </div>

            {/* Preview and Chat Panel */}
            <div className="flex flex-col bg-background">
                <div className="flex-1 flex flex-col">
                     <div className="flex items-center justify-between p-2 border-b h-12">
                        <p className="font-medium">Preview</p>
                    </div>
                    <div className="flex-1 p-4 bg-muted/30">
                        {/* Iframe for live preview would go here */}
                         <Card className="w-full h-full shadow-md">
                            <CardContent className="p-0 h-full">
                                <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg">
                                    <h1 className="text-2xl font-bold mb-4 text-black">Todo List</h1>
                                    <div className="flex mb-4">
                                        <input
                                        type="text"
                                        className="flex-grow p-2 border rounded-l-md text-black"
                                        placeholder="Add a new todo"
                                        />
                                        <Button className="rounded-l-none">
                                        Add
                                        </Button>
                                    </div>
                                    <ul/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="p-4 border-t">
                        <div className="relative">
                            <Textarea placeholder="Describe the changes you want to make..." className="pr-16"/>
                             <Button size="icon" className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                <Bot />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
