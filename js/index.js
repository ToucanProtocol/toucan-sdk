"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const addresses_1 = __importDefault(require("./utils/addresses"));
const networkIds_1 = __importDefault(require("./utils/networkIds"));
const poolAbi = [
    "function approve(address _poolToken, uint256 _amountToOffset)",
];
const offseterAbi = [
    "function autoOffsetUsingPoolToken(address spender, uint256 amount)",
];
class OffsetHelperClient {
    constructor() {
        /**
         * @notice to be used on the backend
         * @param rpcUrl the rpc url you want to use for the provider (can be an Infura or Alchemy url)
         */
        this.connectRpc = (rpcUrl) => {
            try {
                this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl || process.env.NODE_API_RPC_URL || "");
            }
            catch (error) {
                console.error("error when connecting rpc:", error.message);
                return error;
            }
        };
        /**
         * @notice to be used in the browser
         * @param networkId the network you want to connect the user to ("polygon" or "mumbai")
         * @returns a string representing the connected wallet address or an error if it fails
         */
        this.connectWallet = (network) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const { ethereum } = window;
                if (!ethereum) {
                    throw new Error("You need a wallet.");
                }
                const provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                const { chainId } = yield provider.getNetwork();
                if (chainId !=
                    (network == "polygon" ? networkIds_1.default.polygon : networkIds_1.default.mumbai)) {
                    throw new Error("Make sure you are on the correct network.");
                }
                const accounts = yield ethereum.request({
                    method: "eth_requestAccounts",
                });
                return { walletAddress: accounts[0], provider: provider };
            }
            catch (error) {
                console.error("error when connecting wallet", error.message);
                return error;
            }
        });
        /**
         *
         * @param poolToken either BCT or NCT
         * @param amount amount of CO2 tons to offset
         */
        this.autoOffset = (poolSymbol, amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.provider) {
                    throw new Error("Make sure you connected a provider.");
                }
                const signer = this.provider.getSigner();
                const poolTokenAddress = poolSymbol == "BCT" ? addresses_1.default.bct : addresses_1.default.nct;
                // approve OffsetHelper from pool token
                const poolToken = new ethers_1.ethers.Contract(poolTokenAddress, poolAbi, signer);
                const approveTxn = yield poolToken.approve(addresses_1.default.offsetHelper, (0, utils_1.parseEther)(amount));
                // wait for approval receipt
                yield approveTxn.wait();
                // auto offset using pool token
                const offsetHelper = new ethers_1.ethers.Contract(addresses_1.default.offsetHelper, offseterAbi, signer);
                const offsetTxn = yield offsetHelper.autoOffsetUsingPoolToken(addresses_1.default.nct, (0, utils_1.parseEther)(amount));
                // wait for offset receipt
                return yield offsetTxn.wait();
            }
            catch (error) {
                console.error("error when offseting", error.message);
                return error;
            }
        });
    }
}
