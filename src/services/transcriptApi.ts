export async function fetchTranscriptData(transcriptId: string | undefined) {
    const response = await fetch(`https://frontend-challenge-backend.vercel.app/api/transcripts/${transcriptId}`);
    return response.json();
}