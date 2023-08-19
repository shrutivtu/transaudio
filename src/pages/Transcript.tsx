import { useState, useRef, CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTranscriptData } from "../services/transcriptApi";
import { TranscriptBlock, AudioPlayer, Loader } from "../components";
import { TranscriptBlockType } from "../types";

export const Transcript = () => {
  const { transcriptId } = useParams();
  const [current, setCurrent] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wordsRef = useRef<HTMLSelectElement | null>(null);
  const prevNode = useRef<HTMLElement | null>(null);
  const timeRef = useRef<any>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ['transcriptData'],
    queryFn: () => fetchTranscriptData(transcriptId)
  })

  const getActiveWordIndex = () => {
    return data.blocks.findIndex((word: TranscriptBlockType) => {
      if(audioRef && audioRef.current){
        return word.start > audioRef.current.currentTime;
      }
    });
  }

  const onTimeUpdate = () => {
    const activeWordIndex = getActiveWordIndex()
    if(prevNode.current){
      prevNode.current.classList.remove('active-word');
    }
    if(timeRef && timeRef.current !== null && audioRef.current && audioRef.current.currentTime - timeRef.current >= 2){
      audioRef.current.currentTime = data.blocks[activeWordIndex-1].start;
    }
    if(audioRef.current){
      timeRef.current = audioRef.current.currentTime;
    }
    const wordElement:any = wordsRef && wordsRef.current && wordsRef.current.childNodes[activeWordIndex-1];
    if(wordElement){
      wordElement.classList.add('active-word');
      prevNode.current = wordElement;
    }
  };

  const handleTimeUpdate = () => {
    if(audioRef.current?.currentTime){
      onTimeUpdate();
    }
  }

  const handleSelected = (e: any):void => {
    let id: any = e.target.id.split("-")[1];
    id = parseInt(id);
    const nodeObj: any = data.blocks[id];
    const activeWordIndex = getActiveWordIndex();
  
    if (wordsRef.current) {
      const prevNodes:any= wordsRef.current.childNodes[activeWordIndex];
      prevNodes.classList.remove("active-word");
    }
    if (nodeObj !== current || current === null) {
      if (activeWordIndex > -1) setCurrent(nodeObj);
      if(audioRef.current){
        audioRef.current.currentTime = nodeObj.start;
        audioRef.current.play();
      }
    }
  };

  if(isLoading){
    const overrideProp : CSSProperties= {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "block",
      margin: "0 auto",
      borderColor: "red"
    }
    return <Loader isLoading={isLoading} color="#3498db" overrideProp={overrideProp} />
  }

  if (error instanceof Error) return 'An error has occurred: ' + error.message

  return (
    <main className="transcript-root">
      <section className="transcript-text_container">
        <div className="transcript-title">
          <h2>{data.title}</h2>
        </div>
        {/* transcript text section */}
        <TranscriptBlock transcript={data} wordsRef={wordsRef} handleMouseUp={handleSelected} />
      </section>
      <section className="transcript-audio_container">
        <AudioPlayer audioUrl={data.audioUrl} audioRef={audioRef} callTimeUpdate={handleTimeUpdate} />
      </section>
    </main>
  );
};