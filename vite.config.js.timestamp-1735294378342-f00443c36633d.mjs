// vite.config.js
import { defineConfig, loadEnv } from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/vite/dist/node/index.js";
import path2 from "path";

// vite/plugins/index.js
import vue from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/auto-import.js
import autoImport from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia"
    ],
    dts: false
  });
}

// vite/plugins/svg-icon.js
import { createSvgIconsPlugin } from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/compression.js
import compression from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/vite-plugin-compression/dist/index.mjs";
function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
}

// vite/plugins/setup-extend.js
import setupExtend from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
function createSetupExtend() {
  return setupExtend({});
}

// vite/plugins/index.js
import cesium from "file:///E:/YaanGIS/VUE3/yaan-vue3/node_modules/vite-plugin-cesium/dist/index.mjs";
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  vitePlugins.push(cesium());
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}

// vite.config.js
var __vite_injected_original_dirname = "E:\\YaanGIS\\VUE3\\yaan-vue3";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path2.resolve(__vite_injected_original_dirname, "./"),
        // 设置别名
        "@": path2.resolve(__vite_injected_original_dirname, "./src")
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // vite 相关配置
    server: {
      port: 81,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, "")
        },
        "/tdtproxy": {
          target: "http://t0.tianditu.com/",
          changeOrigin: true,
          rewrite: (path3) => path3.replace(/^\/tdtproxy/, "")
        }
      }
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidml0ZS9wbHVnaW5zL2luZGV4LmpzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC5qcyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24uanMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLmpzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxZYWFuR0lTXFxcXFZVRTNcXFxceWFhbi12dWUzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxZYWFuR0lTXFxcXFZVRTNcXFxceWFhbi12dWUzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9ZYWFuR0lTL1ZVRTMveWFhbi12dWUzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGNyZWF0ZVZpdGVQbHVnaW5zIGZyb20gJy4vdml0ZS9wbHVnaW5zJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICBjb25zdCB7IFZJVEVfQVBQX0VOViB9ID0gZW52XHJcbiAgcmV0dXJuIHtcclxuICAgIC8vIFx1OTBFOFx1N0Y3Mlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTQ4Q1x1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUwQlx1NzY4NFVSTFx1MzAwMlxyXG4gICAgLy8gXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDdml0ZSBcdTRGMUFcdTUwNDdcdThCQkVcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTY2MkZcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTU3REZcdTU0MERcdTc2ODRcdTY4MzlcdThERUZcdTVGODRcdTRFMEFcclxuICAgIC8vIFx1NEY4Qlx1NTk4MiBodHRwczovL3d3dy5ydW95aS52aXAvXHUzMDAyXHU1OTgyXHU2NzlDXHU1RTk0XHU3NTI4XHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1QjUwXHU4REVGXHU1Rjg0XHU0RTBBXHVGRjBDXHU0RjYwXHU1QzMxXHU5NzAwXHU4OTgxXHU3NTI4XHU4RkQ5XHU0RTJBXHU5MDA5XHU5ODc5XHU2MzA3XHU1QjlBXHU4RkQ5XHU0RTJBXHU1QjUwXHU4REVGXHU1Rjg0XHUzMDAyXHU0RjhCXHU1OTgyXHVGRjBDXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4IGh0dHBzOi8vd3d3LnJ1b3lpLnZpcC9hZG1pbi9cdUZGMENcdTUyMTlcdThCQkVcdTdGNkUgYmFzZVVybCBcdTRFM0EgL2FkbWluL1x1MzAwMlxyXG4gICAgYmFzZTogVklURV9BUFBfRU5WID09PSAncHJvZHVjdGlvbicgPyAnLycgOiAnLycsXHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNyZXNvbHZlLWFsaWFzXHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgLy8gXHU4QkJFXHU3RjZFXHU4REVGXHU1Rjg0XHJcbiAgICAgICAgJ34nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcclxuICAgICAgICAvLyBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNyZXNvbHZlLWV4dGVuc2lvbnNcclxuICAgICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy52dWUnXVxyXG4gICAgfSxcclxuICAgIC8vIHZpdGUgXHU3NkY4XHU1MTczXHU5MTREXHU3RjZFXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogODEsXHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jc2VydmVyLXByb3h5XHJcbiAgICAgICAgJy9kZXYtYXBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwKSA9PiBwLnJlcGxhY2UoL15cXC9kZXYtYXBpLywgJycpXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnL3RkdHByb3h5Jzp7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vNTkuMjU1LjQ4LjE2MDo4MS8nLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL3RkdHByb3h5LywgJycpLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vZml4OmVycm9yOnN0ZGluPjo3MzU2OjE6IHdhcm5pbmc6IFwiQGNoYXJzZXRcIiBtdXN0IGJlIHRoZSBmaXJzdCBydWxlIGluIHRoZSBmaWxlXHJcbiAgICBjc3M6IHtcclxuICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcG9zdGNzc1BsdWdpbjogJ2ludGVybmFsOmNoYXJzZXQtcmVtb3ZhbCcsXHJcbiAgICAgICAgICAgIEF0UnVsZToge1xyXG4gICAgICAgICAgICAgIGNoYXJzZXQ6IChhdFJ1bGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGF0UnVsZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcWWFhbkdJU1xcXFxWVUUzXFxcXHlhYW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFlhYW5HSVNcXFxcVlVFM1xcXFx5YWFuLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9ZYWFuR0lTL1ZVRTMveWFhbi12dWUzL3ZpdGUvcGx1Z2lucy9pbmRleC5qc1wiO2ltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5cclxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcclxuaW1wb3J0IGNyZWF0ZVN2Z0ljb24gZnJvbSAnLi9zdmctaWNvbidcclxuaW1wb3J0IGNyZWF0ZUNvbXByZXNzaW9uIGZyb20gJy4vY29tcHJlc3Npb24nXHJcbmltcG9ydCBjcmVhdGVTZXR1cEV4dGVuZCBmcm9tICcuL3NldHVwLWV4dGVuZCdcclxuXHJcbmltcG9ydCBjZXNpdW0gZnJvbSAndml0ZS1wbHVnaW4tY2VzaXVtJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudiwgaXNCdWlsZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCB2aXRlUGx1Z2lucyA9IFt2dWUoKV1cclxuICAgIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXV0b0ltcG9ydCgpKVxyXG5cdHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU2V0dXBFeHRlbmQoKSlcclxuICAgIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcclxuICAgIHZpdGVQbHVnaW5zLnB1c2goY2VzaXVtKCkpXHJcblx0aXNCdWlsZCAmJiB2aXRlUGx1Z2lucy5wdXNoKC4uLmNyZWF0ZUNvbXByZXNzaW9uKHZpdGVFbnYpKVxyXG4gICAgcmV0dXJuIHZpdGVQbHVnaW5zXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxZYWFuR0lTXFxcXFZVRTNcXFxceWFhbi12dWUzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcWWFhbkdJU1xcXFxWVUUzXFxcXHlhYW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXV0by1pbXBvcnQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1lhYW5HSVMvVlVFMy95YWFuLXZ1ZTMvdml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LmpzXCI7aW1wb3J0IGF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUF1dG9JbXBvcnQoKSB7XHJcbiAgICByZXR1cm4gYXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgICAndnVlJyxcclxuICAgICAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICAgICAncGluaWEnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBkdHM6IGZhbHNlXHJcbiAgICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcWWFhbkdJU1xcXFxWVUUzXFxcXHlhYW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFlhYW5HSVNcXFxcVlVFM1xcXFx5YWFuLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9ZYWFuR0lTL1ZVRTMveWFhbi12dWUzL3ZpdGUvcGx1Z2lucy9zdmctaWNvbi5qc1wiO2ltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG5cdFx0aWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvc3ZnJyldLFxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkXHJcbiAgICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcWWFhbkdJU1xcXFxWVUUzXFxcXHlhYW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFlhYW5HSVNcXFxcVlVFM1xcXFx5YWFuLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXByZXNzaW9uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9ZYWFuR0lTL1ZVRTMveWFhbi12dWUzL3ZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi5qc1wiO2ltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbXByZXNzaW9uKGVudikge1xyXG4gICAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTIH0gPSBlbnZcclxuICAgIGNvbnN0IHBsdWdpbiA9IFtdXHJcbiAgICBpZiAoVklURV9CVUlMRF9DT01QUkVTUykge1xyXG4gICAgICAgIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoJywnKVxyXG4gICAgICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xyXG4gICAgICAgICAgICAvLyBodHRwOi8vZG9jLnJ1b3lpLnZpcC9ydW95aS12dWUvb3RoZXIvZmFxLmh0bWwjXHU0RjdGXHU3NTI4Z3ppcFx1ODlFM1x1NTM4Qlx1N0YyOVx1OTc1OVx1NjAwMVx1NjU4N1x1NEVGNlxyXG4gICAgICAgICAgICBwbHVnaW4ucHVzaChcclxuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2Jyb3RsaScpKSB7XHJcbiAgICAgICAgICAgIHBsdWdpbi5wdXNoKFxyXG4gICAgICAgICAgICAgICAgY29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dDogJy5icicsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBsdWdpblxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcWWFhbkdJU1xcXFxWVUUzXFxcXHlhYW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFlhYW5HSVNcXFxcVlVFM1xcXFx5YWFuLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHNldHVwLWV4dGVuZC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovWWFhbkdJUy9WVUUzL3lhYW4tdnVlMy92aXRlL3BsdWdpbnMvc2V0dXAtZXh0ZW5kLmpzXCI7aW1wb3J0IHNldHVwRXh0ZW5kIGZyb20gJ3VucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU2V0dXBFeHRlbmQoKSB7XHJcbiAgICByZXR1cm4gc2V0dXBFeHRlbmQoe30pXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLGNBQWMsZUFBZTtBQUMzUyxPQUFPQSxXQUFVOzs7QUNEbVIsT0FBTyxTQUFTOzs7QUNBSixPQUFPLGdCQUFnQjtBQUV4VCxTQUFSLG1CQUFvQztBQUN2QyxTQUFPLFdBQVc7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQUEsSUFDQSxLQUFLO0FBQUEsRUFDVCxDQUFDO0FBQ0w7OztBQ1gwUyxTQUFTLDRCQUE0QjtBQUMvVSxPQUFPLFVBQVU7QUFFRixTQUFSLGNBQStCLFNBQVM7QUFDM0MsU0FBTyxxQkFBcUI7QUFBQSxJQUM5QixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLHNCQUFzQixDQUFDO0FBQUEsSUFDeEQsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLEVBQ2pCLENBQUM7QUFDTDs7O0FDVGdULE9BQU8saUJBQWlCO0FBRXpULFNBQVIsa0JBQW1DLEtBQUs7QUFDM0MsUUFBTSxFQUFFLG9CQUFvQixJQUFJO0FBQ2hDLFFBQU0sU0FBUyxDQUFDO0FBQ2hCLE1BQUkscUJBQXFCO0FBQ3JCLFVBQU0sZUFBZSxvQkFBb0IsTUFBTSxHQUFHO0FBQ2xELFFBQUksYUFBYSxTQUFTLE1BQU0sR0FBRztBQUUvQixhQUFPO0FBQUEsUUFDSCxZQUFZO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxrQkFBa0I7QUFBQSxRQUN0QixDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0o7QUFDQSxRQUFJLGFBQWEsU0FBUyxRQUFRLEdBQUc7QUFDakMsYUFBTztBQUFBLFFBQ0gsWUFBWTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsV0FBVztBQUFBLFVBQ1gsa0JBQWtCO0FBQUEsUUFDdEIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNBLFNBQU87QUFDWDs7O0FDM0JrVCxPQUFPLGlCQUFpQjtBQUUzVCxTQUFSLG9CQUFxQztBQUN4QyxTQUFPLFlBQVksQ0FBQyxDQUFDO0FBQ3pCOzs7QUpHQSxPQUFPLFlBQVk7QUFFSixTQUFSLGtCQUFtQyxTQUFTLFVBQVUsT0FBTztBQUNoRSxRQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDMUIsY0FBWSxLQUFLLGlCQUFpQixDQUFDO0FBQ3RDLGNBQVksS0FBSyxrQkFBa0IsQ0FBQztBQUNqQyxjQUFZLEtBQUssY0FBYyxPQUFPLENBQUM7QUFDdkMsY0FBWSxLQUFLLE9BQU8sQ0FBQztBQUM1QixhQUFXLFlBQVksS0FBSyxHQUFHLGtCQUFrQixPQUFPLENBQUM7QUFDdEQsU0FBTztBQUNYOzs7QURqQkEsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxNQUFNLFFBQVEsTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFFBQU0sRUFBRSxhQUFhLElBQUk7QUFDekIsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLElBSUwsTUFBTSxpQkFBaUIsZUFBZSxNQUFNO0FBQUEsSUFDNUMsU0FBUyxrQkFBa0IsS0FBSyxZQUFZLE9BQU87QUFBQSxJQUNuRCxTQUFTO0FBQUE7QUFBQSxNQUVQLE9BQU87QUFBQTtBQUFBLFFBRUwsS0FBS0MsTUFBSyxRQUFRLGtDQUFXLElBQUk7QUFBQTtBQUFBLFFBRWpDLEtBQUtBLE1BQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQTtBQUFBLE1BRUEsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFTLE1BQU07QUFBQSxJQUNwRTtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUE7QUFBQSxRQUVMLFlBQVk7QUFBQSxVQUNWLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxjQUFjLEVBQUU7QUFBQSxRQUM1QztBQUFBLFFBQ0EsYUFBWTtBQUFBLFVBQ1YsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsZUFBZSxFQUFFO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsZUFBZTtBQUFBLFlBQ2YsUUFBUTtBQUFBLGNBQ04sU0FBUyxDQUFDLFdBQVc7QUFDbkIsb0JBQUksT0FBTyxTQUFTLFdBQVc7QUFDN0IseUJBQU8sT0FBTztBQUFBLGdCQUNoQjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
