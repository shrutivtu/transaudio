import { RefObject } from 'react';
export interface TranscriptBlockType {
    end: number;
    speaker: string;
    start: number;
    text: string;
}

export interface TranscriptType {
    id: string;
    title: string;
    audioUrl: string;
    blocks: TranscriptBlockType[];
}

export interface AudioPlayerProps {
    audioUrl: string;
    playerRef: RefObject<HTMLAudioElement>; // Correct type for playerRef
}