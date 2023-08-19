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

export interface TranscriptBlockProp {
    transcript: TranscriptType,
    wordsRef: RefObject<HTMLSelectElement>,
    handleMouseUp: (e: any) => void
}

export interface AudioPlayerProps {
    audioUrl: string;
    audioRef: RefObject<HTMLAudioElement>;
    callTimeUpdate: () => void;
}

export interface LoaderProps {
    isLoading: boolean;
    color: string;
    overrideProp: object
};