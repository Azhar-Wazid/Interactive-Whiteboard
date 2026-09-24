import { useState, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import type { WhiteboardObject, Line, ToolHandlers } from "@/types/whiteboard"

type AddObject = (object: WhiteboardObject) => void;
type FreehandTool = ToolHandlers & {
  lines: Line[]
}

export default function useFreeDrawingTool(tool: "pen" | "eraser", addObject: AddObject): FreehandTool{
  const [lines, setLines] = useState<Line[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if(!stage) return;
    const pos = stage.getPointerPosition();
    if(!pos) return;
    isDrawing.current = true;
    
    const newLine: Line = {
      id: crypto.randomUUID(),
      type: "line",
      tool,
      points: [pos.x, pos.y],
    };

    setLines([newLine]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    if(!stage) return;
    const point = stage.getPointerPosition();
    if(!point) return;

    
     setLines((previousLines) => {
      if (previousLines.length === 0) {
        return previousLines;
      }

      const lastLine = previousLines[previousLines.length - 1];

      const updatedLine: Line = {
        ...lastLine,
        points: lastLine.points.concat([
          point.x,
          point.y,
        ]),
      };

      return [
        ...previousLines.slice(0, -1),
        updatedLine,
      ];
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) {
      return;
    }
    if (lines.length > 0) {
      const completedLine = lines[lines.length - 1];
      addObject(completedLine);
    } 

    setLines([]);
    isDrawing.current = false;
  };

  return {
    lines,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp
  };
}