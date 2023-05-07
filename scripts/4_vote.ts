import { ethers } from "hardhat";

const contractAddress = "0x78b78280E0586b027a35F7feF0566DA734c39036";
const votingProposal = 1;

async function main() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const player = accounts[1];

    console.log(`Voting for a proposal`);
    const ballotContract = await ethers.getContractAt("Ballot", contractAddress, deployer);

    console.log(`Before voting ..........`);
    let proposal = await ballotContract.proposals(votingProposal);
    console.log(`${ethers.utils.parseBytes32String(proposal)} vote count: ${proposal.voteCount}`);

    const playerBallotContract = ballotContract.connect(player);
    const tx = await playerBallotContract.vote("1");
    await tx.wait(1);
    console.log(`${player.address} voted for ${proposal.name}`);

    console.log(`After voting ..........`);
    proposal = await ballotContract.proposals(1);
    console.log(`${ethers.utils.parseBytes32String(proposal)} vote count: ${proposal.voteCount}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
