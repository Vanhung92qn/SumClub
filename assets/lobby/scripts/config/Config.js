var netConfig = require('NetConfig');

(function () {
    var Config;
    var VERSION, VERSION_CODE, TID, Z_INDEX, MIN_VIP_SHOW_CHAT;

    VERSION = '1.0';
    VERSION_CODE = 0;
    TID = 0;
    Z_INDEX = 10;
    MIN_VIP_SHOW_CHAT = 0; //rank toi thieu show VIP khi chat

    var GROUP_TELE_XVIDEOS = 'https://t.me/CSKH_S86';

    var GROUP_FB_B1 = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B1 = 'https://www.facebook.com/s86club.game';

    var GROUP_FB_B2 = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B2 = 'https://www.facebook.com/s86club.game';

    var GROUP_FB_B3 = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B3 = 'https://www.facebook.com/s86club.game';

    var GROUP_FB_B4 = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B4 = 'https://www.facebook.com/s86club.game';

    var TELE_HOTRO = 'https://t.me/CSKH_S86';
    var TAI_OTP_X6 = 'https://t.me/s86club_bot';
	var LIVE_CHAT = 'https://t.me/CSKH_S86';

    var DOWNLOAD_URL_B1 = 'https://bay789x.me/go88kstore.apk';
    var DOWNLOAD_URL_B2 = 'https://bay789x.me/go88kstore.apk';
    var DOWNLOAD_URL_B3 = 'https://bay789x.me/go88kstore.apk';
    var DOWNLOAD_URL_B4 = 'https://bay789x.me/go88kstore.apk';
	var DOWNLOAD_TELE = 'https://telegram.org/';
	var MD5_SERVICE = 'https://md5.services/';

    var OLD_URLs = []; //bigbom.win
    var NEW_URLs = [];

    //FAKE 2
    var GROUP_FB_B1_F = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B1_F = 'https://www.facebook.com/';

    var GROUP_FB_B2_F = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B2_F = 'https://www.facebook.com/s86club.game';

    var GROUP_FB_B3_F = 'https://www.facebook.com/s86club.game';
    var FANPAGE_FB_B3_F = 'https://www.facebook.com/s86club.game';

    var FAKE_URLs = [];

    var FAKE_DOMAIN = [];


    var DOMAIN_VK = ['nothing.club'];

    Config = (function () {
        var instance;

        function Config() {}

        instance = void 0;

        Config.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Config.prototype.getDomainVK = function () {
            return DOMAIN_VK;
        };

        Config.prototype.getMinVipShowChat = function () {
            return MIN_VIP_SHOW_CHAT;
        };

        Config.prototype.getServiceId = function () {
            switch (netConfig.HOST) {
                case "bay789x.me":
                    return cc.ServiceId.BLOCK_BUSTER;
                case "bay789x.me":
                    return cc.ServiceId.BLOCK_BUSTER_2;
                case "bay789x.me":
                    return cc.ServiceId.BLOCK_BUSTER_3;
                case "bay789x.me":
                    return cc.ServiceId.BLOCK_BUSTER_4;
                default:
                    return cc.ServiceId.BLOCK_BUSTER;
            }

        };

        Config.prototype.getServiceName = function (serviceId) {
            switch (serviceId) {
                case cc.ServiceId.OLD:
                case cc.ServiceId.BLOCK_BUSTER:
                    return '<color=#32CB09>[' + cc.ServiceName.BLOCK_BUSTER + ']</color> ';
                case cc.ServiceId.BLOCK_BUSTER_2:
                    return '<color=#32CB09>[' + cc.ServiceName.BLOCK_BUSTER_2 + ']</color> ';
                case cc.ServiceId.BLOCK_BUSTER_3:
                    return '<color=#32CB09>[' + cc.ServiceName.BLOCK_BUSTER_3 + ']</color> ';
                case cc.ServiceId.BLOCK_BUSTER_4:
                    return '<color=#32CB09>[' + cc.ServiceName.BLOCK_BUSTER_4 + ']</color> ';
            }
        };

        Config.prototype.getIndexIcon = function (serviceId) {
            switch (serviceId) {
                case cc.ServiceId.OLD:
                case cc.ServiceId.BLOCK_BUSTER:
                    return 0;
                case cc.ServiceId.BLOCK_BUSTER_2:
                    return 1;
                case cc.ServiceId.BLOCK_BUSTER_3:
                    return 2;
                case cc.ServiceId.BLOCK_BUSTER_4:
                    return 3;
            }
        };

        Config.prototype.getServiceNameNoFormat = function (serviceId) {
            switch (serviceId) {
                case cc.ServiceId.OLD:
                case cc.ServiceId.BLOCK_BUSTER:
                    return '[' + cc.ServiceName.BLOCK_BUSTER + '] ';
                case cc.ServiceId.BLOCK_BUSTER_2:
                    return '[' + cc.ServiceName.BLOCK_BUSTER_2 + '] ';
                case cc.ServiceId.BLOCK_BUSTER_3:
                    return '[' + cc.ServiceName.BLOCK_BUSTER_3 + '] ';
                case cc.ServiceId.BLOCK_BUSTER_4:
                    return '[' + cc.ServiceName.BLOCK_BUSTER_4 + '] ';
            }
        };

        Config.prototype.getIndexByNation = function (nationCode) {
            let indexNation;
            switch (nationCode) {
                case cc.NationCode.Japan:
                    indexNation = 4;
                    break;
                case cc.NationCode.Korea:
                    indexNation = 8;
                    break;
                case cc.NationCode.Russia:
                    indexNation = 1;
                    break;
                case cc.NationCode.Ukraine:
                    indexNation = 2;
                    break;
                    // case cc.NationCode.Belarus:
                    //     indexNation = 5;
                    //     break;
                case cc.NationCode.Germany:
                    indexNation = 3;
                    break;
                case cc.NationCode.Poland:
                    indexNation = 5;
                    break;
                case cc.NationCode.Taipen:
                    indexNation = 6;
                    break;
                case cc.NationCode.Sec:
                    indexNation = 7;
                    break;
                default:
                    indexNation = 0;
            }

            return indexNation;
        };

        Config.prototype.getNationByNationCode = function (nationCode) {
            switch (nationCode) {
                case cc.NationCode.Japan:
                    return 'Nhật Bản';
                case cc.NationCode.Korea:
                    return 'Hàn Quốc';
                case cc.NationCode.Russia:
                    return 'Nga';
                case cc.NationCode.Ukraine:
                    return 'Ukraina';
                case cc.NationCode.Belarus:
                    return 'Belarus';
                case cc.NationCode.Poland:
                    return 'Ba Lan';
                case cc.NationCode.Germany:
                    return 'Đức';
                case cc.NationCode.Taipen:
                    return 'Đài Loan';
                case cc.NationCode.Sec:
                    return 'Cộng hoà Séc';
                default:
                    return '';
            }
        };

        Config.prototype.checkErrorDomain = function () {
            var isError = false;
            OLD_URLs.forEach(function (domain) {
                if (domain === cc.Tool.getInstance().getHostName()) {
                    isError = true;
                }
            });

            return isError;
        };


        Config.prototype.checkFDomain = function () {
            var isF = false;
            FAKE_URLs.forEach(function (domain) {
                if (domain === cc.Tool.getInstance().getHostName()) {
                    isF = true;
                }
            });

            FAKE_DOMAIN.forEach(function (domain) {
                if (domain === netConfig.HOST) {
                    isF = true;
                }
            });

            return isF;
        };

        Config.prototype.getNewDomain = function () {
            var newDomain = '';
            var index = 0;
            OLD_URLs.forEach(function (domain) {
                if (domain === cc.Tool.getInstance().getHostName()) {
                    newDomain = NEW_URLs[index];
                }
                index++;
            });

            return newDomain;
        };

        Config.prototype.formatName = function (name, maxLength) {
            if (name.length > maxLength) {
                return name.substring(0, maxLength) + '..';
            } else {
                return name;
            }
        };

        Config.prototype.checkUrl = function (name, maxLength) {
            if (name.length > maxLength) {
                return name.substring(0, maxLength) + '..';
            } else {
                return name;
            }
        };

        Config.prototype.getRoomValue = function (gameId, roomId) {
            switch (gameId.toString()) {
                case cc.GameId.THREE_KINGDOM:
                case cc.GameId.EGYPT:
                case cc.GameId.AQUARIUM:
                case cc.GameId.DRAGON_BALL:
                case cc.GameId.COWBOY:
                case cc.GameId.SEVEN77:
                case cc.GameId.THUONG_HAI:
                    switch (roomId) {
                        case 1:
                            return 100;
                        case 2:
                            return 1000;
                        case 3:
                            return 5000;
                        case 4:
                            return 10000;
                    }
                    break;
                case cc.GameId.MINI_POKER:
                    switch (roomId) {
                        case 1:
                            return 100;
                        case 2:
                            return 1000;
                        case 3:
                            return 10000;
                        case 4:
                            return 30000;
                    }
                    break;
                case cc.GameId.BLOCK_BUSTER:
                    switch (roomId) {
                        case 1:
                            return 1000;
                        case 2:
                            return 2000;
                        case 3:
                            return 5000;
                        case 4:
                            return 10000;
                        case 5:
                            return 30000;
                        case 6:
                            return 50000;
                        case 7:
                            return 100000;
                    }
                    break;
                case cc.GameId.LUCKY_WILD:
                    switch (roomId) {
                        case 1:
                            return 1000;
                        case 2:
                            return 2000;
                        case 3:
                            return 5000;
                        case 4:
                            return 10000;
                        case 5:
                            return 25000;
                    }
                    break;
            }
        };

        Config.prototype.getGameName = function (gameId) {
            switch (gameId.toString()) {
                //slots game
                case cc.GameId.THREE_KINGDOM:
                    return cc.GameName.THREE_KINGDOM;
                case cc.GameId.EGYPT:
                    return cc.GameName.EGYPT;
                case cc.GameId.AQUARIUM:
                    return cc.GameName.AQUARIUM;
                case cc.GameId.DRAGON_BALL:
                    return cc.GameName.DRAGON_BALL;
                case cc.GameId.COWBOY:
                    return cc.GameName.COWBOY;
                case cc.GameId.THUONG_HAI:
                    return cc.GameName.THUONGHAI;
                case cc.GameId.GAINHAY:
                    return cc.GameName.GAINHAY;

                    //mini game
                case cc.GameId.TAI_XIU:
                    return cc.GameName.TAI_XIU;
                case cc.GameId.TAI_XIU_MD5:
                    return cc.GameName.TAI_XIU_MD5;
                case cc.GameId.TAI_XIU_SIEU_TOC:
                    return cc.GameName.TAI_XIU_SIEU_TOC;
                case cc.GameId.SICBO:
                    return cc.GameName.SICBO;
                case cc.GameId.MINI_POKER:
                    return cc.GameName.MINI_POKER;
                case cc.GameId.SEVEN77:
                    return cc.GameName.SEVEN77;
                case cc.GameId.BLOCK_BUSTER:
                    return cc.GameName.BLOCK_BUSTER;
                case cc.GameId.LUCKY_WILD:
                    return cc.GameName.LUCKY_WILD;
                case cc.GameId.VQMM:
                    return cc.GameName.VQMM;

                    //table game
                case cc.GameId.MONKEY:
                    return cc.GameName.MONKEY;
                case cc.GameId.DRAGON_TIGER:
                    return cc.GameName.DRAGON_TIGER;
                case cc.GameId.XOC_XOC:
                    return cc.GameName.XOC_XOC;
                case cc.GameId.BACCARAT:
                    return cc.GameName.BACCARAT;
                case cc.GameId.BAUCUA:
                    return cc.GameName.BAU_CUA;
                    //game bai chia phong
                case cc.GameId.BA_CAY:
                    return cc.GameName.BA_CAY;
                case cc.GameId.BA_CAY_GA:
                    return cc.GameName.BA_CAY_GA;
                case cc.GameId.BA_CAY_BIEN:
                    return cc.GameName.BA_CAY_BIEN;

                case cc.GameId.POKER_TEXAS:
                    return cc.GameName.POKER_TEXAS;

                case cc.GameId.TIEN_LEN_MN:
                    return cc.GameName.TIEN_LEN_MN;
                case cc.GameId.TIEN_LEN_MN_SOLO:
                    return cc.GameName.TIEN_LEN_MN_SOLO;

                case cc.GameId.MAU_BINH:
                    return cc.GameName.MAU_BINH;

                case cc.GameId.LODE:
                    return cc.GameName.LODE;

                case cc.GameId.SHOOT_FISH:
                    return cc.GameName.SHOOT_FISH;

                default:
                    return "";
            }
        };

        Config.prototype.getSubDomainByHub = function (hubName) {
            switch (hubName) {
                case cc.HubName.PortalHub:
                    return cc.SubdomainName.PORTAL;
                case cc.HubName.ChatHub:
                    return cc.SubdomainName.CHAT;

                    //su kien
                case cc.HubName.TreasureHub:
                    return cc.SubdomainName.TREASURE;

                    //Game Slots chinh
                case cc.HubName.EgyptHub:
                    return cc.SubdomainName.EGYPT;
                case cc.HubName.ThreeKingdomHub:
                    return cc.SubdomainName.THREE_KINGDOM;
                case cc.HubName.AquariumHub:
                    return cc.SubdomainName.AQUARIUM;
                case cc.HubName.DragonBallHub:
                    return cc.SubdomainName.DRAGON_BALL;
                case cc.HubName.CowboyHub:
                    return cc.SubdomainName.COWBOY;
                case cc.HubName.ThuongHaiHub:
                    return cc.SubdomainName.THUONGHAI;
                case cc.HubName.GaiNhayHub:
                    return cc.SubdomainName.GAINHAY;

                    //MINI game chơi full màn hình
                case cc.HubName.MonkeyHub:
                    return cc.SubdomainName.MONKEY;
                case cc.HubName.DragonTigerHub:
                    return cc.SubdomainName.DRAGON_TIGER;
                case cc.HubName.XocXocHub:
                    return cc.SubdomainName.XOC_XOC;
                case cc.HubName.BauCuaHub:
                    return cc.SubdomainName.BAUCUA;
                case cc.HubName.LodeHub:
                    return cc.SubdomainName.LODE;

                    //MINI game
                case cc.HubName.LuckyDiceHub:
                    return cc.SubdomainName.TAI_XIU;

                case cc.HubName.LuckyDiceSieuTocHub:
                    return cc.SubdomainName.TAI_XIU_SIEU_TOC;
					
                case cc.HubName.Md5LuckyDiceHub:
                    return cc.SubdomainName.TAI_XIU_MD5;

                case cc.HubName.SicBoHub:
                    return cc.SubdomainName.SICBO;
					
                case cc.HubName.MiniPokerHub:
                    return cc.SubdomainName.MINI_POKER;
                case cc.HubName.Seven77Hub:
                    return cc.SubdomainName.SEVEN77;
                case cc.HubName.BlockBusterHub:
                    return cc.SubdomainName.BLOCK_BUSTER;
                case cc.HubName.LuckyWildHub:
                    return cc.SubdomainName.LUCKY_WILD;

                    //card game
                case cc.HubName.ThreeCardsHub:
                    return cc.SubdomainName.THREE_CARDS;
                case cc.HubName.TexasPokerHub:
                    return cc.SubdomainName.TEXAS_POKER;
                case cc.HubName.MBHub:
                    return cc.SubdomainName.MAU_BINH;
                case cc.HubName.BaccaratHub:
                    return cc.SubdomainName.BACCARAT;
                case cc.HubName.TLMNHub:
                    switch (cc.RoomController.getInstance().getGameId().toString()) {
                        case cc.GameId.TIEN_LEN_MN:
                            return cc.SubdomainName.TLMN;
                        case cc.GameId.TIEN_LEN_MN_SOLO:
                            return cc.SubdomainName.TLMN_SOLO;
                    }
                    case cc.HubName.ShootFishHub:
                        return cc.SubdomainName.SHOOT_FISH;

            }
        };

        //Dung cho cac game co chon Line
        Config.prototype.getMultiplierByRoomId = function (roomId) {
            switch (roomId) {
                case 1:
                    return 80;
                case 2:
                    return 100;
                case 3:
                    return 50;
                default:
                    return 50;
            }
        };

        //voi cac game ko co chon Line
        Config.prototype.getMultiplierByTotalBet = function (totalBet) {
            switch (totalBet) {
                case 100:
                case 300:
                    return 80;
                case 1000:
                case 2000:
                case 3000:
                    return 100;
                case 5000:
                case 10000:
                case 25000:
                case 30000:
                    return 50;
                default:
                    return 50;
            }
        };

        Config.prototype.currency = function () {
            switch (this.getServiceId()) {
                case cc.ServiceId.BLOCK_BUSTER:
                    return 'Game';
                case cc.ServiceId.BLOCK_BUSTER_2:
                    return 'Game';
                case cc.ServiceId.BLOCK_BUSTER_3:
                    return 'Game';
                case cc.ServiceId.BLOCK_BUSTER_4:
                    return 'Game';
            }
        };

        Config.prototype.getPortalName = function () {
            switch (this.getServiceId()) {
                case cc.ServiceId.BLOCK_BUSTER:
                    return cc.PortalName.BLOCK_BUSTER;
                case cc.ServiceId.BLOCK_BUSTER_2:
                    return cc.PortalName.BLOCK_BUSTER_2;
                case cc.ServiceId.BLOCK_BUSTER_3:
                    return cc.PortalName.BLOCK_BUSTER_3;
                case cc.ServiceId.BLOCK_BUSTER_4:
                    return cc.PortalName.BLOCK_BUSTER_4;
            }
        };

        Config.prototype.version = function () {
            return VERSION;
        };

        Config.prototype.versionCode = function () {
            return VERSION_CODE;
        };

        Config.prototype.getDownloadUrl = function () {
            switch (this.getServiceId()) {
                case cc.ServiceId.BLOCK_BUSTER:
                    return DOWNLOAD_URL_B1;
                case cc.ServiceId.BLOCK_BUSTER_2:
                    return DOWNLOAD_URL_B2;
                case cc.ServiceId.BLOCK_BUSTER_3:
                    return DOWNLOAD_URL_B3;
                case cc.ServiceId.BLOCK_BUSTER_4:
                    return MD5_SERVICE;
                case cc.ServiceId.BLOCK_BUSTER_5:
                    return DOWNLOAD_TELE;
            }
        };

        Config.prototype.fanPageFB = function () {
            if (this.checkFDomain()) {
                switch (this.getServiceId()) {
                    case cc.ServiceId.BLOCK_BUSTER:
                        return FANPAGE_FB_B1_F;
                    case cc.ServiceId.BLOCK_BUSTER_2:
                        return FANPAGE_FB_B2_F;
                    case cc.ServiceId.BLOCK_BUSTER_3:
                        return FANPAGE_FB_B3_F;
                    case cc.ServiceId.BLOCK_BUSTER_4:
                        return FANPAGE_FB_B4;
                }
            } else {
                switch (this.getServiceId()) {
                    case cc.ServiceId.BLOCK_BUSTER:
                        return FANPAGE_FB_B1;
                    case cc.ServiceId.BLOCK_BUSTER_2:
                        return FANPAGE_FB_B2;
                    case cc.ServiceId.BLOCK_BUSTER_3:
                        return FANPAGE_FB_B3;
                    case cc.ServiceId.BLOCK_BUSTER_4:
                        return FANPAGE_FB_B4;
                }
            }
        };

        Config.prototype.groupFB = function () {
            if (this.checkFDomain()) {
                switch (this.getServiceId()) {
                    case cc.ServiceId.BLOCK_BUSTER:
                        return GROUP_FB_B1_F;
                    case cc.ServiceId.BLOCK_BUSTER_2:
                        return GROUP_FB_B2_F;
                    case cc.ServiceId.BLOCK_BUSTER_3:
                        return GROUP_FB_B3_F;
                    case cc.ServiceId.BLOCK_BUSTER_4:
                        return GROUP_FB_B4;
                }
            } else {
                switch (this.getServiceId()) {
                    case cc.ServiceId.BLOCK_BUSTER:
                        return GROUP_FB_B1;
                    case cc.ServiceId.BLOCK_BUSTER_2:
                        return GROUP_FB_B2;
                    case cc.ServiceId.BLOCK_BUSTER_3:
                        return GROUP_FB_B3;
                    case cc.ServiceId.BLOCK_BUSTER_4:
                        return GROUP_FB_B4;
                }
            }
        };

        Config.prototype.getTID = function () {
            TID++;
            return TID;
        };

        Config.prototype.getZINDEX = function () {
            Z_INDEX++;
            return Z_INDEX;
        };

        Config.prototype.formatRank = function (rankID, rankName, VP, nextVP) {
            if (nextVP && nextVP > 0) {
                // return rankName + ' (' + cc.Tool.getInstance().formatNumber(VP)
                //     + '/' + cc.Tool.getInstance().formatNumber(nextVP) + ')';
                return cc.Tool.getInstance().formatNumber(VP);
            } else {
                // return rankName + ' (' + cc.Tool.getInstance().formatNumber(VP) + ')';
                return cc.Tool.getInstance().formatNumber(VP);
            }
        };

        Config.prototype.getDeviceType = function () {
            //return cc.DeviceType.WEB;
            if (cc.sys.isNative) {
                if (cc.sys.os === cc.sys.OS_IOS) {
                    return cc.DeviceType.IOS;
                } else {
                    return cc.DeviceType.ANDROID;
                }
            } else {
                return cc.DeviceType.WEB;
            }
        };

        Config.prototype.getCardTypeByCode = function (code) {
            if (code.includes(cc.CardOperatorCode.VIETTEL)) {
                return cc.CardType.VIETTEL;
            } else if (code.includes(cc.CardOperatorCode.MOBIFONE)) {
                return cc.CardType.MOBIFONE;
            } else if (code.includes(cc.CardOperatorCode.VINAPHONE)) {
                return cc.CardType.VINAPHONE;
            }

            // switch (code) {
            //     case cc.CardOperatorCode.VIETTEL:
            //         return cc.CardType.VIETTEL;
            //     case cc.CardOperatorCode.MOBIFONE:
            //         return cc.CardType.MOBIFONE;
            //     case cc.CardOperatorCode.VINAPHONE:
            //         return cc.CardType.VINAPHONE;
            // }
        };

        Config.prototype.teleHotro = function () {
            return TELE_HOTRO;
        };
		
        Config.prototype.liveSex = function () {
            return GROUP_TELE_XVIDEOS;
        };
		
        Config.prototype.liveChat = function () {
            return LIVE_CHAT;
        };

        Config.prototype.taiotpx6 = function () {
            return TAI_OTP_X6;
        };
        Config.prototype.taigame = function () {
            return DOWNLOAD_URL_B1;
        };
		
        Config.prototype.teleDownload = function () {
            return DOWNLOAD_TELE;
        };
		
        Config.prototype.md5Service = function () {
            return MD5_SERVICE;
        };

       // DOWNLOAD_URL_B1
        return Config;

    })();

    cc.Config = Config;

}).call(this);