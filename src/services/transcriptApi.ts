export async function fetchTranscriptData(transcriptId: string | undefined) {
    const url = `https://frontend-challenge-backend.vercel.app/api/transcripts/${transcriptId}`;
    const response = await fetch(url);
    return response.json();
}