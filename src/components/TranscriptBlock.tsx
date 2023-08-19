import { TranscriptBlockType, TranscriptBlockProp } from "../types";

export const TranscriptBlock:React.FC<TranscriptBlockProp> = ({
  transcript,
  containerRef,
  handleMouseUp
}) => {
  return (
    <section className="transcript-blocks" ref={containerRef} onMouseUp={handleMouseUp}>
      {transcript &&
        transcript.blocks.map((item: TranscriptBlockType, index: number) => {
          return (
            <p key={index} data-id={index} data-end={(item.end)} data-start={(item.start)} className="transcript-block">
              {item.text}
            </p>
          );
        })}
    </section>
  );
};