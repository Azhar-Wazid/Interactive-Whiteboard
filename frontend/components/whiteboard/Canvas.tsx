"use client";
import { useState, useRef } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import useWindowSize from "@/hooks/WindowResize"
import useFreeDrawingTool from "@/hooks/toolbar/useFreehand";
import { Tool, ToolHandlers, WhiteboardObject } from "@/types/whiteboard";

type CanvasProps = {
  tool: Tool
}

export default function Canvas({ tool }: CanvasProps) {
  const { winWidth, winHeight } = useWindowSize();
  const [objects, setObjects] = useState<WhiteboardObject[]>([]);

  const addObject = (object: WhiteboardObject) => {
    setObjects((previousObjects) => [
      ...previousObjects,
      object,
    ]);
  };
  
  const freehandTool = useFreeDrawingTool(tool === "eraser" ? "eraser" : "pen", addObject);
  
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

  console.log(objects)
  

  return (
    <Stage 
      width={winWidth} 
      height={winHeight}
      onMouseDown={activeTool.onMouseDown}
      onMouseMove={activeTool.onMouseMove}
      onMouseUp={activeTool.onMouseUp}
      >
      <Layer>
        {objects.map((object) => {
          if (object.type === "line") {
            return(
              <Line
              key={object.id}
              points={object.points}
              stroke="white"
              strokeWidth={5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                  object.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
            )
          }
        })}

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
      </Layer>
    </Stage>
  );
}