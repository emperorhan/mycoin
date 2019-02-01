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

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
};

console.log(blockchain);