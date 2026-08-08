"use client";
import { Stage, Layer, Rect, Line } from "react-konva";
import useWindowSize from "@/hooks/WindowResize"
import useFreeDrawingTool from "@/hooks/toolbar/useFreehand";
import { Tool, ToolHandlers } from "@/types/whiteboard";

type CanvasProps = {
  tool: Tool
}

export default function Canvas({ tool }: CanvasProps) {
  const { winWidth, winHeight } = useWindowSize();
  
  const freehandTool = useFreeDrawingTool(tool === "eraser" ? "eraser" : "pen");
  
  const tools: Record<Tool, ToolHandlers> = {
    select: {
      onMouseDown: () => {},
      onMouseMove: () => {},
      onMouseUp: () => {},
    },

    pen: freehandTool,

    rectangle: {
      onMouseDown: () => {},
      onMouseMove: () => {},
      onMouseUp: () => {},
    },

    eraser: freehandTool,
  };

  const activeTool = tools[tool];

  return (
    <Stage 
      width={winWidth} 
      height={winHeight}
      onMouseDown={activeTool.onMouseDown}
      onMouseMove={activeTool.onMouseMove}
      onMouseUp={activeTool.onMouseUp}
      >
      <Layer>
        {freehandTool.lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="white"
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
          />
        ))}
        <Rect
          x={100}
          y={100}
          width={200}
          height={100}
          fill="red"
          draggable={tool === "select"}
        />
      </Layer>
    </Stage>
  );
}