import { rndNumber, rndPass } from '../utils/random';
import { Role, User } from './baseTypes';

const getEmptyUser = (): User => {
  const id = rndNumber() + '';
  const defaultName = 'guest' + id;
  return {
    id,
    login: defaultName,
    name: defaultName,
    pass: rndPass(),
    role: Role.Guest,
  };
};

export default getEmptyUser;
