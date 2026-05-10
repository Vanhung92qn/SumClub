module.exports = {

    HOST_U: '',
    IS_APPSTORE: false,
    PORTAL: 'test',

    HOST: 'bay789x.me',
    FB_LOGIN_URL: 'http://fbook.bay789x.me/Home/FbLogin',

    PING_TIME: 5,
    RECONNECT_TIME: 5,

    // ─────────────────────────────────────────────────────────────
    //  ASSET CDN (BundleControl)
    //  - Rong '': local mode → cc.assetManager.loadBundle(name) relative URL.
    //  - Set     : CDN mode → fetch AssetBundleVersion.json + cache-bust hash.
    //
    //  Co Cloudflare proxy: user vao HTTPS, origin server HTTP port 80 → OK.
    //  Tat tam thoi → de '' va build/deploy nhu cu.
    // ─────────────────────────────────────────────────────────────
    ASSET_CDN_URL: 'https://res.bay789x.me/',

};
