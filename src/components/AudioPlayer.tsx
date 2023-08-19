import { useEffect, useState } from "react";
import { AudioPlayerProps } from "../types";

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, audioRef, callTimeUpdate, isBuffering, onSeek }) => {
    const [seeking, setSeeking] = useState(false);

    useEffect(() => {
        isBuffering?.(seeking);
    },[seeking, isBuffering])


    return (
        <audio controls src={audioUrl} ref={audioRef} onTimeUpdate={callTimeUpdate} 
        onSeeked={()=>{
            setSeeking(false);  
        }} 
        onSeeking={()=> {
            setSeeking(true);
            onSeek?.();
        }}></audio>
    );
};