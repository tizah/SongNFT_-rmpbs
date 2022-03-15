import React, { useState } from "react";

import Link  from "next/link";
import Image from 'next/image'
import Playlistimage from '../../public/images/playlistNFT.jpg'


import Song from '../Song/Song'

import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import { useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {  getContract } from '../../contracts/contract'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// import './Playlist.css';

const Playlist = () => {
    const [songs, setSongs] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('')
    const [balance, setBalance] = useState('')
    const playlistId = 0
    const loadContent = async () => {
        if (!window.ethereum) return
        await window.ethereum.enable()
        window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
        });

        setIsLoading(true)
        // console.log(window.ethereum.selectedAddress)
        // const balance = await getContract(window.ethereum).dropTokenContract.balanceOf(window.ethereum.selectedAddress)
        const playlistTokenContract = getContract(window.ethereum).playlistTokenContract
        const songTokenContract = getContract(window.ethereum).songTokenContract
        const playlist = await playlistTokenContract.playlists(playlistId)  
        const songs = await playlistTokenContract.getPlaylistSongs(playlistId)
        const songsInfo = []
        for (const song of songs) {
            songsInfo.push({
                uri: await songTokenContract.tokenURI(song.tokenId),
                author: await songTokenContract.ownerOf(song.tokenId),
                songInfo: {
                    score: song.score.toString(),
                    tokenId: song.tokenId.toString(),
                    tokenAddress: song.tokenAddress.toString(),
                }
            })
        }
        songsInfo.sort((a, b) => {
            if (a.songInfo.score > b.songInfo.score) {
                return -1;
            }
            if (a.songInfo.score < b.songInfo.score) {
                return 1;
            }
            return 0;
            })
        console.log(songsInfo)
        setSongs(songsInfo)
        setName(playlist.name)
        console.log(balance)
        setBalance(balance.toString())
        setIsLoading(false)
    }
    useEffect(() => {
        (async () => {
            loadContent()
        })()
    }, [])

    const handleUpvoteSongsNFT = () => {
        alert('songs upvoted')
    }

    return (
        <Container maxWidth="lg">
        <div className="playlist">

            <div className="playlist_left">
                <div className="playlist_name">{name}</div>

                <div className="playlist_image"> 
                    <img src={Playlistimage.src} style={{'width': '100%'}} alt="Playlist Image" />
                </div>

                <div> 
                    {isLoading ? 
                    (
                         <Box sx={{ width: '60%', paddingTop:'50px' }}>
                         <LinearProgress />
                       </Box>
                    ) : (songs.map((song, index) => <Song key={index} updated={() => loadContent()} song={song} playlistId={playlistId} /> ))}
                    <MoreHorizIcon />
                    <br />
                    <Button variant="outlined" color="primary" onClick= {handleUpvoteSongsNFT}>
                        Upvote Songs 
                    </Button>
                </div>
            </div>
            
            <div className="playlist_right">
            
                <Fab variant="extended" className="playlist_button">
                    <LibraryMusicOutlinedIcon sx={{ mr: 1 }} />
                    <Link href='/songnftlist'>
                        Playlist Song NFTs
                    </Link>
                    
                </Fab>
                <Fab variant="extended" className="playlist_button">
                        <Link href='/mintsong'>
                        Mint your Song NFT
                        </Link>
                </Fab>
                <Fab variant="extended" className="playlist_button">
                    <Link href='/dropreptoken'>
                        The Drop Rep Token
                    </Link>
                </Fab>
            </div>

        </div>
        </Container>
    )
}

export default Playlist;