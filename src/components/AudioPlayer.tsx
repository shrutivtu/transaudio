import { AudioPlayerProps } from "../types";

export const AudioPlayer = ({ audioUrl, playerRef }: { audioUrl: any, playerRef: any}) => {
    return (
        <audio controls>
            <source src={audioUrl} type="audio/ogg" />
        </audio>
    );
};