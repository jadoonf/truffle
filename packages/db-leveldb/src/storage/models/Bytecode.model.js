const Model = require("../Model");
const { soliditySha3 } = require("web3-utils");

class Bytecode extends Model {
  bytes;
  linkReferences;
  instructions;

  async beforeSave() {
    const newId = this.generateID();

    // Key exists in db, but data fields have changed so remove old key
    // This could also become a batch operation and would then be atomic
    if (this.id && this.id !== newId) {
      await Bytecode.delete(this.id);
    }
    this.id = newId;
  }

  generateID() {
    return soliditySha3(this.bytes + JSON.stringify(this.linkReferences));
  }
}

module.exports = Bytecode;
