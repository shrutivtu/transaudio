import { RefObject } from "react";
import { TranscriptType, TranscriptBlockType } from "../types";

export const TranscriptBlock = ({
  transcript,
  wordsRef,
  handleMouseUp
}: {
  transcript: TranscriptType;
  wordsRef: RefObject<HTMLSelectElement>
  handleMouseUp: (e: any) => void
}) => {
  return (
    <section className="transcript-blocks" ref={wordsRef} onMouseUp={handleMouseUp}>
      {transcript &&
        transcript.blocks.map((item: TranscriptBlockType, index: number) => {
          return (
            <p key={index} id={`id-${index}`} className="transcript-block">
              {item.text}
            </p>
          );
        })}
    </section>
  );
};
