import { TranscriptBlockType, TranscriptBlockProp } from "../types";

export const TranscriptBlock:React.FC<TranscriptBlockProp> = ({
  transcript,
  wordsRef,
  handleMouseUp
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