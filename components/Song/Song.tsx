import React, { useState, useEffect } from "react";

import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { SongResponse } from '../../contracts/types/playlisttoken-abi'
import {  getContract } from '../../contracts/contract'
import Button from '@mui/material/Button';
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
    // uri: "linkipfs://QmWrvafcik6NFJzgYjwmHFot8RHdGqRh2bhyijfKdmFLSe"
    const { songInfo, uri } = song
    let ipfs = uri.replace('linkipfs://', '')
    useEffect(() => {
        (async () => {
            let data = await fetch('https://ipfs.io/ipfs/'+ ipfs) as any
            data = await data.json()
            console.log(data)
            setMetadata(data)
        })()
    }, [])
    
    const title = `${songInfo.tokenAddress} - ${songInfo.tokenId}`
    return (
        <div title={title} className="song">
            <div className="song_name">{metadata.name}</div>
            <div className="song_artist">{metadata.artist}</div>
            <div>
            <audio controls src={metadata.mp3_url}>
                Your browser does not support the audio tag.
            </audio>
            </div>
            <span className="song_artist"><b>{songInfo.score}</b></span>
            <Button type="button" onClick={async () => { 
                const tx = await getContract(window.ethereum).playlistTokenContract.upvoteSong(playlistId, songInfo.tokenId)
                await tx.wait()
                updated()
            }}>upvote</Button>
        </div>
    )
}

export default Song;
