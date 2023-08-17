import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchTranscriptData } from "../services/transcriptApi";
import { TranscriptBlock, AudioPlayer } from "../components";
import { TranscriptType } from "../types";

export const Transcript = () => {
  const { transcriptId } = useParams();
  const [ transcriptData, setTranscriptData ] = useState<TranscriptType>({
    id: "",
    title: "",
    audioUrl: "",
    blocks: [],
  });
  const [current, setCurrent] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wordsRef = useRef<HTMLSelectElement | null>(null);
  const prevNode = useRef<any>(null);
  const timeRef = useRef<any>(null);

  async function fetchData() {
    const data = await fetchTranscriptData(transcriptId);
    setTranscriptData(data);
  }
  useEffect(() => {
    fetchData();
  }, [transcriptId]);

  const getActiveWordIndex = () => {
    return transcriptData.blocks.findIndex((word) => {
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
      audioRef.current.currentTime = transcriptData.blocks[activeWordIndex-1].start;
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
    const nodeObj: any = transcriptData.blocks[id];
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

  return (
    <main className="transcript-root">
      <section className="transcript-text_container">
        <div className="transcript-title">
          <h2>{transcriptData.title}</h2>
        </div>
        {/* transcript text section */}
        <TranscriptBlock transcript={transcriptData} wordsRef={wordsRef} handleMouseUp={handleSelected} />
      </section>
      <section className="transcript-audio_container">
        {/* Todo later */}
        {/* <AudioPlayer audioUrl={transcriptData.audioUrl} audioRef={audioRef} /> */}
        <audio controls src={transcriptData.audioUrl} ref={audioRef} onTimeUpdate={handleTimeUpdate} style={{ width: '100%' }}></audio>
      </section>
    </main>
  );
};
