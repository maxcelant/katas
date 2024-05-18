
type AnyOptions = Record<string, string>;

type Config<T extends AnyOptions> = {
  name: string;
  description: string;
  create: (options: T) => void;
};

type Factory = Config<AnyOptions>;

function createFactory<T extends AnyOptions>(
  config: Config<T>
): Factory {
  return config as Factory;
}

type FrontendOptions = { framework: string };

const frontendPlugin = createFactory<FrontendOptions>({
  name: 'plugin',
  description: 'Create a frontend plugin',
  create: (options: FrontendOptions) => {
    console.log('creating using options: ', options);
  }
});

type BackendOptions = { apiName: string }

const backendPlugin = createFactory<BackendOptions>({
  name: 'plugin',
  description: 'Create a backend plugin',
  create: (options: BackendOptions) => {
    console.log('creating using options: ', options);
  }
});

backendPlugin.create({ apiName: '/orders'})
frontendPlugin.create({ framework: 'react@21'})
