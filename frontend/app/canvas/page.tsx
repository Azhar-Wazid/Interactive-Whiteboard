"use client"
import Canvas from "@/components/whiteboard/Canvas"
import Toolbar from "@/components/whiteboard/Toolbar";
import { Tool } from "@/types/whiteboard";
import { useState } from "react"

export default function BoardPage() {
  const [tool, setTool] = useState<Tool>("select")

  return (
    <main>
      <Toolbar tool ={tool} setTool={setTool}/>
      <Canvas tool={tool}/>
    </main>
  );
}