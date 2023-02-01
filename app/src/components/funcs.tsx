import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from './idl.json';
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

export const getProvider = (wallet : any) => {

    if(!wallet) {
        return null;
    }
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, "processed");

    const provider = new anchor.AnchorProvider(
        connection, wallet, {"preflightCommitment" : "processed"},
    )
    return provider;
}

export const createCluster = async (wallet : any, clusterName : String, clusterSymbol : String, keyOne : PublicKey, keyTwo : PublicKey, keyThree : PublicKey) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const cluster_program = anchor.web3.Keypair.generate();
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);
    let [tokenPubKey, tokenBump] =
        anchor.web3.PublicKey.findProgramAddressSync(
        [cluster_program.publicKey.toBuffer()],
        program.programId
    );
    try{
        await program.methods.createCluster(clusterName, clusterSymbol, keyOne, keyTwo, keyThree)
        .accounts({
          cluster : cluster_program.publicKey,
          signer : provider.wallet.publicKey,
          clusterMint : tokenPubKey,
          tokenProgram : TOKEN_PROGRAM_ID,
          systemProgram : anchor.web3.SystemProgram.programId,
        })
        .signers([cluster_program])
        .rpc();
        console.log("Tx Successful");
    } catch(error){
        console.log(error);
    }
}

export const initCluster = async (wallet : any, cluster_program : PublicKey, t1key : PublicKey, t2key : PublicKey, t3key : PublicKey) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const [mintOneAcc, mintOneAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t1key.toBuffer()],
        program.programId
      );
  
      const [mintTwoAcc, mintTwoAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t2key.toBuffer()],
        program.programId
      );
  
      const [mintThreeAcc, mintThreeAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t3key.toBuffer()],
        program.programId
      );
//    const clusterAccounts = await program.account.cluster.all();
//    console.log(clusterAccounts);
    try{
        await program.methods.initCluster()
        .accounts({
        cluster : cluster_program,
        signer : provider.wallet.publicKey,
        mintOne : t1key,
        mintTwo : t2key,
        mintThree : t3key,
        mintOneAccount : mintOneAcc,
        mintTwoAccount : mintTwoAcc,
        mintThreeAccount : mintThreeAcc,
        tokenProgram : TOKEN_PROGRAM_ID,
        systemProgram : anchor.web3.SystemProgram.programId,
        rent : anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([])
        .rpc();
            console.log("Tx Successful");
        } catch(error) {
            console.log(error);
        }
} 

export const issueCluster = async (wallet : any, cluster_program : PublicKey, amount : any, t1key : PublicKey, t2key : PublicKey, t3key : PublicKey) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const [mintOneAcc, mintOneAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t1key.toBuffer()],
        program.programId
      );
  
    const [mintTwoAcc, mintTwoAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t2key.toBuffer()],
        program.programId
      );
  
    const [mintThreeAcc, mintThreeAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t3key.toBuffer()],
        program.programId
      );

    let [tokenPubKey, tokenBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
      [cluster_program.toBuffer()],
      program.programId
    );

    const issuerOne = getAssociatedTokenAddressSync(t1key, provider.wallet.publicKey);
    const issuerTwo = getAssociatedTokenAddressSync(t2key, provider.wallet.publicKey);
    const issuerThree = getAssociatedTokenAddressSync(t3key, provider.wallet.publicKey);
    const clustTokAcc = getAssociatedTokenAddressSync(tokenPubKey, provider.wallet.publicKey);

    try{
        await program.methods.issueCluster(new anchor.BN(amount), tokenBump)
        .accounts({
        cluster : cluster_program,
        signer : provider.wallet.publicKey,
        issuerOne : issuerOne,
        issuerTwo : issuerTwo,
        issuerThree : issuerThree,
        clusterOne : mintOneAcc,
        clusterTwo : mintTwoAcc,
        clusterThree : mintThreeAcc,
        mintOne : t1key,
        mintTwo : t2key,
        mintThree : t3key,
        clusterToken : tokenPubKey,
        clusterTokenAccount : clustTokAcc,
        tokenProgram : TOKEN_PROGRAM_ID,
        systemProgram : anchor.web3.SystemProgram.programId,
        })
        .signers([])
        .rpc();
            console.log("Tx Successful");
        } catch(error){
            console.log(error);
        }
}

export const redeemCluster = async (wallet : any, cluster_program : PublicKey, amount : any, t1key : PublicKey, t2key : PublicKey, t3key : PublicKey) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const [mintOneAcc, mintOneAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t1key.toBuffer()],
        program.programId
      );
  
    const [mintTwoAcc, mintTwoAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t2key.toBuffer()],
        program.programId
      );
  
    const [mintThreeAcc, mintThreeAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t3key.toBuffer()],
        program.programId
      );

    let [tokenPubKey, tokenBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
      [cluster_program.toBuffer()],
      program.programId
    );

    const redeemerOne = getAssociatedTokenAddressSync(t1key, provider.wallet.publicKey);
    const redeemerTwo = getAssociatedTokenAddressSync(t2key, provider.wallet.publicKey);
    const redeemerThree = getAssociatedTokenAddressSync(t3key, provider.wallet.publicKey);
    const clustTokAcc = getAssociatedTokenAddressSync(tokenPubKey, provider.wallet.publicKey);
    try{
    await program.methods.redeemCluster(new anchor.BN(1), mintOneAccBump, mintTwoAccBump, mintThreeAccBump)
    .accounts({
      cluster : cluster_program,
      signer : provider.wallet.publicKey,
      redeemerOne : redeemerOne,
      redeemerTwo : redeemerTwo,
      redeemerThree : redeemerThree,
      clusterOne : mintOneAcc,
      clusterTwo : mintTwoAcc,
      clusterThree : mintThreeAcc,
      mintOne : t1key,
      mintTwo : t2key,
      mintThree : t3key,
      clusterToken : tokenPubKey,
      clusterTokenAccount : clustTokAcc,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([])
    .rpc(); 
        console.log("Tx Successful");
    } catch(error){
        console.log(error);
    }
}