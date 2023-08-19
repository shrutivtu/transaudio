import { useState, useRef, CSSProperties, useEffect, MouseEvent, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTranscriptData } from "../services/transcriptApi";
import { TranscriptBlock, AudioPlayer, PageLoader, BufferLoader } from "../components";
import { debounce } from "../utils";
import { TranscriptBlockType } from "../types";
import { ACTIVE_WORD } from "../constants/app.constant";


function findBlockIndex(blocks: TranscriptBlockType[], startTime: number): number {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (startTime >= block.start && startTime < block.end) {
      return i;
    }
  }
  return -1; // Return -1 if no matching block is found
}

const overrideProp: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "block",
  margin: "0 auto",
  borderColor: "red"
}

const bufferingStyle: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "block",
  margin: "0 auto",
}



const highlightBlock = (newBlock: HTMLParagraphElement, oldBlock?: HTMLParagraphElement) => {
  if(oldBlock === newBlock || newBlock.classList.contains(ACTIVE_WORD)) return;
  oldBlock?.classList.remove(ACTIVE_WORD);
  newBlock.classList.add(ACTIVE_WORD);
}

export const Transcript = () => {
  const { transcriptId } = useParams<{ transcriptId?: string }>() || {};
  const [currentBlock, setCurrentBlock] = useState(0);
  const [paragraphs, setParagraphs] = useState<HTMLParagraphElement[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLSelectElement | null>(null);
  const [ buffering, setBuffering ] = useState(true);
  const highlightBlockWithDebounce = debounce(highlightBlock, 100);


  const { isLoading, error, data } = useQuery({
    queryKey: ['transcriptData'],
    queryFn: () => transcriptId && fetchTranscriptData(transcriptId)
  })

  useEffect(() => {
    if (!containerRef.current) return;
    const children = [...containerRef.current?.querySelectorAll('p') ?? []];
    setParagraphs(children);
  }, [data]);

  const getBlockIndex = useCallback(()=>{
    if (!audioRef.current?.currentTime || !data) return 0;
    return findBlockIndex(data.blocks, audioRef.current?.currentTime);
  },[data])

  const handleTimeUpdate = () => {
    if (audioRef.current?.currentTime) {
      const blockIndex = getBlockIndex();
      if (currentBlock !== blockIndex || blockIndex === 0) {
        const targetNode = paragraphs[blockIndex];
        if (!targetNode) return;
        setCurrentBlock(blockIndex);
        const oldBlock = containerRef.current?.querySelector(`.${ACTIVE_WORD}`) as HTMLParagraphElement;
        highlightBlockWithDebounce(targetNode, oldBlock);
      }
    }
  }

  const handleSelected = (e: MouseEvent<HTMLElement>): void => {
    if (!containerRef.current || !audioRef.current) return;
    const clickedIndex = paragraphs.indexOf(e.target as HTMLParagraphElement);
    const targetNode = paragraphs[clickedIndex];  
    if (!targetNode) return;
    const oldBlock = containerRef.current?.querySelector(`.${ACTIVE_WORD}`) as HTMLParagraphElement;
    highlightBlockWithDebounce(targetNode, oldBlock)
    if (targetNode.dataset.start) { 
      audioRef.current.currentTime = parseFloat(targetNode.dataset.start); 
      audioRef.current.play();
    }
  }

  const scrollToNode = useCallback(() => {
    const node = paragraphs[getBlockIndex()]

    node.scrollIntoView({
      behavior: 'smooth', 
      block: 'center', 
      inline: 'nearest'
    });
  }, [getBlockIndex, paragraphs])

  if (isLoading) {
    
    return <PageLoader isLoading={isLoading} color="#3498db" overrideProp={overrideProp} />
  }

  if (error instanceof Error) return 'An error has occurred: ' + error.message

  return (
    <main className="transcript-root">
      <section className="transcript-text_container">
        {buffering && <BufferLoader bufferingStyle={bufferingStyle} color="#000000" /> }
        <div className="transcript-title">
          <h2>{data.title}</h2>
        </div>
        {/* transcript text section */}        
        <TranscriptBlock transcript={data} containerRef={containerRef} handleMouseUp={handleSelected} />
      </section>
      <section className="transcript-audio_container">
        <AudioPlayer audioUrl={data.audioUrl} audioRef={audioRef} callTimeUpdate={handleTimeUpdate} onSeek={scrollToNode} isBuffering={setBuffering} />
      </section>
    </main>
  );
};