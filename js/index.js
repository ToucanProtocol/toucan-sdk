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
         * @param privateKey the key of the wallet to use when signing transactions
         * @param rpcUrl the rpc url you want to use for the provider (can be an Infura or Alchemy url)
         */
        this.connectRpc = (walletAddress, privateKey, rpcUrl) => {
            try {
                this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl || process.env.NODE_API_RPC_URL || "");
                this.signer = privateKey
                    ? new ethers_1.ethers.Wallet(privateKey, this.provider)
                    : this.provider.getSigner();
                this.walletAddress = walletAddress;
            }
            catch (error) {
                console.error("error when connecting rpc:", error.message);
                return error;
            }
        };
        /**
         * @notice to be used in the browser
         * @param network the network you want to connect the user to ("polygon" or "mumbai")
         */
        this.connectWallet = (network) => __awaiter(this, void 0, void 0, function* () {
            try {
                // check wallet (e.g.: Metamask)
                // @ts-ignore
                const { ethereum } = window;
                if (!ethereum) {
                    throw new Error("You need a wallet.");
                }
                // set the provider and signer
                this.provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                this.signer = this.provider.getSigner();
                // check network
                const { chainId } = yield this.provider.getNetwork();
                if (chainId !=
                    (network == "polygon" ? networkIds_1.default.polygon : networkIds_1.default.mumbai)) {
                    throw new Error("Make sure you are on the correct network.");
                }
                // get wallet address
                const accounts = yield ethereum.request({
                    method: "eth_requestAccounts",
                });
                this.walletAddress = accounts[0];
            }
            catch (error) {
                console.error("error when connecting wallet:", error.message);
                return error;
            }
        });
        /**
         * @notice you need to connect wallet or rpc first
         * @notice this method may take up to even 1 minute to give a result
         * @param poolSymbol either "BCT" or "NCT"
         * @param amount amount of CO2 tons to offset
         */
        this.autoOffset = (poolSymbol, amount, network) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.provider) {
                    throw new Error("Make sure you connected a provider.");
                }
                const extractedAddresses = network == "polygon" ? addresses_1.default.polygon : addresses_1.default.mumbai;
                const poolTokenAddress = poolSymbol == "BCT" ? extractedAddresses.bct : extractedAddresses.nct;
                // approve OffsetHelper from pool token
                const poolToken = new ethers_1.ethers.Contract(poolTokenAddress, poolAbi, this.signer);
                const approveTxn = yield poolToken.approve(extractedAddresses.offsetHelper, (0, utils_1.parseEther)(amount));
                // wait for approval receipt
                yield approveTxn.wait();
                // @ts-ignore
                const offsetHelper = new ethers_1.ethers.Contract(extractedAddresses.offsetHelper, offseterAbi, this.signer);
                const offsetTxn = yield offsetHelper.autoOffsetUsingPoolToken(extractedAddresses.nct, (0, utils_1.parseEther)(amount), {
                    gasLimit: 2000000,
                });
                // wait for offset receipt
                return yield offsetTxn.wait();
            }
            catch (error) {
                console.error("error when offseting:", error.message);
                return new Error(error.message);
            }
        });
    }
}
exports.default = OffsetHelperClient;
