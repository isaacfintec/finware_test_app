import getToken from '../../application/helpers/getToken';
import Create from '../../application/useCases/Create';
import { IUser, IUserInsert } from '../../domain/Interface';

export const userMock: Partial<IUserInsert> = {
  username: 'Alan Mathison Turing',
  email: 'alan_m_t@example.com',
  password: 'jdkslkew',
  postaladdress: 'Maida Vale, London, United Kingdom',
  birthdate: '23-06-1962',
};

export const failMock = { ...userMock } as Partial<IUserInsert>;
delete failMock.email;

export const createMockUser = async (mockUserProps?: Partial<IUserInsert>) => {
  const createUseCase = new Create();
  const mock = { ...userMock, mockUserProps };
  const user = await createUseCase.exec(mock as IUserInsert);
  const token = await getToken('user', user.id);
  const singUser: IUser & { token: string } = { ...user, token };
  return singUser;
};
