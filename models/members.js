const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true, min: 3, max: 55 },
    isGold: { type: Boolean, default: false },
    data: { type: Date, default: Date.now },
    phone: { type: String, required: true, min: 3, max: 5 },
});

const Member = mongoose.model('Member', memberSchema);

async function createMember() {
    const member = new Member({
        name: "Ian Wright",
        isGold: true,
        phone: "5432"
    });
    try {
        const result = await member.save();
        console.log(result);
    } catch (exp) {
        console.error(exp);
    }
}

module.exports = { Member, createMember };
