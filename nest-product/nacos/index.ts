import { NacosNamingClient } from 'nacos-naming';
import { DataClient as NacosConfigClient } from 'nacos-config';

const logger = console;
const serviceName = 'nest-product';
const ip = 'localhost';
const port = 4001;
const serverAddr = '127.0.0.1:8848';
const namespace = '64d20b55-9108-4e41-8167-83388a2f941d';

const group =
  process.env.NODE_ENV === 'development'
    ? 'NEST_PRODUCT_DEV'
    : 'NEST_PRODUCT_PRO';

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
    namespace,
  });
  configClient.subscribe(
    {
      dataId: serviceName,
      group,
    },
    (content) => {
      setConfig(content);
    },
  );
};
