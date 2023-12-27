import * as http from 'http';
import app from '../app';

const PORT = normalizePort(process.env.PORT);

app.set('port', PORT);
const server = http.createServer(app);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', (e) => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(1);
});

function normalizePort(p: string) {
  const DEFAULT_PORT = 8000;
  const numberPort = parseInt(p, 10);
  if (isNaN(numberPort)) return DEFAULT_PORT;
  return numberPort;
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

function onError(error): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = `Port ${PORT}`;
  /* eslint-disable */
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
  /* eslint-disable */
}
