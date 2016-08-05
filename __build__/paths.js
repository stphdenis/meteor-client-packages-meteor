const fs = require('fs');

const meteorVersion = JSON.parse(fs.readFileSync('./__src__/meteor-version.json')).version;
const meteorModules = JSON.parse(fs.readFileSync(`./__src__/meteor-packages-${meteorVersion}.json`));

module.exports = {
  meteorVersion: meteorVersion,
  packageVersion: meteorModules['package-version'],
  modules: meteorModules.modules,
};
