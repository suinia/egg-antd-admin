import { IConfig } from 'umi-types';

const config: IConfig =  {
  targets: {
    ie: 11,
    ios: 8,
  },
  treeShaking: true,
  hash: true,
  publicPath: './',
  outputPath: '../public',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'egg-antd-admin',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: [
    { path: '/', component: '../layouts/BasicLayout',
      routes: [
        { path: '/', component: './index' },
        { path: '/list', component: './List/index' },
      ]
    },
  ],
  manifest: {
    fileName: '../../config/manifest.json',
    // 定义静态资源 publicPath，体现在 manifest.json 中
    publicPath: '/public/'
  },
  uglifyJSOptions(opts) {
    opts.uglifyOptions.output.ascii_only = false;
    return opts;
  },
}

export default config;
