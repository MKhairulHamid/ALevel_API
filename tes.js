const crypto = require('crypto');

const secret = 'abcdefg';
let hash = 'sasa'
const hash = crypto.createHmac('sha256', secret)
                   .update(hash)
                   .digest('hex');
console.log(hash);