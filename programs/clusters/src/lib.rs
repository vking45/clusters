use anchor_lang::prelude::*;
use instructions::*;

pub mod instructions;
pub mod state;
pub mod errors;

declare_id!("46wr5XGHYSMmaV6SAsRNkegSdi8qN69eSrbUVpByxNZo");

#[program]
pub mod clusters {
    use super::*;

    pub fn create_cluster(ctx: Context<Create>, name : String, symbol : String, t1 : Pubkey, t1amt : u64, t2 : Pubkey, t2amt : u64 ,t3 : Pubkey, t3amt : u64) -> Result<()> {
        instructions::create::create_cluster(ctx, name, symbol, t1, t1amt, t2, t2amt,t3, t3amt)?;
        Ok(())
    }

    pub fn init_cluster(ctx : Context<Init>) -> Result<()> {
        instructions::interact::init_cluster(ctx)?;
        Ok(())
    }
}