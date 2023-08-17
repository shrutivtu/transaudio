import { RefObject } from "react";
import { TranscriptType, TranscriptBlockType } from "../types";

export const TranscriptBlock = ({
  transcript,
  wordsRef
}: {
  transcript: TranscriptType;
  wordsRef: RefObject<HTMLSelectElement>
}) => {
  return (
    <section className="transcript-blocks" ref={wordsRef}>
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
