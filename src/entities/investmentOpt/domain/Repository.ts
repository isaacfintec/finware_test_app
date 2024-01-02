import Repository from '../../../core/helpers/Repository';
import InvestmentOptModel from './Model';

class InvenstmentOptRepo extends Repository<InvestmentOptModel> {}
const invenstmentOptRepo = new InvenstmentOptRepo();
invenstmentOptRepo.setModel(InvestmentOptModel);
export default invenstmentOptRepo;
