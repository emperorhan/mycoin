const CryptoJS = require("crypto-js");

class Block {
    constructor(index, hash, previousHash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

const genesisBlock = new Block(
    0,
    "62E1C6DE330039CC27322A3F52B70702C8D12D8893340A0B67BDBEE012BE1252",
    null,
    1549055111155, // new Date().getTime()
    "My name is emperorhan, this text is the genesis"
);

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() / 1000;

const getBlockchain = () => blockchain;

const createHash = (index, previousHash, timestamp, data) =>
    CryptoJS.SHA256(
        index + previousHash + timestamp + JSON.stringify(data)
    ).toString();

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(
        newBlockIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    const newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    );
    addBlockToChain(newBlock);
    return newBlock;
};

const getBlockHash = block =>
    createHash(block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candidateBlock, latestBlock) => {
    if (!isNewStructureValid(candidateBlock)) {
        console.log("The candidate block structure is not valid");
        return false;
    } else if (latestBlock.index + 1 !== candidateBlock.index) {
        console.log("The candidate block doesnt have a valid index");
        return false;
    } else if (latestBlock.hash !== candidateBlock.previousHash) {
        console.log(
            "The previousHash of the candidate block is not the hash of the latest block"
        );
        return false;
    } else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
        console.log("The hash of this block is invalid");
        return false;
    }
    return true;
};

const isNewStructureValid = block => {
    return (
        typeof block.index === "number" &&
        typeof block.hash === "string" &&
        typeof block.previousHash === "string" &&
        typeof block.timestamp === "number" &&
        typeof block.data === "string"
    );
};

const isChainValid = candidateChain => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if (!isGenesisValid(candidateChain[0])) {
        console.log(
            "The candidateChains's genesisBlock is not the same as our genesisBlock"
        );
        return false;
    }
    for (let i = 1; i < candidateChain.length; i++) {
        // 0 is genesisblock
        if (!isNewBlockValid(candidateChain[i], candidateChain[i - 1])) {
            return false;
        }
    }
    return true;
};

const replaceChain = candidateChain => {
    if (
        isChainValid(candidateChain) &&
        candidateChain.length > getBlockchain().length
    ) {
        blockchain = candidateChain;
        return true;
    } else {
        return false;
    }
};

const addBlockToChain = candidateBlock => {
    if (isNewBlockValid(candidateBlock, getLastBlock())) {
        blockchain.push(candidateBlock);
        return true;
    } else {
        return false;
    }
};

module.exports = {
    getBlockchain,
    createNewBlock
};
