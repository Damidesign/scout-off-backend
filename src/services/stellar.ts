import { SorobanRpc, TransactionBuilder, Networks, BASE_FEE } from '@stellar/stellar-sdk';
import config from '../config';

const server = new SorobanRpc.Server(config.sorobanRpcUrl);

export { server };

export function networkPassphrase(): string {
  return config.network === 'mainnet'
    ? Networks.PUBLIC
    : Networks.TESTNET;
}

/**
 * Fetch the latest ledger sequence — used to set transaction time bounds.
 */
export async function getLatestLedger(): Promise<number> {
  const ledger = await server.getLatestLedger();
  return ledger.sequence;
}

/**
 * Health check: returns true if the Soroban RPC is reachable.
 */
export async function stellarHealth(): Promise<boolean> {
  try {
    await server.getLatestLedger();
    return true;
  } catch {
    return false;
  }
}
