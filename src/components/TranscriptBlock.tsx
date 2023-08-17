import { TranscriptType, TranscriptBlockType } from "../types";

export const TranscriptBlock = ({
  transcript,
}: {
  transcript: TranscriptType;
}) => {
  return (
    <section className="transcript-blocks">
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
