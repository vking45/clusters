use anchor_lang::prelude::*;
use crate::state::cluster::*;
use anchor_spl::{
    token::{TokenAccount, Token, Mint},
};

pub fn init_cluster(ctx : Context<Init>) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
    cluster.init_cluster()?;
    Ok(())
}

pub fn issue_cluster() -> Result<()>{
    Ok(())
}

#[derive(Accounts)]
#[instruction(bump : u8)]
pub struct Init<'info> {

    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(
        init,  
        payer = signer,
        token::mint = mint_one,
        token::authority = cluster, 
        seeds = [&cluster.to_account_info().key.clone().to_bytes()], 
        bump,
    )]
    pub token_one_acc : Account<'info, TokenAccount>,

    #[account(
        init,  
        payer = signer,
        token::mint = mint_two,
        token::authority = cluster, 
        seeds = [&cluster.to_account_info().key.clone().to_bytes()], 
        bump,
    )]
    pub token_two_acc : Account<'info, TokenAccount>,

    #[account(
        init,  
        payer = signer,
        token::mint = mint_three,
        token::authority = cluster, 
        seeds = [&cluster.to_account_info().key.clone().to_bytes()], 
        bump,
    )]
    pub token_three_acc : Account<'info, TokenAccount>,

    #[account(
        mut, 
        address = cluster.token_one.key()
    )]
    pub mint_one : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_two.key()
    )]
    pub mint_two : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_three.key()
    )]
    pub mint_three : Account<'info, Mint>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Issue<'info> {
    #[account(mut)]
    pub cluster : Account<'info, Cluster>,
}

/* 

pub fn issue_cluster() -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct Issue<'info> {
    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut,
        token::mint = cluster.token_one.key()
    )]
    pub token_account_one : Account<'info, TokenAccount>,

    #[account(mut,
        token::mint = cluster.token_two.key()
    )]
    pub token_account_two : Account<'info, TokenAccount>,

    #[account(mut,
        token::mint = cluster.token_three.key()
    )]
    pub token_account_three : Account<'info, TokenAccount>,
}

*/