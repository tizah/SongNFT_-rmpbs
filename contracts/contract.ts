import { ethers } from "ethers";
import { ContractContext as ContractContextPlaylistToken } from './types/playlisttoken-abi'
import { ContractContext as ContractContextSongToken } from './types/songtoken-abi'
import { ContractContext as ContractContextDropToken } from './types/droptoken-abi'
import playlisttokenAbi from './types/playlisttoken-abi.json'
import songtokenAbi from './types/songtoken-abi.json'
import droptokenAbi from './types/droptoken-abi.json'

export const playlisttokenAddress = '0x09D0C7EBc669264f2d5D04E47678e5e20420dc77' // Goerli
export const songtokenAddress = '0x6b5A7Dc0B9e780BcF9864e8289b157bd3A72eE9A' // Goerli
export const droptokenAddress = '0x43652034141a0cc06c125f9BEdfD0f7b4688A06E' // Goerli

export const getContract = (injectedProvider: any) => {
    const provider = new ethers.providers.Web3Provider(injectedProvider as any)
    return {
        playlistTokenContract: new ethers.Contract(playlisttokenAddress, playlisttokenAbi, provider.getSigner()) as unknown as ContractContextPlaylistToken,
        songTokenContract: new ethers.Contract(songtokenAddress, songtokenAbi, provider.getSigner()) as unknown as ContractContextSongToken,
        dropTokenContract: new ethers.Contract(droptokenAddress, droptokenAbi, provider.getSigner()) as unknown as ContractContextDropToken
    }
}

