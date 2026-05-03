
var netConfig = require('NetConfig');

(function () {
    var HOST_B1, HOST_B2, HOST_B3, HOST_B4, DDNA;

    var HOST_B1_DEV = ''; //DEV
    var HOST_B2_DEV = ''; //DEV
    var HOST_B3_DEV = ''; //DEV
    var HOST_B4_DEV = ''; //DEV

    HOST_B1 = ''; //LIVE
    HOST_B2 = ''; //LIVE
    HOST_B3 = ''; //LIVE
    HOST_B4 = ''; //LIVE

    DDNA = (function () {
        var instance;

        function DDNA() {

        }

        instance = void 0;

        DDNA.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //POST
        DDNA.prototype.rec = function (recordedEvents, callback) {
            return;

            var hostDDNA = null;

            switch (cc.Config.getInstance().getServiceId()) {
                case cc.ServiceId.BLOCK_BUSTER:
                    hostDDNA = HOST_B1_DEV;
                    break;
                case cc.ServiceId.BLOCK_BUSTER_2:
                    hostDDNA = HOST_B2_DEV;
                    break;
                case cc.ServiceId.BLOCK_BUSTER_3:
                    hostDDNA = HOST_B3_DEV;
                    break;
                case cc.ServiceId.BLOCK_BUSTER_4:
                    hostDDNA = HOST_B4_DEV;
                    break;
            }

            if (hostDDNA === null) return;

            //return;
            var e, request;
            try {
                request = cc.loader.getXMLHttpRequest();
                request.open(cc.RequestType.POST, hostDDNA, true);
                request.setRequestHeader("Content-type", "application/json");
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        //return callback(request.responseText);
                    }
                };
                // return request.send(JSON.stringify({eventList: recordedEvents}));
                return request.send(JSON.stringify(recordedEvents));
            } catch (error) {
                e = error;
                return console.log('Caught Exception: ' + e.description);
            }
        };

        DDNA.prototype.getPlatform = function () {
            if (cc.sys.isNative) {
                if (cc.sys.os === cc.sys.OS_ANDROID) {
                    return 'ANDROID';
                } else {
                    return 'IOS';
                }
            } else {
                return 'WEB';
            }
        };

        DDNA.prototype.getTimestamp = function () {
            var d = new Date();
            return d.getUTCFullYear() +
                '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() +
                ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() +
                ':' + d.getUTCSeconds() + '.' + d.getUTCMilliseconds();
        };

        DDNA.prototype.generateUUID = function () {
            var d = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        };

        DDNA.prototype.getSessionId = function () {
            if (this.ddnaSessionId) {
                return this.ddnaSessionId;
            } else {
                return this.ddnaSessionId = this.generateUUID();
            }
        };

        DDNA.prototype.removeSessionId = function () {
            return this.ddnaSessionId = null;
        };

        DDNA.prototype.getGameById = function (gameId) {
            switch (gameId.toString()) {
                case cc.GameId.THREE_KINGDOM:
                    return cc.DDNAGame.THREE_KINGDOM;
                case cc.GameId.EGYPT:
                    return cc.DDNAGame.EGYPT;
                case cc.GameId.AQUARIUM:
                    return cc.DDNAGame.AQUARIUM;
                case cc.GameId.DRAGON_BALL:
                    return cc.DDNAGame.DRAGON_BALL;
                case cc.GameId.COWBOY:
                    return cc.DDNAGame.COWBOY;

                case cc.GameId.MONKEY:
                    return cc.DDNAGame.MONKEY;
                case cc.GameId.DRAGON_TIGER:
                    return cc.DDNAGame.DRAGON_TIGER;

                case cc.GameId.TAI_XIU:
                    return cc.DDNAGame.TAI_XIU;

                case cc.GameId.TAI_XIU_SIEU_TOC:
                    return cc.DDNAGame.TAI_XIU_SIEU_TOC;
					
                case cc.GameId.TAI_XIU_MD5:
                    return cc.DDNAGame.TAI_XIU_MD5;
					
                case cc.GameId.MINI_POKER:
                    return cc.DDNAGame.MINI_POKER;
                case cc.GameId.SEVEN77:
                    return cc.DDNAGame.SEVEN77;
                case cc.GameId.BLOCK_BUSTER:
                    return cc.DDNAGame.BLOCK_BUSTER;
                case cc.GameId.VQMM:
                    return cc.DDNAGame.VQMM;
                case cc.GameId.THUONG_HAI:
                    return cc.DDNAGame.THUONGHAI;
                case cc.GameId.GAINHAY:
                    return cc.DDNAGame.GAINHAY;
            }
        };

        //Gửi lên toàn bộ ở backend
        DDNA.prototype.newPlayer = function (acquisitionChannel, campaign, uniqueTracking, referrer) {
            return;
            this.eventList = [];

            var event = {
                eventName: 'newPlayer',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    userType: cc.DDNAUserType.NORMAL,
                    userScore: 0,
                    authenType: 0,
                    phoneNumber: 'null',
                    phoneSafeNo: 'null',
                    displayName: 'null'
                }
            };

            //kênh marketing để hướng lượng truy cập đên game (vd: Facebook, Google Ad Campaign)
            if (acquisitionChannel) {
                event.eventParams.acquisitionChannel = acquisitionChannel;
            }

            //tên chiến dịch
            if (campaign) {
                event.eventParams.campaign = campaign;
            }

            //Unique tracking tag
            if (uniqueTracking) {
                event.eventParams.uniqueTracking = uniqueTracking;
            }

            //URL của website dùng để đưa user đến game
            if (referrer) {
                event.eventParams.referrer = referrer;
            }

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.clientDevice = function () {
            this.eventList = [];

            var event = {
                eventName: 'clientDevice',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    operatingSystem: cc.sys.os.toUpperCase(),
                    operatingSystemVersion: cc.sys.osVersion,
                    userLanguage: cc.sys.language
                }
            };

            if (cc.sys.isBrowser) {
                event.eventParams.browserName = cc.sys.browserName;
                event.eventParams.browserVersion = cc.sys.browserVersion;
            }

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.gameStarted = function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.eventList = [];

            var event = {
                eventName: 'gameStarted',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    rank: loginResponse.RankName,
                    vp: loginResponse.VP,
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);tqKBView
            this.rec(event);
        };

        DDNA.prototype.gameEnded = function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.eventList = [];

            var event = {
                eventName: 'gameEnded',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    rank: loginResponse.RankName,
                    vp: loginResponse.VP
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.shopEntered = function (shopName) {
            this.eventList = [];

            var event = {
                eventName: 'shopEntered',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    shopID: shopName,
                    shopName: shopName,
                    shopType: shopName,
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.uiInteraction = function (location, name, type) {
            return;

            //login roi moi gui

            if (cc.ServerConnector.getInstance().getToken() && name && cc.LoginController.getInstance().getNickname()) {
                this.eventList = [];

                var event = {
                    eventName: 'uiInteraction',
                    userID: cc.LoginController.getInstance().getUserId().toString(),
                    eventUUID: this.generateUUID(),
                    sessionID: this.getSessionId(),
                    eventParams: {
                        platform: this.getPlatform(),
                        displayName: cc.LoginController.getInstance().getNickname(),
                        userScore: cc.BalanceController.getInstance().getBalance(),
                        UIAction: 'CLICK',
                        UILocation: location,
                        UIName: name,
                        UIType: type,
                    }
                };

                this.eventList.push(event);
                // this.rec(this.eventList);
                this.rec(event);
            }
        };

        DDNA.prototype.updateAccountName = function () {
            this.eventList = [];

            var event = {
                eventName: 'updateAccountName',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance()
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.updatePhoneNumber = function (phoneNumber) {
            this.eventList = [];

            var event = {
                eventName: 'updatePhoneNumber',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    phoneNumber: phoneNumber
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.updatePhoneSafeNo = function (phoneSafeNo) {
            this.eventList = [];

            var event = {
                eventName: 'updatePhoneSafeNo',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    phoneSafeNo: phoneSafeNo
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.updateAuthenType = function (authenType) {
            this.eventList = [];

            var event = {
                eventName: 'updateAuthenType',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    authenType: authenType
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.betSummary = function (game, betAmount, sID) {
            return; //gui o backend

            var event = {
                eventName: 'betSummary',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    game: game,
                    betAmount: betAmount,
                    refundAmount: refundAmount,
                    winAmount: winAmount,
                    sID: sID
                }
            };

            this.rec(event);
        };

        DDNA.prototype.eventSummary = function () {
            var event = {
                eventName: 'eventSummary',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    eName: eName,
                    eAward: eAward
                }
            };

            this.rec(event);
        };

        DDNA.prototype.vpSummary = function () {
            var event = {
                eventName: 'vpSummary',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    vpReceived: vpReceived
                }
            };

            this.rec(event);
        };

        DDNA.prototype.resultSummary = function (game, winAmount, sID) {
            this.eventList = [];

            var event = {
                eventName: 'resultSummary',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    game: game,
                    winAmount: winAmount,
                    sID: sID
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.spinSummary = function (gameId, isAutoSpin, spinResponse) {
            //Quay thử ko gửi lên
            if (spinResponse.IsPlayTry) {
                return;
            }

            var game = this.getGameById(gameId);

            if (spinResponse.BonusGame && spinResponse.BonusGame.BonusData) {
                var isWinBonus = true;
            } else {
                isWinBonus = false;
            }

            // if (spinResponse.PrizeLines) {
            //     var numberWinningLines = spinResponse.SpinData.PrizeLines.length;
            // } else {
            //     numberWinningLines = 0;
            // }

            if (spinResponse.SpinData) {
                //game slots TO
                var isFreeSpin = spinResponse.SpinData.TotalBet === 0;
                var lineBet = spinResponse.TotalLine;
                var numberWinningLines = spinResponse.SpinData.PrizeLines.length;
                var winJackpot = spinResponse.SpinData.IsJackpot;
                var spinID = spinResponse.SpinData.SpinID;
                var totalBet = spinResponse.SpinData.TotalBet;
                var totalPrize = spinResponse.SpinData.TotalPrize;
                var betPerLine = spinResponse.BetValue;
            } else {
                //mini slots
                isFreeSpin = spinResponse.TotalBet === 0;
                switch (gameId) {
                    case cc.GameId.BLOCK_BUSTER:
                        totalPrize = spinResponse.TotalPrize;
                        numberWinningLines = spinResponse.PrizeLines.length;
                        lineBet = 1; //27
                        betPerLine = spinResponse.TotalBet;
                        break;
                    case cc.GameId.MINI_POKER:
                        totalPrize = spinResponse.TotalPrize;
                        numberWinningLines = totalPrize > 0 ? 1 : 0;
                        lineBet = 1;
                        betPerLine = spinResponse.TotalBet;
                        break;
                    case cc.GameId.SEVEN77:
                        // totalPrize = spinResponse.TotalJackpotValue + spinResponse.PaylinePrize;
                        totalPrize = spinResponse.PaylinePrize;
                        numberWinningLines = spinResponse.PrizeLines.length;
                        lineBet = spinResponse.LinesData.split(',').length;
                        betPerLine = spinResponse.TotalBet / lineBet;
                        break;
                }
                winJackpot = spinResponse.IsJackpot;
                spinID = spinResponse.SpinID;
                totalBet = spinResponse.TotalBet;
            }

            this.eventList = [];

            var event = {
                eventName: 'spinSummary',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    game: game,
                    betPerLine: betPerLine,
                    isAutoSpin: isAutoSpin,
                    isFreeSpin: isFreeSpin,
                    linesBet: lineBet,
                    numberWinningLines: numberWinningLines,
                    winJackpot: winJackpot,
                    winBonus: isWinBonus,
                    sID: spinID,
                    productsSpent: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: totalBet
                            }
                        }]
                    },
                    productsReceived: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: totalPrize
                            }
                        }]
                    }
                }
            };

            this.eventList.push(event);
            // this.rec(this.eventList);
            this.rec(event);
        };

        // + Nạp thẻ: transaction (@homepsg)
        // + Đổi thẻ: transaction (@homepsg)
        // + Nạp qua Đại lý: transaction (@tieungunhi)
        //Chỉ gửi lên cashout qua Đại Lý -> homepsg
        DDNA.prototype.cashout = function (amount) {
            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'SALE',
                    transactionName: cc.DDNATransactionName.AGENCY,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    productsSpent: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    },
                    productsReceived: {
                        realCurrency: {
                            realCurrencyType: "VND",
                            realCurrencyAmount: amount * 0.8 //~0.8
                        }
                    }
                }
            };

            this.rec(event);
        };

        DDNA.prototype.receiveCardBonus = function (transactionName, amount) {
            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                eventTimestamp: this.getTimestamp(),
                eventParams: {
                    transactionType: 'PURCHASE',
                    transactionName: transactionName,
                    displayName: cc.LoginController.getInstance().getNickname(),
                    productsReceived: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    }
                }
            };
            this.rec(event);
        };

        DDNA.prototype.trade = function (receiver, isAgency, description, amount) {
            this.eventList = [];

            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'TRADE',
                    transactionName: cc.DDNATransactionName.TRADE,
                    receiver: receiver,
                    isAgency: isAgency,
                    description: description,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    productsSpent: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    }
                },
            };

            this.eventList.push(event);

            // this.rec(this.eventList);
            this.rec(event);
        };

        DDNA.prototype.applyGiftcode = function (amount, giftcode) {
            this.eventList = [];

            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'PURCHASE',
                    transactionName: cc.DDNATransactionName.GIFTCODE,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    giftcode: giftcode,
                    productsSpent: {
                        items: [{
                            item: {
                                itemName: "GIFTCODE",
                                itemType: "GIFTCODE",
                                itemAmount: amount
                            }
                        }]
                    },
                    productsReceived: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    }
                }
            };
            this.eventList.push(event);

            // this.rec(this.eventList);
            this.rec(event);
        };

        //nhan thuong VIP
        DDNA.prototype.claimVIP = function (amount) {
            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'PURCHASE',
                    transactionName: cc.DDNATransactionName.VIP,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    productsReceived: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    }
                }
            };

            this.rec(event);
        };

        // VIP vay tien
        DDNA.prototype.vipSummary = function (transactionName, amount) {
            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'PURCHASE',
                    transactionName: transactionName,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    productsReceived: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    }
                }
            };

            this.rec(event);
        };

        //Quay vong quay MM
        DDNA.prototype.spinVQMM = function (amount) {
            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'PURCHASE',
                    transactionName: cc.DDNATransactionName.VQMM,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    productsReceived: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: amount
                            }
                        }]
                    }
                }
            };

            this.rec(event);
        };

        DDNA.prototype.buyCarrot = function (spent, receive) {
            var event = {
                eventName: 'transaction',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    transactionType: 'PURCHASE',
                    transactionName: cc.DDNATransactionName.BUY_CARROT,
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    productsSpent: {
                        virtualCurrencies: [{
                            virtualCurrency: {
                                virtualCurrencyName: cc.Config.getInstance().currency(),
                                virtualCurrencyType: "PREMIUM",
                                virtualCurrencyAmount: spent
                            }
                        }]
                    },
                    productsReceived: {
                        items: [{
                            item: {
                                itemName: "CARROT",
                                itemType: "CARROT",
                                itemAmount: receive
                            }
                        }]
                    }
                }
            };

            this.rec(event);
        };

        DDNA.prototype.logEventTreasureBuy = function (spent, rewardAmount, rewardType) {
            this.logEvent(cc.DDNAEventLogType.TREASURE_GET_CARROT_BUY, spent, rewardAmount, rewardType, null);
        };

        DDNA.prototype.logEventTreasureSpin = function (spent, rewardAmount, rewardType) {
            this.logEvent(cc.DDNAEventLogType.TREASURE_GET_CARROT_JUMP, spent, rewardAmount, rewardType, null);
        };

        DDNA.prototype.logEventTreasureDailyBonus = function (rewardAmount, rewardType) {
            this.logEvent(cc.DDNAEventLogType.TREASURE_GET_CARROT_LOGIN, null, rewardAmount, rewardType, null);
        };

        DDNA.prototype.logEventTreasureOpenChest = function (rewardAmount, rewardType, chestID) {
            this.logEvent(cc.DDNAEventLogType.TREASURE_GET_CARROT_CHEST, null, rewardAmount, rewardType, chestID);
        };

        DDNA.prototype.logEvent = function (action, spent, rewardAmount, rewardType, chestID) {
            var event = {
                eventName: 'logEvent',
                userID: cc.LoginController.getInstance().getUserId().toString(),
                eventUUID: this.generateUUID(),
                sessionID: this.getSessionId(),
                eventParams: {
                    platform: this.getPlatform(),
                    displayName: cc.LoginController.getInstance().getNickname(),
                    userScore: cc.BalanceController.getInstance().getBalance(),
                    action: action,
                }
            };

            switch (action) {
                case cc.DDNAEventLogType.TREASURE_GET_CARROT_JUMP:
                case cc.DDNAEventLogType.TREASURE_GET_CARROT_BUY:
                    event.eventParams.spent = spent;
                    if (rewardAmount) {
                        event.eventParams.rewardAmount = rewardAmount;
                        event.eventParams.rewardType = rewardType;
                    }
                    break;
                case cc.DDNAEventLogType.TREASURE_GET_CARROT_LOGIN:
                    event.eventParams.rewardAmount = rewardAmount;
                    event.eventParams.rewardType = rewardType;
                    break;
                case cc.DDNAEventLogType.TREASURE_GET_CARROT_CHEST:
                    event.eventParams.chestID = chestID;
                    event.eventParams.rewardAmount = rewardAmount;
                    event.eventParams.rewardType = rewardType;
                    break;
            }


            this.rec(event);
        };

        DDNA.prototype.logAPI = function (subdomain, api, ping) {
            //login -> moi gui
            if (cc.LoginController.getInstance().getLoginState()) {
                if (!api.includes('api/Jackpot/GetJackpotInfo')) {
                    var event = {
                        eventName: 'logAPI',
                        userID: cc.LoginController.getInstance().getUserId().toString(),
                        eventUUID: this.generateUUID(),
                        sessionID: this.getSessionId(),
                        eventParams: {
                            platform: this.getPlatform(),
                            displayName: cc.LoginController.getInstance().getNickname(),
                            subdomain: subdomain,
                            api: api,
                            ping: ping,
                        }
                    };

                    this.rec(event);
                } else {

                }
            }
        };

        return DDNA;

    })();

    cc.DDNA = DDNA;

}).call(this);
