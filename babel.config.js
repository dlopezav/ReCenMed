module.exports = function (api) {
    api.cache(true);
    // const presets = [ ... ];
    const plugins = [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ]
  
    
    return {
      plugins
    };
  }