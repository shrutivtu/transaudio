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
    transcript: TranscriptType;
    containerRef: RefObject<HTMLSelectElement>;
    handleMouseUp: (e: any) => void;
}

export interface AudioPlayerProps {
    audioUrl: string;
    audioRef: RefObject<HTMLAudioElement>;
    callTimeUpdate: () => void;
    isBuffering?: (seeking: boolean) => void;
    onSeek?: () => void;
}

export interface LoaderProps {
    isLoading: boolean;
    color: string;
    overrideProp: object
};

export interface transcriptProp{
    NAME: string;
    TID: string;
}