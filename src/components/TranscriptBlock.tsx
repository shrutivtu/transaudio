import { TranscriptType, TranscriptBlockType } from "../types";

export const TranscriptBlock = ({ transcript } : { transcript: TranscriptType }) => {
    return(<section>
        {transcript && transcript.blocks.map((item: TranscriptBlockType, index: number) => {
          return (
            <p
              key={index}
              id={`id-${index}`}
            >
              {item.text}
            </p>
          );
        })}
    </section>)
}