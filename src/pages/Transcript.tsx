import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTranscriptData } from "../services/transcriptApi";
import { TranscriptBlock, AudioPlayer } from "../components";

const Transcript = () => {
    const { transcriptId } = useParams();
    const [transcriptData, setTranscriptData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await fetchTranscriptData(transcriptId);
            console.log(data);
            setTranscriptData(data);
        }
        fetchData();
    }, [transcriptId])
    return(<main>
        <section>
            <section></section>
            <TranscriptBlock transcript={transcriptData} />
        </section>
        <section>
            <AudioPlayer />
        </section>
    </main>)
}

export default Transcript;