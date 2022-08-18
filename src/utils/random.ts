const rndNumber = (n = 1000) => Math.floor(Math.random() * n);
const rndPass = () => Math.random().toString(36).slice(-8);

export { rndNumber, rndPass };
