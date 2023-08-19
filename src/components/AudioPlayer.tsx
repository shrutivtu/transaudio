import { AudioPlayerProps } from "../types";

export const AudioPlayer = ({ audioUrl, audioRef, callTimeUpdate }: AudioPlayerProps) => {
    return (
        <audio controls src={audioUrl} ref={audioRef} onTimeUpdate={callTimeUpdate}></audio>
    );
};