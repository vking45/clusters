import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Clusters } from "../target/types/clusters";
import { BN } from "bn.js";

describe("clusters", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Clusters as Program<Clusters>;

  it("Initializing a Cluster", async () => {
    // Wallet Settings
    const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
    const t1key = anchor.web3.Keypair.generate();

    const tx = await program.methods.createCluster("Test - 1", "TST", t1key.publicKey, new BN(1)).rpc();  //.rpc();
    console.log("Your transaction signature", tx);
  });
});
