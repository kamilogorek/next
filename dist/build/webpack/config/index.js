"use strict";exports.__esModule=true;exports.build=build;var _base=require("./blocks/base");var _css=require("./blocks/css");var _utils=require("./utils");async function build(config,{rootDirectory,customAppFile,isDevelopment,isServer,assetPrefix,sassOptions,productionBrowserSourceMaps}){const ctx={rootDirectory,customAppFile,isDevelopment,isProduction:!isDevelopment,isServer,isClient:!isServer,assetPrefix:assetPrefix?assetPrefix.endsWith('/')?assetPrefix.slice(0,-1):assetPrefix:'',sassOptions,productionBrowserSourceMaps};const fn=(0,_utils.pipe)((0,_base.base)(ctx),(0,_css.css)(ctx));return fn(config);}
//# sourceMappingURL=index.js.map