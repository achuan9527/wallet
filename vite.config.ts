import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import commonjs from 'vite-plugin-commonjs';
import eslint from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';
// import squooshPlugin from 'vite-plugin-squoosh';
import { $ } from 'zx';

const envPrefix = ['REACT_', 'VITE_', 'NODE_'];
const getInfo = async () => {
  const version = new Date().toLocaleString('zh', {
    timeZone: 'Asia/Hong_Kong',
  });
  const branch = (
    await $`git branch --show-current`.catch(() => 'get branch error')
  )
    .toString()
    .replace(/\n/, '');
  const commit = (await $`git rev-parse HEAD`.catch(() => 'get commit error'))
    .toString()
    .replace(/\n/, '');
  return { version, branch, commit };
};
export default async ({ mode }) => {
  const info = await getInfo();
  process.env = {
    ...process.env,
    ...loadEnv(mode, path.resolve(__dirname, './'), envPrefix),
  };
  // https://vitejs.dev/config/
  return defineConfig({
    root: __dirname,
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            version: info?.version,
          },
        },
      }),
      react(),
      commonjs(),
      // Plugin({
      //   modules: [
      //     {
      //       name: 'node-forge',
      //       var: 'forge',
      //       path: `dist/forge.min.js`,
      //     },
      //   ],
      // }),
      AutoImport({
        imports: [
          'react',
          'react-router-dom',
          'react-i18next',
          'ahooks',
          {
            "lodash-es": [
              'omitBy',
              'random',
              'debounce',
              'shuffle',
              'range',
              'uniq',
              'uniqBy',
              'difference',
              'forEach',
              'toLower',
              'orderBy',
              'groupBy',
              'isEqual',
              'find',
              'findIndex',
              'filter',
              'map',
              'get',
              'last',
              'chunk',
              'cloneDeep',
              'isUndefined',
              'omit',
              'take',
              'isNil',
              'floor',
              'negate',
              'concat',
              'unionBy',
              'max',
              'reduce',
              'differenceBy',
              'head',
              'flatten',
              'sumBy',
              'keys',
              'values',
              'reduceRight',
              'split',
              'chain',
              'some',
              'nth',
              'sortBy',
              'pick',
              'drop',
              'isEmpty',
              'fill',
              'assign',
              'sampleSize',
              'slice',
              'multiply',
              'xor',
              'maxBy',
              'countBy',
              'uniqWith',
              'min',
            ],
            'react-redux': ['useSelector', 'useDispatch'],
            // mathjs: ["evaluate", "subtract", "add", "multiply", "divide", "bignumber"],
            nanoid: ['nanoid'],
            'use-immer': ['useImmer', 'useImmerReducer'],
            numeral: [['default', 'numeral']],
            mitt: [['default', 'mitt']],
            'date-fns': ['format', 'getTime', 'isBefore'],
            classnames: [['default', 'classnames']],
            // 'styled-components': [['default', 'styled'], 'css'],
            '@ebay/nice-modal-react': [
              ['useModal', 'niceModalUseModal'],
              ['create', 'niceModalCreate'],
              ['register', 'niceModalRegister'],
              ['show', 'niceModalShow'],
              ['hide', 'niceModalHide'],
              ['default', 'NiceModal'],
            ],
            // '@reduxjs/toolkit': ['createSlice', 'createSelector'],
            // hox: ['createGlobalStore', 'createStore'],
            // dayjs: [['default', 'dayjs']],
            // md5: [['default', 'md5']],
            // 'nats.ws': [
            //   'connect',
            //   'StringCodec',
            //   'usernamePasswordAuthenticator',
            //   'JSONCodec',
            //   'NatsConnection',
            //   'NatsError',
            //   'Msg',
            //   'ConnectionOptions',
            //   'MsgHdrs',
            //   'Codec',
            //   'PublishOptions',
            // ],
            // "react-reveal": ["Zoom", "Fade"],
            // "framer-motion": ["motion"],
          },
        ],

        dts: true,
        dirs: [
          'src/store',
          'src/routers',
          '../../common/api',
          '../../common/hook',
          '../../common/utils',
          'src/utils',
          'src/config',
          'src/constants',
          'src/hooks',
          '../../common/config',
        ],
      }),
      // eslint({
      //   exclude: ['**/*.js'],
      // }),
      // squooshPlugin({
      //   codecs: {
      //     mozjpeg: { quality: 75, smoothing: 1 },
      //     webp: { quality: 75 },
      //     avif: { cqLevel: 75, sharpness: 1 },
      //     jxl: { quality: 75 },
      //     wp2: { quality: 75 },
      //     oxipng: { level: 3 }
      // },
      // })
    ],
    resolve: {
      // TODO 看情况自己改
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    logLevel: 'info',
    server: {
      port: 8888,
      // base: '/',
      host: 'localhost',
      proxy: {
        // TODO 看情况自己改
        // '/gameApi': {
        //   target: process.env.REACT_APP_GAME_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/gameApi/, ''),
        // },
        // '/userApi': {
        //   target: process.env.REACT_APP_USER_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/userApi/, ''),
        // },
        // '/orderApi': {
        //   target: process.env.REACT_APP_ORDER_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/orderApi/, ''),
        // },
        // '/systemApi': {
        //   target: process.env.REACT_APP_SYSTEM_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/systemApi/, ''),
        // },
        // '/im': {
        //   target: process.env.REACT_APP_CHATROOM_API_URL,
        //   changeOrigin: true,
        //   // rewrite: (path) => path.replace(/^\/im/, ''),
        // },
      },
    },
    build:
      process.env.NODE_ENV === 'production'
        ? {
            outDir: 'dist',
            minify: 'terser',
            // terserOptions: {
            //   compress: {
            //     //生产环境时移除console
            //     drop_console: true,
            //     drop_debugger: true,
            //   },
            // },
            rollupOptions: {
              input: path.resolve(__dirname, 'index.html'),
            },
            sourcemap: true,
          }
        : {
            outDir: 'dist',
            rollupOptions: {
              input: path.resolve(__dirname, 'index.html'),
            },
            sourcemap: true,
          },
    envPrefix: envPrefix,
    define: {
      __APP_VERSION__: info,
    },
  });
  /// <reference types="vite/client" />
};
