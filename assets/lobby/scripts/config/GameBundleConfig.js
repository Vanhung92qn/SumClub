/**
 * GameBundleConfig.js
 * ─────────────────────────────────────────────────────────────────
 * Bảng mapping: GameId → Bundle Name + Prefab chính + Dependencies
 * Đặt file này tại: assets/lobby/scripts/config/GameBundleConfig.js
 *
 * THIẾT KẾ:
 *  - _RAW_DATA dùng string VALUE trực tiếp ('8', '63'...) → KHÔNG phụ
 *    thuộc cc.GameId khi load → giải quyết hoàn toàn lỗi load-order.
 *  - _configMap được build lazy (lần đầu gọi API) → O(1) lookup sau đó.
 *  - Thêm game mới: chỉ cần thêm 1 dòng vào _RAW_DATA, không sửa gì khác.
 *
 * CẤU TRÚC MỖI RECORD:
 *  value      : string — Giá trị số của cc.GameId (vd: '8' = TAI_XIU)
 *  label      : string — Tên tường minh để dễ đọc (vd: 'TAI_XIU')
 *  bundleName : string — Tên Asset Bundle (trùng tên folder trong assets/)
 *  mainPrefab : string — Đường dẫn prefab TRONG bundle (dùng cho bundle.load())
 *  deps       : Array  — Bundle cần load TRƯỚC bundle này
 * ─────────────────────────────────────────────────────────────────
 */
