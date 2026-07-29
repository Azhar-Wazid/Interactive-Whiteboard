"use client";
import { Stage, Layer, Rect } from "react-konva";
import useWindowSize from "@/hooks/WindowResize"

export default function Canvas() {
  const { winWidth, winHeight } = useWindowSize();
  return (
    <Stage width={winWidth} height={winHeight}>
      <Layer>
        <Rect
          x={100}
          y={100}
          width={200}
          height={100}
          fill="red"
          draggable
        />
      </Layer>
    </Stage>
  );
}