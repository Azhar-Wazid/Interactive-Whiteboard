import { useState } from "react"
import type { ToolProps } from "@/types/whiteboard"

export default function Toolbar({ tool, setTool }: ToolProps){
    console.log(tool)
        return (
        <div>
            <button onClick={() => setTool("select")}>
                Select
            </button>

            <button onClick={() => setTool("pen")}>
                Pen
            </button>

            <button onClick={() => setTool("eraser")}>
                Eraser
            </button>

            <button onClick={() => setTool("rectangle")}>
                Rectangle
            </button>

        </div>
    );
}