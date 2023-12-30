import Repository from '../../../core/helpers/Repository';
import UserModel from './Model';

class UserRepository extends Repository<UserModel> {}
const userRepository = new UserRepository();
userRepository.setModel(UserModel);
export default userRepository;
