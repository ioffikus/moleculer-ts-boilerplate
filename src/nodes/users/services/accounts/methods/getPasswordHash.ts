import { Service } from 'moleculer';

export const getPasswordHash = async function(
  this: Service,
  params: {
    password: string;
  },
) {
  // eslint-disable-next-line no-console
  console.log(params);

  return true;
};
