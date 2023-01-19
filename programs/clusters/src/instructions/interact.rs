use anchor_lang::prelude::*;
use crate::state::cluster::*;
use anchor_spl::{
    token::{TokenAccount, Token, Mint, Transfer, transfer, mint_to, MintTo},
};

pub fn init_cluster(ctx : Context<Init>) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
    cluster.init_cluster()?;
    Ok(())
}

pub fn init_cluster_token_account(_ctx : Context<InitTokenAccount>) -> Result<()>{
    Ok(())
}

pub fn issue_cluster(ctx : Context<Issue>, amt : u64) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
    let signer : &Signer = &ctx.accounts.signer;
    let token_program = &ctx.accounts.token_program;
    let cluster_mint : &mut Account<Mint> = &mut ctx.accounts.cluster_token;
    let cluster_token_account : &mut Account<TokenAccount> = &mut ctx.accounts.cluster_token_account;

    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.issuer_one.to_account_info(),
                to : ctx.accounts.cluster_one.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        (cluster.token_one_amt) * amt
    )?;

    mint_to(
        CpiContext::new(
            token_program.to_account_info(),
            MintTo{ 
                mint: cluster_mint.to_account_info(), 
                to: cluster_token_account.to_account_info(), 
                authority: signer.to_account_info(), 
            },
        ),
        amt
    )?;

    cluster.issue_cluster()?;
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

/*     #[account(
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
*/
    #[account(
        mut, 
        address = cluster.token_one.key()
    )]
    pub mint_one : Account<'info, Mint>,

/*     #[account(
        mut, 
        address = cluster.token_two.key()
    )]
    pub mint_two : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_three.key()
    )]
    pub mint_three : Account<'info, Mint>,
*/
    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct InitTokenAccount<'info>{

    #[account()]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut,
        address = cluster.cluster_mint,
    )]
    pub cluster_token : Account<'info, Mint>,

    #[account(
        init,  
        payer = signer,
        token::mint = cluster_token,
        token::authority = signer,
    )]
    pub cluster_token_account : Account<'info, TokenAccount>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct Issue<'info> {
    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut,
        token::mint = cluster.token_one,
        token::authority = signer,
    )]
    pub issuer_one : Account<'info, TokenAccount>,

    #[account(mut,
        seeds = [&cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_one : Account<'info, TokenAccount>,

    #[account(mut,
        address = cluster.cluster_mint,
    )]
    pub cluster_token : Account<'info, Mint>,

    #[account(mut,
        token::mint = cluster.cluster_mint,
        token::authority = signer,
    )]
    pub cluster_token_account : Account<'info, TokenAccount>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
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