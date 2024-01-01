/* eslint-disable no-restricted-syntax */
import RoutesGen from '../../../../core/helpers/RoutesGen';
import { optionalRoutes, signRoutes } from './routes';

const optional = RoutesGen.generateRoutes(optionalRoutes);
const sing = RoutesGen.generateRoutes(signRoutes);

export default { optional, sing };
