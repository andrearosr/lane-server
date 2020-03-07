import { setUser, getUser } from '../../../helpers';

export default async function User(root, { user }, { ctx }, info) {
  // todo: 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // Done (2) - just data input is updated rather than overwriting all the data.

  const userData = await getUser(user.id);
  const payload = { ...userData, ...user };

  await setUser(payload);
  const updated = await getUser(user.id);

  return updated;
}
