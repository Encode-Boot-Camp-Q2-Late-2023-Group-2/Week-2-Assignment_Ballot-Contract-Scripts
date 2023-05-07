import { ethers } from "hardhat";

const contractAddress = "0x78b78280E0586b027a35F7feF0566DA734c39036";

async function main() {
    const accounts = await ethers.getSigners();
    const signer = accounts[0];
    const player = accounts[1];

    console.log(`Giving right to vote to "${player.address}"`);
    const ballotContract = await ethers.getContractAt("Ballot", contractAddress, signer);
    const tx = await ballotContract.giveRightToVote(player.address);
    await tx.wait(1);
    const voter = await ballotContract.voters(player.address);

    console.log(
        `Voter with address "${player.address}" have right to vote with weight "${voter.weight}"`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
