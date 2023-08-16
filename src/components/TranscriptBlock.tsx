export const TranscriptBlock = ({ transcript } : { transcript:any}) => {
    return(<section>
        {transcript.blocks.map((item: any, index: number) => {
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