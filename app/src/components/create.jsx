import React, { useState } from 'react'
import * as anchor from "@project-serum/anchor";
import { createCluster } from './funcs';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

function Create() {
    const wallet = useAnchorWallet();

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [keyOne, setKeyOne] = useState("");
    const [keyTwo, setKeyTwo] = useState("");
    const [keyThree, setKeyThree] = useState("");

    const onSubmit = async() => {
        console.log(keyOne, keyTwo, keyThree);
        try{
            setKeyOne(new anchor.web3.PublicKey(keyOne));
            setKeyTwo(new anchor.web3.PublicKey(keyTwo));
            setKeyThree(new anchor.web3.PublicKey(keyThree));
            try{
            await createCluster(wallet, name, symbol, keyOne, keyTwo, keyThree);
            console.log("Cluster Created");
            }
            catch(error){
                console.log(error)
            }
        } catch(error){
            console.log(error);
            alert(error);
        }
    }

    return (
        <div>
        <h1 className="mb-4 text-4xl flex justify-center align-middle font-bold text-[#374151] md:text-2xl lg:text-4xl ">Create a Cluster</h1> <br />
        <div className='flex flex-row justify-center align-middle'>
            <div className='w-5/12'>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="Name" id="Name" class="mb-2 block py-2.5 px-0 w-full text-sm text-[#111827] bg-transparent border-0 border-b-2 border-[#cbd5e1] appearance-none dark:text-white dark:border-[#475569] dark:focus:border-[#3b82f6] focus:outline-none focus:ring-0 focus:border-cex peer" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
                <label for="Name" class="peer-focus:font-medium absolute text-sm text-[#6b7280] dark:text-[#9ca3af] duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cex peer-focus:dark:text-[#3b82f6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="Symbol" id="Symbol" class="mb-2 block py-2.5 px-0 w-full text-sm text-[#111827] bg-transparent border-0 border-b-2 border-[#cbd5e1] appearance-none dark:text-white dark:border-[#475569] dark:focus:border-[#3b82f6] focus:outline-none focus:ring-0 focus:border-cex peer" placeholder="Symbol" required onChange={(e) => setSymbol(e.target.value)}/>
                <label for="Symbol" class="peer-focus:font-medium absolute text-sm text-[#6b7280] dark:text-[#9ca3af] duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cex peer-focus:dark:text-[#3b82f6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Symbol</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="KeyOne" id="KeyOne" class="mb-2 block py-2.5 px-0 w-full text-sm text-[#111827] bg-transparent border-0 border-b-2 border-[#cbd5e1] appearance-none dark:text-white dark:border-[#475569] dark:focus:border-[#3b82f6] focus:outline-none focus:ring-0 focus:border-cex peer" placeholder="KeyOne" required onChange={(e) => setKeyOne(e.target.value)} />
                <label for="KeyOne" class="peer-focus:font-medium absolute text-sm text-[#6b7280] dark:text-[#9ca3af] duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cex peer-focus:dark:text-[#3b82f6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token One</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="KeyTwo" id="KeyTwo" class="mb-2 block py-2.5 px-0 w-full text-sm text-[#111827] bg-transparent border-0 border-b-2 border-[#cbd5e1] appearance-none dark:text-white dark:border-[#475569] dark:focus:border-[#3b82f6] focus:outline-none focus:ring-0 focus:border-cex peer" placeholder="KeyTwo" required onChange={(e) => setKeyTwo(e.target.value)}/>
                <label for="KeyTwo" class="peer-focus:font-medium absolute text-sm text-[#6b7280] dark:text-[#9ca3af] duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cex peer-focus:dark:text-[#3b82f6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token Two</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="KeyThree" id="KeyThree" class="mb-2 block py-2.5 px-0 w-full text-sm text-[#111827] bg-transparent border-0 border-b-2 border-[#cbd5e1] appearance-none dark:text-white dark:border-[#475569] dark:focus:border-[#3b82f6] focus:outline-none focus:ring-0 focus:border-cex peer" placeholder="KeyThree" required onChange={(e) => setKeyThree(e.target.value)}/>
                <label for="KeyThree" class="peer-focus:font-medium absolute text-sm text-[#6b7280] dark:text-[#9ca3af] duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cex peer-focus:dark:text-[#3b82f6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token Three</label>
            </div>
            <div className='flex justify-center align-middle'>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cex dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onSubmit}>Create</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Create;