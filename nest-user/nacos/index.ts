import { NacosNamingClient } from 'nacos-naming';
import { DataClient as NacosConfigClient } from 'nacos-config';

const logger = console;
const serviceName = 'nest-user';
const ip = 'localhost';
const port = 3001;
const serverAddr = '127.0.0.1:8848';
const namespace = '3c166fe6-b9c1-45d8-af04-0ade57db8265';
const group =
  process.env.NODE_ENV === 'development' ? 'NEST_USER_DEV' : 'NEST_USER_PRO';
let config = {};

export const setConfig = (cf) => {
  config = cf;
  cf && console.log(`${serviceName}接受到nacos的消息`, JSON.parse(cf));
};
export const getConfig = () => {
  return config;
};

export const startNacos = async () => {
  const client = new NacosNamingClient({
    logger,
    serverList: serverAddr,
    namespace,
  });
  await client.ready();
  await client.registerInstance(
    serviceName,
    {
      ip,
      port,
      clusterName: 'X',
    },
    group,
  );
  client.subscribe(
    { serviceName, groupName: group, clusters: 'X' },
    (hosts) => {
      console.log('subscribe======', hosts);
    },
  );
  watchNacos();
};

export const deregisterNacos = async (client) => {
  await client.deregisterInstance(serviceName, {
    ip,
    port,
  });
};

const watchNacos = async () => {
  const configClient = new NacosConfigClient({
    serverAddr,
  });
  configClient.subscribe(
    {
      dataId: serviceName,
      group,
    },
    async (content) => {
      setConfig(content);
    },
  );
  configClient.on('error', (err) => {
    console.log('error =====', err);
  });
};
