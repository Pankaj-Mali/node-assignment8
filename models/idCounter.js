const mongoose = require("mongoose");

const idCounterSchema = new mongoose.Schema({
    id:{type:Number},
});

const idCounter = mongoose.model("idCounter",idCounterSchema);

module.exports = idCounter;