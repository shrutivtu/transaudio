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

  const audioRef = useRef<HTMLAudioElement>(null);
  const wordsRef = useRef<HTMLSelectElement>(null);

  let prev:any = null;

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
    if(prev){
      prev.classList.remove('active-word');
    }
    const wordElement:any = wordsRef && wordsRef.current && wordsRef.current.childNodes[activeWordIndex-1];
    if(wordElement){
      wordElement.classList.add('active-word');
      prev = wordElement;
    }
  };

  const handleTimeUpdate = () => {
    if(audioRef.current?.currentTime){
      onTimeUpdate();
    }
  }

  return (
    <main className="transcript-root">
      <section className="transcript-text_container">
        <div className="transcript-title">
          <h2>{transcriptData.title}</h2>
        </div>
        {/* transcript text section */}
        <TranscriptBlock transcript={transcriptData} wordsRef={wordsRef} />
      </section>
      <section className="transcript-audio_container">
        {/* Todo later */}
        {/* <AudioPlayer audioUrl={transcriptData.audioUrl} playerRef={audioRef} /> */}
        <audio controls src={transcriptData.audioUrl} ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>
      </section>
    </main>
  );
};