(function () {

    // ═══════════════════════════════════════════════════════════════
    //  RAW DATA — Plain string, KHÔNG dùng cc.GameId ở đây.
    //  Lý do: cc.GameId có thể chưa được load khi file này chạy.
    //  Giá trị string phải khớp với cc.GameId trong GameId.js.
    // ═══════════════════════════════════════════════════════════════
    var _RAW_DATA = [

        // ── MINIGAMES ───────────────────────────────────────────────
        //  LƯU Ý: tên prefab phải khớp CHÍNH XÁC với file trong assets/taixiu/prefabs
        //  Hiện tại: file thật là 'prefabs/taixiuView.prefab' (chữ t thường ở đầu).
        { value: '8',  label: 'TAI_XIU',          bundleName: 'taixiu',        mainPrefab: 'prefabs/taixiuView',         deps: []               },
        { value: '68', label: 'TAI_XIU_MD5',       bundleName: 'taixiumd5',     mainPrefab: 'prefabs/taixiuMd5View',      deps: []               },
        { value: '81', label: 'TAI_XIU_SIEU_TOC',  bundleName: 'taixiusieutoc', mainPrefab: 'prefabs/taiXiuSieuTocView',  deps: []               },
        { value: '63', label: 'XOC_XOC',           bundleName: 'xocxoc',        mainPrefab: 'prefabs/XXView',             deps: []               },
        { value: '20', label: 'BAUCUA',             bundleName: 'baucua',        mainPrefab: 'prefabs/BauCuaView',         deps: []               },
        { value: '14', label: 'DRAGON_TIGER',       bundleName: 'dragontiger',   mainPrefab: 'prefabs/DragonTigerView',    deps: []               },
        { value: '70', label: 'SICBO',              bundleName: 'sicbo',         mainPrefab: 'prefabs/SicBoView',          deps: []               },
        { value: '21', label: 'LODE',               bundleName: 'lode',          mainPrefab: 'prefabs/LodeView',           deps: []               },
        { value: '11', label: 'MINI_POKER',         bundleName: 'minipoker',     mainPrefab: 'prefabs/MiniPokerView',      deps: []               },
        { value: '23', label: 'SHOOT_FISH',         bundleName: 'shootfish',     mainPrefab: 'prefabs/ShootFishView',      deps: []               },

        // ── SLOTS (cần slots_core load trước) ───────────────────────
        { value: '4',  label: 'EGYPT',              bundleName: 'egypt',         mainPrefab: 'prefabs/EgyptView',          deps: ['slots_core']   },
        { value: '1',  label: 'AQUARIUM',           bundleName: 'aquarium',      mainPrefab: 'prefabs/AquariumView',       deps: ['slots_core']   },
        { value: '15', label: 'DRAGON_BALL',        bundleName: 'dragonball',    mainPrefab: 'prefabs/DragonBallView',     deps: ['slots_core']   },
        { value: '3',  label: 'COWBOY',             bundleName: 'cowboy',        mainPrefab: 'prefabs/CowboyView',         deps: ['slots_core']   },
        { value: '17', label: 'GAINHAY',            bundleName: 'gainhay',       mainPrefab: 'prefabs/GainHayView',        deps: ['slots_core']   },
        { value: '16', label: 'THUONG_HAI',         bundleName: 'thuonghai',     mainPrefab: 'prefabs/ThuongHaiView',      deps: ['slots_core']   },
        { value: '7',  label: 'SEVEN77',            bundleName: '777',           mainPrefab: 'prefabs/Seven77View',        deps: ['slots_core']   },
        { value: '12', label: 'BLOCK_BUSTER',       bundleName: 'blockbuster',   mainPrefab: 'prefabs/BlockBusterView',    deps: ['slots_core']   },
        { value: '2',  label: 'THREE_KINGDOM',      bundleName: 'tk',            mainPrefab: 'prefabs/TKView',             deps: ['slots_core']   },

        // ── CARD GAMES (cần cardgame_core load trước) ───────────────
        { value: '51', label: 'BA_CAY',             bundleName: 'bacay',         mainPrefab: 'prefabs/BaCayView',          deps: ['cardgame_core']},
        { value: '19', label: 'BACCARAT',           bundleName: 'bacarat',       mainPrefab: 'prefabs/BacaratView',        deps: ['cardgame_core']},
        { value: '55', label: 'MAU_BINH',           bundleName: 'maubinh',       mainPrefab: 'prefabs/MauBinhView',        deps: ['cardgame_core']},
        { value: '54', label: 'TIEN_LEN_MN',        bundleName: 'tienlenMN',     mainPrefab: 'prefabs/TienLenMNView',      deps: ['cardgame_core']},
        { value: '66', label: 'TIEN_LEN_MN_SOLO',   bundleName: 'tienlenMN',     mainPrefab: 'prefabs/TienLenMNSoloView',  deps: ['cardgame_core']},
        { value: '57', label: 'POKER_TEXAS',        bundleName: 'poker',         mainPrefab: 'prefabs/PokerView',          deps: ['cardgame_core']},
    ];

    // ═══════════════════════════════════════════════════════════════
    //  LAZY MAP — Build một lần, tra cứu O(1) mãi sau đó.
    //  Không build lúc module load → tránh hoàn toàn lỗi load-order.
    // ═══════════════════════════════════════════════════════════════
    var _map = null; // null = chưa build

    function _ensureMap() {
        if (_map !== null) return; // Đã build rồi, skip

        _map = Object.create(null); // Dùng null-prototype map → không bị kế thừa key lạ
        for (var i = 0, len = _RAW_DATA.length; i < len; i++) {
            var r = _RAW_DATA[i];
            _map[r.value] = {
                value:      r.value,
                label:      r.label,
                bundleName: r.bundleName,
                mainPrefab: r.mainPrefab,
                deps:       r.deps,
            };
        }
        Object.freeze(_map); // Bảo vệ: không cho code khác vô tình sửa map
    }

    // ═══════════════════════════════════════════════════════════════
    //  PUBLIC API  (cc.GameBundleConfig)
    // ═══════════════════════════════════════════════════════════════
    var GameBundleConfig = Object.freeze({

        /**
         * Lấy toàn bộ config record theo gameId string value.
         * @param  {string} gameId  Giá trị cc.GameId (vd: cc.GameId.TAI_XIU === '8')
         * @returns {{ value, label, bundleName, mainPrefab, deps } | null}
         */
        getByGameId: function (gameId) {
            _ensureMap();
            return _map[gameId] || null;
        },

        /**
         * Tên bundle tương ứng với gameId.
         * @param  {string} gameId
         * @returns {string | null}
         */
        getBundleName: function (gameId) {
            _ensureMap();
            var cfg = _map[gameId];
            return cfg ? cfg.bundleName : null;
        },

        /**
         * Đường dẫn prefab chính bên trong bundle.
         * @param  {string} gameId
         * @returns {string | null}
         */
        getMainPrefab: function (gameId) {
            _ensureMap();
            var cfg = _map[gameId];
            return cfg ? cfg.mainPrefab : null;
        },

        /**
         * Danh sách bundle phải load trước bundle của game này.
         * @param  {string} gameId
         * @returns {string[]}  Mảng rỗng nếu không có deps.
         */
        getDeps: function (gameId) {
            _ensureMap();
            var cfg = _map[gameId];
            return cfg ? cfg.deps : [];
        },

        /**
         * Kiểm tra game có config bundle chưa.
         * Dùng trong LobbyView._createDynamicView() để chọn code path
         * (bundle path vs cc.loader fallback path).
         * @param  {string} gameId
         * @returns {boolean}
         */
        hasBundleConfig: function (gameId) {
            _ensureMap();
            return gameId in _map;
        },

        /**
         * [DEBUG] Trả về danh sách toàn bộ configs đã đăng ký.
         * Chỉ dùng trong development/debug, không gọi ở production.
         * @returns {Array}
         */
        debugGetAll: function () {
            _ensureMap();
            var result = [];
            var keys = Object.keys(_map);
            for (var i = 0; i < keys.length; i++) {
                result.push(_map[keys[i]]);
            }
            return result;
        },
    });

    cc.GameBundleConfig = GameBundleConfig;

}).call(this);
