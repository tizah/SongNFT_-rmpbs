import React, { useState, useEffect } from "react";

import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { SongResponse } from '../../contracts/types/playlisttoken-abi'
import {  getContract } from '../../contracts/contract'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from "@mui/material/Box";
// import './Song.css'

interface SongProps {
    song: {
     uri: string,
     author: string
     songInfo: SongResponse   
    }
    playlistId: number,
    updated: any // function
}

const Song = ({ song, playlistId, updated }: SongProps) => {
    const [metadata, setMetadata] = useState({} as any)

    console.log({song: song, playlistId, updated })
    // uri: "linkipfs://QmWrvafcik6NFJzgYjwmHFot8RHdGqRh2bhyijfKdmFLSe"
    const { songInfo, uri } = song
    // let ipfs = uri.replace('linkipfs://', '')
    let ipfs = uri.replace('link', '')
    useEffect(() => {
        (async () => {
            // let data = await fetch('https://ipfs.io/ipfs/'+ ipfs) as any
            let data = await fetch(ipfs) as any
            data = await data.json()
            console.log(data)
            setMetadata(data)
        })()
    }, [])
    
    const title = `${songInfo.tokenAddress} - ${songInfo.tokenId}`
    return (
        <div title={title} className="song">
            <div className='artist_name'>
                <div className="song_name">Song {metadata.name}</div>
                <div className="song_artist">{metadata.artist}</div>
            </div>
          
            <div className='song_player'>
                <audio controls src={metadata.mp3_url}>
                    Your browser does not support the audio tag.
                </audio>
            </div>
         
            <div className='upvote'>
            <span className="song_artist"> <b>
            <Tooltip title="upvote count"> 
            <Box sx={{width: 50, bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
            {songInfo.score}
            
            </Box>
             </Tooltip>
            </b></span> 
                <Button type="button" variant="outlined" onClick={async () => { 
                    const tx = await getContract(window.ethereum).playlistTokenContract.upvoteSong(playlistId, songInfo.tokenId)
                    await tx.wait()
                    updated()
                }}>upvote</Button>
            </div>
            
        </div>
    )
}

export default Song;
