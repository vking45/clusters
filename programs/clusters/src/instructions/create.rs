use anchor_lang::prelude::*;
use crate::state::cluster::*;
use anchor_spl::{
    token::{Token,Mint},
};

pub fn create_cluster(ctx : Context<Create>, name : String, symbol : String, t1 : Pubkey, t1amt : u64, t2 : Pubkey, t2amt : u64, t3 : Pubkey, t3amt : u64) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
//    let signer : &Signer = &ctx.accounts.signer;
    let cluster_mint : &Account<Mint> = &ctx.accounts.cluster_mint;

    cluster.cluster_name = name;
    cluster.cluster_symbol = symbol;
    cluster.cluster_mint = cluster_mint.key();
    cluster.cluster_supply = 0;
    cluster.token_one = t1;
    cluster.token_one_amt = t1amt;
    cluster.token_two = t2;
    cluster.token_two_amt = t2amt;
    cluster.token_three = t3;
    cluster.token_three_amt = t3amt;
    cluster.inited = false;
    Ok(())
}

#[derive(Accounts)]
#[instruction(bump : u8)]
pub struct Create<'info>{
    #[account(init,
        payer = signer,
        space = Cluster::LEN,
    )]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(init,
        payer = signer,
        mint::decimals = 0,
        mint::authority = cluster,
        mint::freeze_authority = cluster,
    )]
    pub cluster_mint : Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}