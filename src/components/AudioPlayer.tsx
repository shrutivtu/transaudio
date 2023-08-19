import { AudioPlayerProps } from "../types";

export const AudioPlayer:React.FC<AudioPlayerProps> = ({ audioUrl, audioRef, callTimeUpdate }) => {
    return (
        <audio controls src={audioUrl} ref={audioRef} onTimeUpdate={callTimeUpdate}></audio>
    );
};