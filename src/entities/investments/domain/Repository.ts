import Repository from '../../../core/helpers/Repository';
import InvestmentModel from './Model';

class InvenstmentRepo extends Repository<InvestmentModel> {}
const invenstmentRepo = new InvenstmentRepo();
invenstmentRepo.setModel(InvestmentModel);
export default invenstmentRepo;
