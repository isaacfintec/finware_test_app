import { faker } from '@faker-js/faker';

import getToken from '../../application/helpers/getToken';
import Create from '../../application/useCases/Create';
import { IUser, IUserInsert } from '../../domain/Interface';
import { IWallet } from '../../../../entities/wallet/domain/Interface';

export const getUserMock = (): Partial<IUserInsert> => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'Hola.1234',
  postaladdress: faker.location.streetAddress(),
  birthdate: '23-06-1962',
});

export const failMock = { ...getUserMock() } as Partial<IUserInsert>;
delete failMock.email;

export const createMockUser = async (mockUserProps?: Partial<IUserInsert>) => {
  const createUseCase = new Create();
  const mock = { ...getUserMock(), mockUserProps };
  const { user, wallet } = await createUseCase.exec(mock as IUserInsert);
  const token = await getToken('user', user.id);
  const singUser: IUser & { token: string; wallet: IWallet } = { ...user, token, wallet };
  return singUser;
};
