import { KonvaEventObject } from "konva/lib/Node";

export type Tool = "select" | "pen" | "rectangle" | "eraser";

export type ToolProps = {
    tool: Tool,
    setTool: React.Dispatch<React.SetStateAction<Tool>>
};

export type ToolHandlers = {
    onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
    onMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
    onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;
}

export type Line = {
    id: string
    type: "line"
    tool: "pen" | "eraser"
    points: number[]
};

export type WhiteboardObject = Line;