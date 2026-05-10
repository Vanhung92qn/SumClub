// ─────────────────────────────────────────────────────────────────
//  Auto-detect: chay local (Cocos Creator preview / file://) -> tat CDN
//  → tranh mismatch hash khi build local chua deploy CDN.
//  Production (bay789x.me, Cloudflare) -> bat CDN.
// ─────────────────────────────────────────────────────────────────
function detectCdnUrl() {
    if (typeof window === 'undefined' || !window.location) return '';
    var host = window.location.hostname || '';
    var isLocal = host === 'localhost'
        || host === '127.0.0.1'
        || host === ''
        || /^192\.168\./.test(host)
        || /^10\./.test(host)
        || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host);
    return isLocal ? '' : 'https://res.bay789x.me/';
}

module.exports = {

    HOST_U: '',
    IS_APPSTORE: false,
    PORTAL: 'test',

    HOST: 'bay789x.me',
    FB_LOGIN_URL: 'http://fbook.bay789x.me/Home/FbLogin',

    PING_TIME: 5,
    RECONNECT_TIME: 5,

    // ─────────────────────────────────────────────────────────────
    //  ASSET CDN (BundleControl):
    //  - Local (preview/test):  '' -> fallback relative URL (load tu Creator server).
    //  - Production:            'https://res.bay789x.me/' -> CDN voi cache-bust hash.
    //  Auto-detect qua hostname.
    // ─────────────────────────────────────────────────────────────
    ASSET_CDN_URL: detectCdnUrl(),

};
