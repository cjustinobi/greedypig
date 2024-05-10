const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreedyPigApp", (m) => {
  const greedyPig = m.contract("GreedyPig", []);

  return { greedyPig };
});
