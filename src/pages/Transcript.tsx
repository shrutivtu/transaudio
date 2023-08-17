import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTranscriptData } from "../services/transcriptApi";
import { TranscriptBlock, AudioPlayer } from "../components";
import { TranscriptType } from "../types";

export const Transcript = () => {
    const { transcriptId } = useParams();
    const [transcriptData, setTranscriptData] = useState<TranscriptType>({ id: "", title: "", audioUrl: "", blocks: [] });
    async function fetchData() {
        const data = await fetchTranscriptData(transcriptId);
        setTranscriptData(data);
    }
    useEffect(() => {
        fetchData()
    }, [transcriptId])
    
    return (
        <main>
            <section>
                <section>
                    <h2>{transcriptData.title}</h2>
                </section>
                <TranscriptBlock transcript={transcriptData} />
            </section>
            <section>
                <AudioPlayer />
            </section>
        </main>
    );
}