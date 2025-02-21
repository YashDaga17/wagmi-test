"use client";
import { getAccount, useOkto } from "@okto_web3/react-sdk";
import { tokenTransfer } from "@okto_web3/react-sdk";
import { useState } from "react";

export function TokenTransfer() {
  const oktoClient = useOkto();
  const [status, setStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  async function getaccount() {
    const accounts = await getAccount(oktoClient);
    // const solanaAccount = accounts.find(account => account.chain === "solana:devnet");
    console.log("Your Solana address:", accounts);
  }
  async function handleTransfer() {
    try {
      const txHash = await tokenTransfer(oktoClient, {
        amount: BigInt("1000000000"), // 1 SOL
        recipient: "0x6118c3C896157da140C192e3c5F6c05945339459",
        token: "", // Empty string for native token
        caip2Id: "eip155:84532", // caip2id of Solana devnet from step 3
      });
      setStatus(`Transfer complete! Hash: ${txHash}`);
      setModalVisible(true);
    } catch (error) {
      console.error("Transfer failed:", error);
      setStatus(`Transfer failed: ${error.message}`);
    }
  }

  return (
    <div className="text-center text-white">
      <button
        className="px-4 py-2 w-full bg-blue-500 text-white rounded"
        onClick={handleTransfer}
      >
        Send 1 SOL
      </button>

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-black rounded-lg w-11/12 max-w-2xl p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Token Transfer Status</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setModalVisible(false)}
              >
                ×
              </button>
            </div>
            <div className="text-left text-white max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap break-words text-white">
                {status}
              </pre>
            </div>
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
