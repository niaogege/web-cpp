import { Plugin, ResolvedConfig } from 'vite';

const virtualFibModuleId = 'virtual:fib';

// Vite 中约定对于虚拟模块，解析后的路径需要加上`\0`前缀
const resolvedFibVirtualModuleId = '\0' + virtualFibModuleId;

const virtualEnvModuleId = 'virtual:env';
const resolvedEnvVirtualModuleId = '\0' + virtualEnvModuleId;
export default function TestVirtual(): Plugin {
  let config: ResolvedConfig | null = null;
  return {
    name: 'vite:cpp-plugin-virtual',
    configResolved(c: ResolvedConfig) {
      config = c;
    },
    resolveId(id) {
      if (id === virtualFibModuleId) {
        return resolvedFibVirtualModuleId;
      }
      if (id === virtualEnvModuleId) {
        return resolvedEnvVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedFibVirtualModuleId) {
        return 'export default function fib(n) {return n <= 1 ? n : fib(n-1) + fib(n-2)}';
      }
      if (id === resolvedEnvVirtualModuleId) {
        return `export default ${JSON.stringify(config)}`;
      }
    }
  };
}
