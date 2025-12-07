import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias';

import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const extensions= ['.js', '.ts', '.vue']

const plugins = [
    alias({
        entries: {
            'vue': 'vue/dist/vue.runtime.esm-browser.prod.js'
        }
    }),
    resolve({ extensions, browser: true}),
    commonjs(),
    vue(),
    postcss({
        minimize: true
    }),
    esbuild({
      include: /\.[jt]s$/,
      target: 'es2022',
      tsconfig: 'tsconfig.json',
      sourceMap: true
    }),
]

if (process.env.NODE_ENV === 'development') {
    plugins.push(livereload())
    plugins.push(serve({
        historyApiFallback: true,
        contentBase: ['dev', 'dist']
    }))
}

export default {
    input: './src/index.ts',
    external: [],
    plugins,
    output: [
        {
            file: 'dist/bundle.js',
            format: 'umd',
        },
    ],
}
