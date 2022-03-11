import React from "react";

import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';



interface SongProps {
    artist: string;
    songId: number;
}

const Song = ({ artist, songId } : SongProps) => {
    return (
        <div className="song">
            <div className="song_artist">{artist}</div>
           <audio controls>
                <source src="horse.ogg" type="audio/ogg" />
                <source src="horse.mp3" type="audio/mpeg"/>
                Your browser does not support the audio tag.
            </audio>
        </div>
    )
}

export default Song;
