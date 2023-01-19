use anchor_lang::prelude::*;
use instructions::*;

pub mod instructions;
pub mod state;
pub mod errors;

declare_id!("46wr5XGHYSMmaV6SAsRNkegSdi8qN69eSrbUVpByxNZo");

#[program]
pub mod clusters {
    use super::*;

    pub fn create_cluster(ctx: Context<Create>, name : String, symbol : String, t1 : Pubkey, t1amt : u64) -> Result<()> {
        instructions::create::create_cluster(ctx, name, symbol, t1, t1amt)?;
        Ok(())
    }

    pub fn init_cluster(ctx : Context<Init>) -> Result<()> {
        instructions::interact::init_cluster(ctx)?;
        Ok(())
    }

    pub fn init_cluster_token_account(ctx : Context<InitTokenAccount>) -> Result<()> {
        instructions::interact::init_cluster_token_account(ctx)?;
        Ok(())
    }

    pub fn issue_cluster(ctx : Context<Issue>, amt : u64) -> Result<()> {
        instructions::interact::issue_cluster(ctx, amt)?;
        Ok(())
    }

}