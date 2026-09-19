import { useState, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { ToolHandlers } from "@/types/whiteboard";
import type { ToolProps, Line } from "@/types/whiteboard"


export default function useFreeDrawingTool(tool: "pen" | "eraser"): ToolHandlers{
  const currentLine = useState<Line | null>(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if(!stage) return;
    const pos = stage.getPointerPosition();
    if(!pos) return;
    isDrawing.current = true;
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    if(!stage) return;
    const point = stage.getPointerPosition();
    if(!point) return;
    let lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  console.log(lines)

  return {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp
  };
}