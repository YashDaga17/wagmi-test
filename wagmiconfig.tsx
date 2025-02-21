import { okto } from '@okto_web3/wagmi-adapter';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, optimism, polygon } from 'wagmi/chains';
 
export function getConfig() {
  return createConfig({
    chains: [polygon],
    connectors: [
      okto({
        environment: 'sandbox',
        clientPrivateKey: '0x2aaa089f7e26ad3d2da3518e1e945d76804372b6bdd044c7f059598c31fa7dcc',
        clientSWA: '0xb532926d0dBC2799Cf8BE2d6e2F1ef8Bd27CaA0c',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [polygon.id]: http(),
    },
  });
}
 
declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}