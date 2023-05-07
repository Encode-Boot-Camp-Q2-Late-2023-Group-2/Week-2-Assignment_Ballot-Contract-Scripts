import { ethers } from "hardhat";

const contractAddress = "0x78b78280E0586b027a35F7feF0566DA734c39036";

async function main() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    console.log(`Winner Details:`);
    const ballotContract = await ethers.getContractAt("Ballot", contractAddress, deployer);

    const winningProposal = await ballotContract.winningProposal();
    const winnerName = await ballotContract.winnerName();
    console.log(`Winning Proposal: ${winningProposal}`);
    console.log(`Proposal Name: ${winnerName}`);

    let proposal = await ballotContract.proposals("1");
    console.log(`${ethers.utils.parseBytes32String(proposal)} vote count: ${proposal.voteCount}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
