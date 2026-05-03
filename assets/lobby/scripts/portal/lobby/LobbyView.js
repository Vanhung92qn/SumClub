/**
 * Created by Nofear on 6/7/2017.
 */
import Utils from "../../shootFish/common/Utils";
import Tween from "../../shootFish/common/Tween";
var netConfig = require("NetConfig");

(function () {
  cc.LobbyView = cc.Class({
    extends: cc.Component,
    properties: {
      //prefab portal

      prefabLoginView: cc.Prefab,
      prefabAccountView: cc.Prefab,

      prefabShopTopupViewBank: cc.Prefab,

      prefabShopCastOutView: cc.Prefab,

      prefabHistoryView: cc.Prefab,
      // prefabHistoryViewBank: cc.Prefab,

      setingview: cc.Node,
      showhotrophone: cc.Node,
      showhopthu: cc.Node,
      hotrosdtvn: cc.Node,
      //hotrolivechat: cc.Node,

      prefabEvent: cc.Prefab,
      prefabVQMM: cc.Prefab,

      //event - x2 Nap
      prefabX2Popup: cc.Prefab,
      prefabX2Reward: cc.Prefab,

      //prefab FX summon Dragon
      prefabFxSummonDragon: cc.Prefab,

      //slots chinh
      //prefabShowPercentLoadGame:cc.Prefab,
      lbLoadingEgypt: cc.Label,
      progressBarAquarium: cc.ProgressBar,
      progressBanCa: cc.ProgressBar,
      progressEgypt: cc.ProgressBar,
      progressTK: cc.ProgressBar,
      progressDragonBall: cc.ProgressBar,
      progressCowboy: cc.ProgressBar,
      progressDragonTiger: cc.ProgressBar,
      progressXocXoc: cc.ProgressBar,
      progressTaiXiu: cc.ProgressBar,
      progressTaiXiuMd5: cc.ProgressBar,
      progressTaiXiuSieuToc: cc.ProgressBar,
      progressMiniPoker: cc.ProgressBar,
      progress777: cc.ProgressBar,
      progressTQ: cc.ProgressBar,
      progressPoker: cc.ProgressBar,
      progressThreeCards: cc.ProgressBar,
      progressTLMN: cc.ProgressBar,
      progressTLMNSolo: cc.ProgressBar,
      progressMB: cc.ProgressBar,
      progressBaccarat: cc.ProgressBar,
      progressBauCua: cc.ProgressBar,
      progressLoDe: cc.ProgressBar,
      lbLoadingTK: cc.Label,
      lbLoadingAquarium: cc.Label,
      lbLoadingDragonBall: cc.Label,

      lbLoadingCowboy: cc.Label,

      lbLoadingDragonTiger: cc.Label,
      lbLoadingXocXoc: cc.Label,
      lbLoadingBauCua: cc.Label,
      lbLoadingLoDe: cc.Label,

      //minigame
      lbLoadingTaiXiu: cc.Label,
      lbLoadingTaiXiuMd5: cc.Label,
      lbLoadingTaiXiuSieuToc: cc.Label,
      lbLoadingSicbo: cc.Label,
      lbLoadingMiniPoker: cc.Label,
      lbLoading777: cc.Label,
      lbLoadingTQ: cc.Label,

      //card game
      lbLoadingPoker: cc.Label,
      lbLoadingThreeCards: cc.Label,
      lbLoadingTLMN: cc.Label,
      lbLoadingTLMNSolo: cc.Label,
      lbLoadingMB: cc.Label,
      lbLoadingBaccarat: cc.Label,

      //ban ca
      lbLoadingShootFish: cc.Label,

      nodemanutab: cc.Node,
      nodeLobbys: [cc.Node],
      nodeTopBar: cc.Node,
      nodeSetting: cc.Node,

      // ═══════════════════════════════════════════════════════════════
      // 🏗️ LAYER ARCHITECTURE (Production-Ready)
      // ═══════════════════════════════════════════════════════════════
      miniGameLayer: cc.Node,    // Layer cho popup minigames (TaiXiu, Sicbo...)
      popupLayer: cc.Node,       // Layer cho system popups (Login, Shop...)
      
      //audio
      AudioClick: cc.AudioSource,
      AudioNapRut: cc.AudioSource,
      audioBg: cc.AudioSource,
   //   toggleAudio: cc.Toggle,
      lbTopVp: cc.Label,
      Livesex: cc.Node,
      CasinoLive: cc.Node,
      nodeEventTop: cc.Node,
      nodeguest: cc.Node,
      //Esports
      lbJpbaucua: cc.Label,
      lbJpxocdia: cc.Label,
      //lbLoadingEsport: cc.Label,
    },
    start() {
      let scale = 100000;
      this.jackpot0 = Utils.randomRangeInt(2000 * scale, 700 * scale);
      this.jackpotMax0 =
        this.jackpot0 + Utils.randomRangeInt(2000 * scale, 400 * scale);
      this.jackpot1 = Utils.randomRangeInt(2000 * scale, 700 * scale);
      Tween.numberTo(this.lbJpbaucua, this.jackpot1, 1);
      Tween.numberTo(this.lbJpxocdia, this.jackpot0, 1);
      // this.updateNext0 = Utils.randomRangeInt(3, 5);
    },

    // use this for initialization
    onLoad: function () {
      if (cc.sys.isNative && cc.sys.isMobile) {
        jsb.device &&
          jsb.device.setKeepScreenOn &&
          jsb.device.setKeepScreenOn(true);
      }
      this.nodeguest.active = true;
      this.nodemanutab.active = false;
      cc.LobbyController.getInstance().setLobbyView(this);
      this.nodeTaiXiu = null;
      this.nodeTaiXiuMd5 = null;
      this.nodeTaiXiuSieuToc = null;
      this.nodeSicbo = null;
      this.nodeEsport = null;
      this.nodeMiniPoker = null;
      this.node777 = null;
      this.nodeTQ = null;
      this.nodeLW = null;
      this.nodeSlotsView = null;
      this.nodeVQMMView = null;
      var tool = cc.Tool.getInstance();
      if (tool.getItem("@onAudioBg") !== null) {
        var savedAudio = tool.getItem("@onAudioBg");
        if (savedAudio === "true" || savedAudio === true) {
          this.IsOnAudioBg = true;
        } else {
          this.IsOnAudioBg = false;
        }
      } else {
        this.IsOnAudioBg = true;
      }
      if (this.toggleAudio) {
            this.toggleAudio.isChecked = this.IsOnAudioBg;
        }
    },

    onEnable: function () {
      if (this.IsOnAudioBg) {
        this.audioBg.play();
      } else {
        this.audioBg.stop();
      }
      this.lbTopVp.string = cc.Tool.getInstance().formatNumber(
        cc.LoginController.getInstance().getTopVPResponse()
      );
      if (!cc.LoginController.getInstance().getLoginState()) {
        var tool = cc.Tool.getInstance();
        if (tool.getItem("@isLanding") !== null) {
          if (tool.getItem("@isLanding") === "true") {
            cc.LobbyController.getInstance().showRegisterView();
          }
        }
      }
    },
    actLivesex: function() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
  
      // Chuyển đổi trạng thái của Livesex
      this.Livesex.active = !this.Livesex.active;
  
      // Log trạng thái mới của Livesex
      console.log("Livesex is now " + (this.Livesex.active ? "active" : "inactive"));
  },
  
    CSKH: function() {
     this.AudioClick.loop = false;
     this.AudioClick.play();
      cc.sys.openURL(cc.Config.getInstance().liveSex());
    },
    livechat: function () {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      cc.sys.openURL(cc.Config.getInstance().liveChat());
    },
    teleHotro: function() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      cc.sys.openURL(cc.Config.getInstance().teleHotro());
    },
    fanpage: function () {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      cc.sys.openURL(cc.Config.getInstance().fanPageFB());
    },

    CongDongTeleGram: function () {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      cc.sys.openURL("https://t.me/s86club");
    },

    actsodienthoai() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      this.showhotrophone.active = !this.showhotrophone.active;
      return;
    },
    actshowhopthu() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      this.showhopthu.active = !this.showhopthu.active;
      return;
    },

    actsetingview() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      this.setingview.active = !this.setingview.active;
      return;
    },
    acthotro() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      this.hotrosdtvn.active = !this.hotrosdtvn.active;
      return;
    },
    acthotrolivechat() {
      this.AudioClick.loop = false;
      this.AudioClick.play();
      this.hotrolivechat.active = !this.hotrolivechat.active;
      return;
    },

    //event X2
    createX2PopupView: function () {
      this.nodeX2Popup = this.createView(this.prefabX2Popup);
    },

    destroyX2PopupView: function () {
      if (this.nodeX2Popup) this.nodeX2Popup.destroy();
    },

    createX2RewardView: function () {
      this.nodeX2Reward = this.createView(this.prefabX2Reward);
    },

    destroyX2RewardView: function () {
      if (this.nodeX2Reward) this.nodeX2Reward.destroy();
    },

    //event san KHO BAU
    createEventPopupView: function () {
      if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        this.nodeEventPopup = this.createView(this.prefabEventPopup);
      } else {
        this.nodeEventPopup = this.createView(this.prefabEventVNPopup);
      }
    },

    destroyEventPopupView: function () {
      if (this.nodeEventPopup) this.nodeEventPopup.destroy();
    },

    //event san KHO BAU
    createTreasureView: function () {
      this.nodeTreasureView = this.createView(this.prefabTreasure);
    },

    destroyTreasureView: function () {
      if (this.nodeTreasureView) this.nodeTreasureView.destroy();
    },

    //buy carrot
    createBuyCarrotView: function () {
      this.nodeBuyCarrotView = this.createView(this.prefabBuyCarrot);
    },

    destroyBuyCarrotView: function () {
      if (this.nodeBuyCarrotView) this.nodeBuyCarrotView.destroy();
    },

    //chon qua vat ly
    createTreasureGiftView: function () {
      this.nodeTreasureGiftView = this.createView(this.prefabTreasureGift);
    },

    destroyTreasureGiftView: function () {
      if (this.nodeTreasureGiftView) this.nodeTreasureGiftView.destroy();
    },

    //carrot daily bonus popup
    createCarrotDailyBonusView: function () {
      this.nodeCarrotDailyBonusView = this.createView(
        this.prefabCarrotDailyBonus
      );
    },

    destroyCarrotDailyBonusView: function () {
      if (this.nodeCarrotDailyBonusView)
        this.nodeCarrotDailyBonusView.destroy();
    },

    //treasure rule popup
    createTreasureRuleView: function () {
      this.nodeTreasureRuleView = this.createView(this.prefabTreasureRule);
    },

    destroyTreasureRuleView: function () {
      if (this.nodeTreasureRuleView) this.nodeTreasureRuleView.destroy();
    },

    //treasure top popup
    createTreasureTopView: function () {
      this.nodeTreasureTopView = this.createView(this.prefabTreasureTop);
    },

    destroyTreasureTopView: function () {
      if (this.nodeTreasureTopView) this.nodeTreasureTopView.destroy();
    },

    //Fx
    createFxSummonDragon: function () {
      this.nodeFxSummonDragon = this.createView(this.prefabFxSummonDragon);
    },

    destroyFxSummonDragon: function () {
      if (this.nodeFxSummonDragon) this.nodeFxSummonDragon.destroy();
    },
    //end fx

    //Portal Portal Portal
    createLoginView: function () {
      if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        this.nodeLoginView = this.createView(this.prefabLoginView);
      } else {
        this.nodeLoginView = this.createView(this.prefabLoginView);
      }
    },

    destroyLoginView: function () {
      if (this.nodeLoginView) this.nodeLoginView.destroy();
    },

    // createVQMMView: function () {
    //  if (this.nodeVQMMView === null) {
    //      this.nodeVQMMView = this.createView(this.prefabVQMM);
    //  }
    // },

    // destroyVQMMView: function () {
    //  if (this.nodeVQMMView) {
    //   this.nodeVQMMView.destroy();
    //   this.nodeVQMMView = null;
    // }
    //   },

    createHistoryView: function () {
      // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
      //     || cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2) {
      //     this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
      // } else {
      //     this.nodeHistoryView = this.createView(this.prefabHistoryView);
      // }

      if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        //this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
        this.nodeHistoryView = this.createView(this.prefabHistoryView);
      }

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyHistoryView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      if (this.nodeHistoryView) this.nodeHistoryView.destroy();
    },

    createAccountView: function () {
      this.nodeAccountView = this.createView(this.prefabAccountView);
      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyAccountView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeAccountView) this.nodeAccountView.destroy();
    },

    createSecurityView: function () {
      this.nodeSecurityView = this.createView(this.prefabSecurityView);
      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroySecurityView: function () {
      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeSecurityView) this.nodeSecurityView.destroy();
    },

    createPopupUpdateUserPassView: function () {
      this.nodePopupUpdateUserPass = this.createView(
        this.prefabPopupUpdateUserPass
      );
    },

    destroyPopupUpdateUserPassView: function () {
      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodePopupUpdateUserPass) this.nodePopupUpdateUserPass.destroy();
    },

    createShopTopupView: function () {
      // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);
      // } else {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupView);
      // }

      this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyShopTopupView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeShopTopupView) this.nodeShopTopupView.destroy();
      //hide cac node o lobby
    },

    createShopCastOutView: function () {
      // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);
      // } else {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupView);
      // }
      console.log("createShopCastOutView:" + 1);
      this.nodeShopCastOutView = this.createView(this.prefabShopCastOutView);

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },
    offuserguest: function () {
      this.nodeguest.active = false;
    },

    destroyShopCastOutView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeShopCastOutView) this.nodeShopCastOutView.destroy();
      //hide cac node o lobby
    },

    createShopView: function () {
      if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        // this.nodeShopView = this.createView(this.prefabShopView);
        // this.nodeShopView = this.createView(this.prefabShopViewBank);

        if (
          cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
        ) {
          this.nodeShopView = this.createView(this.prefabShopViewBank);
        } else {
          this.nodeShopView = this.createView(this.prefabShopView);
        }
      }

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyShopView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeShopView) this.nodeShopView.destroy();
      //hide cac node o lobby
    },

    createEventView: function () {
      this.nodeEventView = this.createView(this.prefabEvent);
    },

    createAppSafeHelpView: function () {
      this.createView(this.prefabAppSafeHelp);
    },

    createDNSHelpView: function () {
      this.createView(this.prefabDNSHelp);
    },

    createUpdateAccountView: function () {
      this.createView(this.prefabUpdateAccount);
    },

    createMoveBBView: function () {
      this.createView(this.prefabMoveBB);
    },
    destroyMoveBBView: function () {
      if (this.prefabMoveBB) this.prefabMoveBB.destroy();
    },

    createBlockBBView: function () {
      this.createView(this.prefabBlockBB);
    },
    //Tao cac game (prefab load dynamic)
    // ─────────────────────────────────────────────────────────
    //  [PHASE 2+] Load game từ Bundle (dùng sau khi đã tách bundle)
    //  Hiện tại (Phase 1): Chỉ game nào đã tách bundle mới đi vào đây.
    //  Các game chưa tách vẫn dùng cc.loader.loadRes bên dưới.
    // ─────────────────────────────────────────────────────────
    _createDynamicViewFromBundle: function (gameId) {
      var self = this;

      // Mini-game dạng popup (không full-screen): Tài Xỉu
      if (gameId === cc.GameId.TAI_XIU) {
        // giữ nguyên behaviour cũ: dùng nodeTaiXiu, KHÔNG ẩn lobby
        if (this.nodeTaiXiu !== null || this.isLoading) return;

        this.isLoading = true;
        // ✅ Bắt đầu loading bar Tài Xỉu (fake progress 0 → 90%)
        this._startTaiXiuLoadingBar();

        cc.BundleLoader.getInstance().loadGame(gameId, function (err, bundle) {
          if (err) {
            self.isLoading = false;
            self._stopTaiXiuLoadingBar(false);
            cc.PopupController.getInstance().showMessageError('Không thể tải game Tài Xỉu. Vui lòng thử lại!');
            return;
          }

          var prefabPath = cc.GameBundleConfig.getMainPrefab(gameId);
          bundle.load(prefabPath, cc.Prefab, function (err2, prefab) {
            self.isLoading = false;

            if (err2) {
              self._stopTaiXiuLoadingBar(false);
              console.error('[LobbyView] Load prefab Tài Xỉu thất bại:', prefabPath, err2);
              cc.PopupController.getInstance().showMessageError('Không thể mở game Tài Xỉu!');
              return;
            }

            // ✅ Hoàn tất loading bar
            self._stopTaiXiuLoadingBar(true);

            // ✅ Spawn vào miniGameLayer thay vì this.node
            self.nodeTaiXiu = self.createMiniGameView(prefab);
          });
        });

        return;
      }

      // Mini-game dạng popup: Tài Xỉu MD5
      if (gameId === cc.GameId.TAI_XIU_MD5) {
        if (this.nodeTaiXiuMd5 !== null || this.isLoading) return;

        this.isLoading = true;
        this._startMd5LoadingBar();

        cc.BundleLoader.getInstance().loadGame(gameId, function (err, bundle) {
          if (err) {
            self.isLoading = false;
            self._stopMd5LoadingBar(false);
            cc.PopupController.getInstance().showMessageError('Không thể tải game Tài Xỉu MD5. Vui lòng thử lại!');
            return;
          }

          var prefabPath = cc.GameBundleConfig.getMainPrefab(gameId);
          bundle.load(prefabPath, cc.Prefab, function (err2, prefab) {
            self.isLoading = false;

            if (err2) {
              self._stopMd5LoadingBar(false);
              console.error('[LobbyView] Load prefab Tài Xỉu MD5 thất bại:', prefabPath, err2);
              cc.PopupController.getInstance().showMessageError('Không thể mở game Tài Xỉu MD5!');
              return;
            }

            self._stopMd5LoadingBar(true);
            self.nodeTaiXiuMd5 = self.createMiniGameView(prefab);
          });
        });

        return;
      }

      // Mini-game dạng popup: Tài Xỉu Siêu Tốc
      if (gameId === cc.GameId.TAI_XIU_SIEU_TOC) {
        if (this.nodeTaiXiuSieuToc !== null || this.isLoading) return;

        this.isLoading = true;
        this._startSieuTocLoadingBar();

        cc.BundleLoader.getInstance().loadGame(gameId, function (err, bundle) {
          if (err) {
            self.isLoading = false;
            self._stopSieuTocLoadingBar(false);
            cc.PopupController.getInstance().showMessageError('Không thể tải game Tài Xỉu Siêu Tốc. Vui lòng thử lại!');
            return;
          }

          var prefabPath = cc.GameBundleConfig.getMainPrefab(gameId);
          bundle.load(prefabPath, cc.Prefab, function (err2, prefab) {
            self.isLoading = false;

            if (err2) {
              self._stopSieuTocLoadingBar(false);
              console.error('[LobbyView] Load prefab Tài Xỉu Siêu Tốc thất bại:', prefabPath, err2);
              cc.PopupController.getInstance().showMessageError('Không thể mở game Tài Xỉu Siêu Tốc!');
              return;
            }

            self._stopSieuTocLoadingBar(true);
            self.nodeTaiXiuSieuToc = self.createMiniGameView(prefab);
          });
        });

        return;
      }

      // Mini-game dạng popup: Sicbo (giữ nodeSicbo, KHÔNG ẩn lobby)
      if (gameId === cc.GameId.SICBO) {
        if (this.nodeSicbo !== null || this.isLoading) return;

        this.isLoading = true;
        this._startSicboLoadingBar();

        cc.BundleLoader.getInstance().loadGame(gameId, function (err, bundle) {
          if (err) {
            self.isLoading = false;
            self._stopSicboLoadingBar(false);
            cc.PopupController.getInstance().showMessageError('Không thể tải game Sicbo. Vui lòng thử lại!');
            return;
          }

          var prefabPath = cc.GameBundleConfig.getMainPrefab(gameId);
          bundle.load(prefabPath, cc.Prefab, function (err2, prefab) {
            self.isLoading = false;

            if (err2) {
              self._stopSicboLoadingBar(false);
              console.error('[LobbyView] Load prefab Sicbo thất bại:', prefabPath, err2);
              cc.PopupController.getInstance().showMessageError('Không thể mở game Sicbo!');
              return;
            }

            self._stopSicboLoadingBar(true);
            self.nodeSicbo = self.createMiniGameView(prefab);
          });
        });

        return;
      }

      // Mặc định: game full-screen (slots, cardgames...) → ẩn lobby
      if (this.nodeSlotsView !== null || this.isLoading) return;

      this.isLoading = true;
      cc.PopupController.getInstance().showBusy();

      cc.BundleLoader.getInstance().loadGame(gameId, function (err, bundle) {
        if (err) {
          self.isLoading = false;
          cc.PopupController.getInstance().hideBusy();
          cc.PopupController.getInstance().showMessageError('Không thể tải game. Vui lòng thử lại!');
          return;
        }

        var prefabPath = cc.GameBundleConfig.getMainPrefab(gameId);
        bundle.load(prefabPath, cc.Prefab, function (err2, prefab) {
          self.isLoading = false;
          cc.PopupController.getInstance().hideBusy();

          if (err2) {
            console.error('[LobbyView] Load prefab thất bại:', prefabPath, err2);
            cc.PopupController.getInstance().showMessageError('Không thể mở game!');
            return;
          }

          cc.RoomController.getInstance().setGameId(gameId);
          self.nodeSlotsView = self.createView(prefab);
          self.activeNodeLobby(false);
        });
      });
    },

    createDynamicView: function (gameId) {
      // ── Nếu game đã được tách bundle (Phase 2+), dùng BundleLoader ──
      if (cc.GameBundleConfig && cc.GameBundleConfig.hasBundleConfig(gameId)) {
        this._createDynamicViewFromBundle(gameId);
        return;
      }

      // ── Fallback: game chưa tách bundle, dùng cc.loader cũ (Phase 1) ──
      switch (gameId) {
        case cc.GameId.SHOOT_FISH:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingShootFish.node.parent.active = true;
          var percent = 0;
          //self.progressBarbanca.percent = percent / 100;
          cc.loader.loadRes(
            "shootFish/prefabs/ShootFish",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBanCa.progress = a / b;
              self.lbLoadingShootFish.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingShootFish.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              //hide cac node o lobby
              self.activeNodeLobby(false);
            }
          );

          break;

        case cc.GameId.EGYPT:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingEgypt.node.parent.active = true;
          //

          //

          var percent = 0;
          cc.loader.loadRes(
            "egypt/prefabs/egyptView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressEgypt.progress = a / b;
              self.lbLoadingEgypt.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingEgypt.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              //hide cac node o lobby
              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.THREE_KINGDOM:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTK.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tk/prefabs/tkView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTK.progress = a / b;
              self.lbLoadingTK.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTK.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );

          break;

        case cc.GameId.AQUARIUM:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingAquarium.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "aquarium/prefabs/aquariumView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBarAquarium.progress = a / b;
              self.lbLoadingAquarium.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingAquarium.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.DRAGON_BALL:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingDragonBall.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "dragonball/prefabs/dbView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressDragonBall.progress = a / b;
              self.lbLoadingDragonBall.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingDragonBall.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.COWBOY:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingCowboy.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "cowboy/prefabs/cbView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressCowboy.progress = a / b;
              self.lbLoadingCowboy.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingCowboy.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.DRAGON_TIGER:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingDragonTiger.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "dragontiger/prefabs/dragonTigerView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressDragonTiger.progress = a / b;
              self.lbLoadingDragonTiger.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingDragonTiger.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.XOC_XOC:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingXocXoc.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "xocxoc/prefabs/xocxocView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressXocXoc.progress = a / b;
              self.lbLoadingXocXoc.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingXocXoc.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.TAI_XIU:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeTaiXiu !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTaiXiu.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "taixiu/prefabs/taixiuView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTaiXiu.progress = a / b;
              self.lbLoadingTaiXiu.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTaiXiu.node.parent.active = false;
              //Tao game
              self.nodeTaiXiu = self.createView(prefab);
            }
          );
          break;
        case cc.GameId.TAI_XIU_MD5:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeTaiXiuMd5 !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTaiXiuMd5.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "taixiumd5/prefabs/taixiuMd5View",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTaiXiuMd5.progress = a / b;
              self.lbLoadingTaiXiuMd5.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTaiXiuMd5.node.parent.active = false;
              //Tao game
              self.nodeTaiXiuMd5 = self.createView(prefab);
            }
          );
          break;
        case cc.GameId.TAI_XIU_SIEU_TOC:
            //kiem tra da tao roi -> ko tao them
            if (this.nodeTaiXiuSieuToc !== null) return;
  
            this.isLoading = true;
            var self = this;
            //Bat loading
            self.lbLoadingTaiXiuSieuToc.node.parent.active = true;
            var percent = 0;
            cc.loader.loadRes(
              "taixiusieutoc/prefabs/taiXiuSieuTocView",
              function (a, b, c) {
                var tempPercent = Math.round((100 * a) / b);
  
                //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                if (tempPercent > percent) {
                  percent = tempPercent;
                }
                self.progressTaiXiuSieuToc.progress = a / b;
                self.lbLoadingTaiXiuSieuToc.string = `${parseInt((a / b) * 100)}%`;
              },
              function (err, prefab) {
                //Load xong
                self.isLoading = false;
                //Tat loading
                self.lbLoadingTaiXiuSieuToc.node.parent.active = false;
                //Tao game
                self.nodeTaiXiuSieuToc = self.createView(prefab);
              }
            );
            break;
        case cc.GameId.MINI_POKER:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeMiniPoker !== null) return;

          this.isLoading = true;
          var self = this;
          var percent = 0;
          //Bat loading
          self.lbLoadingMiniPoker.node.parent.active = true;
          // self.progressBar.percent = percent / 100;

          cc.loader.loadRes(
            "minipoker/prefabs/minipokerView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressMiniPoker.progress = a / b;
              self.lbLoadingMiniPoker.string = `${parseInt((a / b) * 100)}%`;
              // self.progressBar.percent = percent / 100;
              self.lbLoadingMiniPoker.string = percent + "%";
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingMiniPoker.node.parent.active = false;
              //Tao game
              self.nodeMiniPoker = self.createView(prefab);
            }
          );
          break;

        case cc.GameId.SEVEN77:
          //kiem tra da tao roi -> ko tao them
          if (this.node777 !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoading777.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "777/prefabs/777View",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progress777.progress = a / b;
              self.lbLoading777.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoading777.node.parent.active = false;
              //Tao game
              self.node777 = self.createView(prefab);
            }
          );

          break;

        case cc.GameId.BLOCK_BUSTER:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeTQ !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTQ.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tq/prefabs/tqView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTQ.progress = a / b;
              self.lbLoadingTQ.string = `${parseInt((a / b) * 100)}%`;

              self.lbLoadingTQ.string = percent + "%";
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTQ.node.parent.active = false;
              //Tao game
              self.nodeTQ = self.createView(prefab);
            }
          );

          break;

        //CARD GAME
        case cc.GameId.POKER_TEXAS:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingPoker.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "poker/prefabs/pokerView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressPoker.progress = a / b;
              self.lbLoadingPoker.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingPoker.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.BA_CAY:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingThreeCards.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "3cay/prefabs/3CLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressThreeCards.progress = a / b;
              self.lbLoadingThreeCards.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingThreeCards.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.TIEN_LEN_MN:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTLMN.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tienlenMN/prefabs/TLMNLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTLMN.progress = a / b;
              self.lbLoadingTLMN.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTLMN.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.TIEN_LEN_MN_SOLO:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTLMNSolo.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tienlenMNSoLo/prefabs/TLMNSoLoLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTLMNSolo.progress = a / b;
              self.lbLoadingTLMNSolo.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTLMNSolo.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.MAU_BINH:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingMB.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "maubinh/prefabs/MBLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressMB.progress = a / b;
              self.lbLoadingMB.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingMB.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.BACCARAT:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingBaccarat.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "bacarat/prefabs/BaCaratView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBaccarat.progress = a / b;
              self.lbLoadingBaccarat.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingBaccarat.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);
              self.activeNodeLobby(false);
            }
          );
          break;
        case cc.GameId.BAUCUA:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingBauCua.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "baucua/prefabs/BauCuaView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBauCua.progress = a / b;
              self.lbLoadingBauCua.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingBauCua.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);
              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.LODE:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;

          //Bat loading
          self.lbLoadingLoDe.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "lode/prefabs/LoDeLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressLoDe.progress = a / b;
              self.lbLoadingLoDe.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingLoDe.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;
      }
    },

    destroyDynamicView: function (gameId) {
      switch (gameId) {
        case cc.GameId.EVENT_TREASURE:
          if (this.nodeTreasureView) {
            this.nodeTreasureView.destroy();
            this.nodeTreasureView = null;
          }

          if (this.nodeTreasureGiftView) {
            this.nodeTreasureGiftView.destroy();
            this.nodeTreasureGiftView = null;
          }

          if (this.nodeBuyCarrotView) {
            this.nodeBuyCarrotView.destroy();
            this.nodeBuyCarrotView = null;
          }
          break;
        case cc.GameId.TAI_XIU:
          if (this.nodeTaiXiu) {
            this.nodeTaiXiu.destroy();
            this.nodeTaiXiu = null;
          }
          // ❌ KHÔNG release bundle ngay → tránh lag khi mở lại
          // if (cc.BundleLoader && cc.GameBundleConfig && cc.GameBundleConfig.hasBundleConfig(cc.GameId.TAI_XIU)) {
          //   cc.BundleLoader.getInstance().releaseGame(cc.GameId.TAI_XIU);
          // }
          
          // ✅ Chỉ hiển thị lại lobby, KHÔNG thay đổi trạng thái login
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.TAI_XIU_MD5:
          if (this.nodeTaiXiuMd5) {
            this.nodeTaiXiuMd5.destroy();
            this.nodeTaiXiuMd5 = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.TAI_XIU_SIEU_TOC:
          if (this.nodeTaiXiuSieuToc) {
            this.nodeTaiXiuSieuToc.destroy();
            this.nodeTaiXiuSieuToc = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.SICBO:
          if (this.nodeSicbo) {
            this.nodeSicbo.destroy();
            this.nodeSicbo = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.MINI_POKER:
          if (this.nodeMiniPoker) {
            this.nodeMiniPoker.destroy();
            this.nodeMiniPoker = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.SEVEN77:
          if (this.node777) {
            this.node777.destroy();
            this.node777 = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.BLOCK_BUSTER:
          if (this.nodeTQ) {
            this.nodeTQ.destroy();
            this.nodeTQ = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.LUCKY_WILD:
          if (this.nodeLW) {
            this.nodeLW.destroy();
            this.nodeLW = null;
          }
          this.showLobbyAfterMinigame();
          break;
        case cc.GameId.ESPORTS:
          if (this.nodeEsport) {
            this.nodeEsport.destroy();
            this.nodeEsport = null;
          }
          break;
        default:
          this.activeNodeTopBar(false);
          //bat lai cac node o lobby
          this.activeNodeLobby(true);

          //cc.BannerController.getInstance().switchPage();

          //mac dinh se là cac game slots
          if (this.nodeSlotsView) {
            this.nodeSlotsView.destroy();
            this.nodeSlotsView = null;
          }

          if (this.nodeEventView) {
            this.nodeEventView.destroy();
            this.nodeEventView = null;
          }

          if (this.nodeEventViewTopVP) {
            this.nodeEventViewTopVP.destroy();
            this.nodeEventViewTopVP = null;
          }

          break;
      }
      cc.LobbyController.getInstance().refreshAccountInfo();
    },

    destroyAllMiniGameView: function () {
      this.destroyDynamicView(cc.GameId.TAI_XIU);
      this.destroyDynamicView(cc.GameId.TAI_XIU_MD5);
      this.destroyDynamicView(cc.GameId.TAI_XIU_SIEU_TOC);
      this.destroyDynamicView(cc.GameId.SICBO);
      this.destroyDynamicView(cc.GameId.MINI_POKER);
      this.destroyDynamicView(cc.GameId.SEVEN77);
      this.destroyDynamicView(cc.GameId.BLOCK_BUSTER);
      this.destroyDynamicView(cc.GameId.LUCKY_WILD);

      this.destroyDynamicView(null);
    },

    createView: function (prefab, posY) {
      var nodeView = cc.instantiate(prefab);
      nodeView.parent = this.node;
      if (posY) {
        nodeView.setPosition(0, posY);
      } else {
        nodeView.setPosition(0, 0);
      }

      return nodeView;
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎮 MINIGAME LAYER MANAGEMENT (Production Architecture)
    // ═══════════════════════════════════════════════════════════════
    /**
     * Tạo minigame view trong miniGameLayer
     * Dành cho: Tài Xỉu, Sicbo, MiniPoker... (popup games)
     */
    createMiniGameView: function (prefab, posY) {
      if (!this.miniGameLayer) {
        console.warn('[LobbyView] miniGameLayer chưa được assign! Fallback về createView');
        return this.createView(prefab, posY);
      }

      // Đảm bảo layer luôn active và ở top
      this.miniGameLayer.active = true;
      this.miniGameLayer.zIndex = 9999;  // Cao hơn toàn bộ lobby UI

      var nodeView = cc.instantiate(prefab);
      nodeView.parent = this.miniGameLayer;
      nodeView.zIndex = 0;  // Bên trong layer, zIndex bình thường

      if (posY) {
        nodeView.setPosition(0, posY);
      } else {
        nodeView.setPosition(0, 0);
      }

      return nodeView;
    },

    /**
     * Tạo popup view trong popupLayer  
     * Dành cho: Login, Shop, History... (system popups)
     */
    createPopupView: function (prefab, posY) {
      if (!this.popupLayer) {
        console.warn('[LobbyView] popupLayer chưa được assign! Fallback về createView');
        return this.createView(prefab, posY);
      }

      var nodeView = cc.instantiate(prefab);
      nodeView.parent = this.popupLayer;
      if (posY) {
        nodeView.setPosition(0, posY);
      } else {
        nodeView.setPosition(0, 0);
      }

      return nodeView;
    },

    loginSuccess: function () {
      this.nodeguest.active = false;
      this.nodemanutab.active = true;
      cc.OneSignalController.getInstance().sendTag(
        "AccountID",
        cc.LoginController.getInstance().getUserId()
      );
      cc.OneSignalController.getInstance().sendTag(
        "AccountName",
        cc.LoginController.getInstance().getNickname()
      );

      //cap nhat lai trang thai
      cc.LoginController.getInstance().setLoginState(true);
      //hien UI NickName + avatar
      cc.LobbyController.getInstance().updateUILogin(false);
      //open hub portal
      cc.GameController.getInstance().portalNegotiate();

      cc.LobbyController.getInstance().topBarUpdateInfo();

      //Kiem tra thu chua doc
      cc.LobbyController.getInstance().getMailUnRead();
      cc.LobbyController.getInstance().createX2PopupView();
      //Bat huong dan appSafe sau khi Login + chua tich hopj AppSafe
      var loginResponse = cc.LoginController.getInstance().getLoginResponse();

      if (!cc.DomainController.getInstance().checkErrorDomain()) {
        //bat event sau khi login thanh cong

        // cc.Tool.getInstance().setItem('@startTabEvent', 0);
        // cc.Tool.getInstance().setItem('@startSubTabEvent', 'TOP');
        // cc.LobbyController.getInstance().createEventView();

        // if (loginResponse.PhoneSafeNo === null) {
        //     cc.LobbyController.getInstance().createAppSafeHelpView();
        // }

        //check xem co luot quay VQMM ko? -> show VQMM
    //    this.checkVQMMInfo(); //ALPHA chua chay

        cc.DDNA.getInstance().clientDevice();
        cc.DDNA.getInstance().gameStarted();

        var getChargeDefaultCommand = new cc.GetChargeDefaultCommand();
        getChargeDefaultCommand.execute(this);
      }

      // //#KingViet
      // if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
      //     cc.AccountController.getInstance().setAppSafeSatus(false);
      //     var checkSafeLinkAccountCommand = new cc.CheckSafeLinkAccountCommand;
      //     checkSafeLinkAccountCommand.execute();
      // } else {
      //
      //
      //
      // }

      // cc.LobbyController.getInstance().createDNSHelpView();

      // var checkHaveGiftcodeCommand = new cc.CheckHaveGiftcodeCommand;
      // checkHaveGiftcodeCommand.execute();

      // show sieu xe
      // if (this.nodeX2Popup == null)
      //   cc.LobbyController.getInstance().createX2PopupView(); // comment

      if (cc.LoginController.getInstance().checkLogin()) {
        this.lbTopVp.string = cc.Tool.getInstance().formatNumber(
          cc.LoginController.getInstance().getTopVPResponse()
        );
      } else this.lbTopVp.string = "0";
    },

    //EVENT SAN KHO BAU
    checkHaveDailyBonus: function () {
      var treasureGetCarrotNameKnownCommand =
        new cc.TreasureGetCarrotNameKnownCommand();
      treasureGetCarrotNameKnownCommand.execute(this);
    },

    onTreasureGetCarrotNameKnownResponse: function (response) {
      if (response !== null)
        cc.TreasureController.getInstance().setIsDailyBonus(response.IsInDay); //= true la nhan roi

      //chua nhan thi moi hien
      if (response !== null && !response.IsInDay) {
        cc.LobbyController.getInstance().createCarrotDailyBonusView();
      }
    },

    joinGame: function (gameId) {
      if (cc.LoginController.getInstance().checkLogin()) {
        if (this.isLoading) return;

        if (gameId === undefined) {
          // || gameId === cc.GameId.BLOCK_BUSTER
          //cc.PopupController.getInstance().showMessage('Sắp ra mắt!');
          cc.PopupController.getInstance().showMessage("Sắp ra mắt!");
          return;
        }

        switch (gameId.toString()) {
          case cc.GameId.SHOOT_FISH:
            this.createDynamicView(cc.GameId.SHOOT_FISH);
            break;
          case cc.GameId.ESPORTS:
            this.createDynamicView(cc.GameId.ESPORTS);
            break;
          //Game slots chinh
          case cc.GameId.EGYPT:
            this.createDynamicView(cc.GameId.EGYPT);
            break;
          case cc.GameId.THREE_KINGDOM:
            this.createDynamicView(cc.GameId.THREE_KINGDOM);
            break;
          case cc.GameId.AQUARIUM:
            this.createDynamicView(cc.GameId.AQUARIUM);
            break;
          case cc.GameId.DRAGON_BALL:
            this.createDynamicView(cc.GameId.DRAGON_BALL);
            break;
          case cc.GameId.BUM_BUM:
            this.createDynamicView(cc.GameId.BUM_BUM);
            break;
          case cc.GameId.COWBOY:
            this.createDynamicView(cc.GameId.COWBOY);
            break;
          case cc.GameId.THUONG_HAI:
            this.createDynamicView(cc.GameId.THUONG_HAI);
            break;
          case cc.GameId.GAINHAY:
            this.createDynamicView(cc.GameId.GAINHAY);
            break;
          //Game mini full màn hình
          case cc.GameId.BACCARAT:
            this.createDynamicView(cc.GameId.BACCARAT);
            break;
          case cc.GameId.MONKEY:
            this.createDynamicView(cc.GameId.MONKEY);
            break;
          case cc.GameId.DRAGON_TIGER:
            this.createDynamicView(cc.GameId.DRAGON_TIGER);
            break;
          case cc.GameId.BAUCUA:
            this.createDynamicView(cc.GameId.BAUCUA);
            break;
          //CARD GAME
          case cc.GameId.XOC_XOC:
            this.createDynamicView(cc.GameId.XOC_XOC);
            break;
          case cc.GameId.POKER_TEXAS:
          case cc.GameId.BA_CAY:
          case cc.GameId.TIEN_LEN_MN:
          case cc.GameId.TIEN_LEN_MN_SOLO:
            if (cc.BalanceController.getInstance().getBalance() < 10000) {
              cc.PopupController.getInstance().showMessage(
                "Bạn không đủ tiền để vào phòng. Tối thiểu cần 10.000"
              );
              return;
            } else {
              this.createDynamicView(gameId.toString());
            }
            break;
          case cc.GameId.MAU_BINH:
            if (cc.BalanceController.getInstance().getBalance() < 30000) {
              cc.PopupController.getInstance().showMessage(
                "Bạn không đủ tiền để vào phòng. Tối thiểu cần 30.000"
              );
              return;
            } else {
              this.createDynamicView(gameId.toString());
            }
            break;
          //MINI game
          case cc.GameId.TAI_XIU:
            this.createDynamicView(cc.GameId.TAI_XIU);
            break;
          case cc.GameId.TAI_XIU_MD5:
            this.createDynamicView(cc.GameId.TAI_XIU_MD5);
            break;
          case cc.GameId.TAI_XIU_SIEU_TOC:
            this.createDynamicView(cc.GameId.TAI_XIU_SIEU_TOC);
            break;
          case cc.GameId.SICBO:
            this.createDynamicView(cc.GameId.SICBO);
            break;
          case cc.GameId.MINI_POKER:
            this.createDynamicView(cc.GameId.MINI_POKER);
            break;
          case cc.GameId.SEVEN77:
            this.createDynamicView(cc.GameId.SEVEN77);
            break;
          case cc.GameId.BLOCK_BUSTER:
            this.createDynamicView(cc.GameId.BLOCK_BUSTER);
            break;
          case cc.GameId.LUCKY_WILD:
            this.createDynamicView(cc.GameId.LUCKY_WILD);
            break;

          case cc.GameId.LODE:
            this.createDynamicView(cc.GameId.LODE);
            break;
          case cc.GameId.VIETLOT:
            this.createDynamicView(cc.GameId.VIETLOT);
            break;
          case "100":
            cc.PopupController.getInstance().showMessage("Sắp ra mắt");
            break;
          case "101":
            cc.PopupController.getInstance().showMessage("Sắp ra mắt");
            break;
        }
      }
    },

    gamebaitri: function () {
      cc.PopupController.getInstance().showMessage("Sắp ra mắt!");
      this.AudioClick.loop = false;
      this.AudioClick.play();
    },
    GamebaoTriCheck: function () {
      if (cc.BalanceController.getInstance().getBalance() < 1000000) {
        cc.PopupController.getInstance().showMessage(
          "Bạn không đủ tiền để vào phòng. Tối thiểu cần 1.000.000 VNĐ"
        );
        return;
      } else {
      cc.PopupController.getInstance().showMessage("bay789x.me - Hệ Thống Bảo Trì Để Nâng Cấp");
      this.AudioClick.loop = false;
      this.AudioClick.play();
      }
    },
    gamebaotri: function () {
      cc.PopupController.getInstance().showMessage("Game bảo trì!");
      this.AudioClick.loop = false;
      this.AudioClick.play();
    },
    GalaxySapRaMat: function () {
      cc.PopupController.getInstance().showMessage("Galaxy Sắp Ra Mắt");
      this.AudioClick.loop = false;
      this.AudioClick.play();
    },

    refreshAccountInfo: function () {
      var getAccountInfoCommand = new cc.GetAccountInfoCommand();
      getAccountInfoCommand.execute(this);
    },

    activeNodeLobby: function (enable) {
      if (enable) {
        this.nodeguest.active = true;
        this.nodemanutab.active = false;
        this.activeNodeTopBar(false);
        this.playAudioBg();
      } else {
        this.nodeguest.active = false;
        this.nodemanutab.active = false;
        this.audioBg.stop();
      }
      this.nodeEventTop.active = enable;
      this.nodemanutab.active = enable;
      this.nodeLobbys.forEach(function (nodeLobby) {
        nodeLobby.active = enable;
      });

      cc.LobbyController.getInstance().setLobbyActive(enable);
    },

    /**
     * Hiển thị lại lobby sau khi đóng minigame popup
     * KHÔNG thay đổi trạng thái login (guest/user)
     */
    showLobbyAfterMinigame: function () {
      // Hiển thị lại các lobby node
      this.nodeLobbys.forEach(function (nodeLobby) {
        nodeLobby.active = true;
      });
      
      // Hiển thị lại event top
      this.nodeEventTop.active = true;
      
      // Nếu đã login → hiển thị menu tab, ẩn guest UI
      // Nếu chưa login → hiển thị guest UI, ẩn menu tab
      var isLoggedIn = cc.LoginController.getInstance().checkLogin();
      if (isLoggedIn) {
        this.nodemanutab.active = true;
        this.nodeguest.active = false;
      } else {
        this.nodeguest.active = true;
        this.nodemanutab.active = false;
      }

      // Bật lại nhạc nền
      this.playAudioBg();
      
      // Thông báo cho LobbyController
      cc.LobbyController.getInstance().setLobbyActive(true);
    },

    // ═══════════════════════════════════════════════════════════════
    //  Loading bar cho Tài Xỉu (fake progress mượt 0 → 90%)
    // ═══════════════════════════════════════════════════════════════
    _startTaiXiuLoadingBar: function () {
      var self = this;

      if (!this.lbLoadingTaiXiu || !this.progressTaiXiu) {
        return;
      }

      // Hiện UI loading
      this.lbLoadingTaiXiu.node.parent.active = true;
      this._taiXiuLoadingProgress = 0;
      this.lbLoadingTaiXiu.string = "0%";
      this.progressTaiXiu.progress = 0;

      // Dừng tick cũ nếu có
      if (this._taiXiuLoadingTick) {
        this.unschedule(this._taiXiuLoadingTick);
        this._taiXiuLoadingTick = null;
      }

      // Hàm tick tăng dần tới 100%
      this._taiXiuLoadingTick = function () {
        // Nếu đã gần 100% thì giữ ở đó, chờ real load xong
        if (self._taiXiuLoadingProgress >= 1) {
          self._taiXiuLoadingProgress = 1;
        } else {
          self._taiXiuLoadingProgress += 0.04; // tăng mỗi 50ms ~ 1.5s lên 100%
        }

        self.progressTaiXiu.progress = self._taiXiuLoadingProgress;
        self.lbLoadingTaiXiu.string = Math.round(self._taiXiuLoadingProgress * 100) + "%";
      };

      // Tick mỗi 0.05s
      this.schedule(this._taiXiuLoadingTick, 0.05);
    },

    _stopTaiXiuLoadingBar: function (isSuccess) {
      if (!this.lbLoadingTaiXiu || !this.progressTaiXiu) {
        return;
      }

      if (this._taiXiuLoadingTick) {
        this.unschedule(this._taiXiuLoadingTick);
        this._taiXiuLoadingTick = null;
      }

      if (isSuccess) {
        this.progressTaiXiu.progress = 1;
        this.lbLoadingTaiXiu.string = "100%";
      } else {
        this.progressTaiXiu.progress = 0;
        this.lbLoadingTaiXiu.string = "0%";
      }

      this.lbLoadingTaiXiu.node.parent.active = false;
    },

    // ─── Tài Xỉu MD5 Loading Bar ─────────────────────────────────────
    _startMd5LoadingBar: function () {
      var self = this;
      if (!this.lbLoadingTaiXiuMd5 || !this.progressTaiXiuMd5) return;

      this.lbLoadingTaiXiuMd5.node.parent.active = true;
      this._md5LoadingProgress = 0;
      this.lbLoadingTaiXiuMd5.string = "0%";
      this.progressTaiXiuMd5.progress = 0;

      if (this._md5LoadingTick) {
        this.unschedule(this._md5LoadingTick);
        this._md5LoadingTick = null;
      }

      this._md5LoadingTick = function () {
        if (self._md5LoadingProgress < 1) {
          self._md5LoadingProgress += 0.04;
          if (self._md5LoadingProgress > 1) self._md5LoadingProgress = 1;
        }
        self.progressTaiXiuMd5.progress = self._md5LoadingProgress;
        self.lbLoadingTaiXiuMd5.string = Math.round(self._md5LoadingProgress * 100) + "%";
      };

      this.schedule(this._md5LoadingTick, 0.05);
    },

    // ─── Sicbo Loading Bar (label-only, khong co progress bar) ─────
    _startSicboLoadingBar: function () {
      var self = this;
      if (!this.lbLoadingSicbo) return;

      this.lbLoadingSicbo.node.parent.active = true;
      this._sicboLoadingProgress = 0;
      this.lbLoadingSicbo.string = "0%";

      if (this._sicboLoadingTick) {
        this.unschedule(this._sicboLoadingTick);
        this._sicboLoadingTick = null;
      }

      this._sicboLoadingTick = function () {
        if (self._sicboLoadingProgress < 1) {
          self._sicboLoadingProgress += 0.04;
          if (self._sicboLoadingProgress > 1) self._sicboLoadingProgress = 1;
        }
        self.lbLoadingSicbo.string = Math.round(self._sicboLoadingProgress * 100) + "%";
      };

      this.schedule(this._sicboLoadingTick, 0.05);
    },

    _stopSicboLoadingBar: function (isSuccess) {
      if (!this.lbLoadingSicbo) return;

      if (this._sicboLoadingTick) {
        this.unschedule(this._sicboLoadingTick);
        this._sicboLoadingTick = null;
      }

      this.lbLoadingSicbo.string = isSuccess ? "100%" : "0%";
      this.lbLoadingSicbo.node.parent.active = false;
    },

    _stopMd5LoadingBar: function (isSuccess) {
      if (!this.lbLoadingTaiXiuMd5 || !this.progressTaiXiuMd5) return;

      if (this._md5LoadingTick) {
        this.unschedule(this._md5LoadingTick);
        this._md5LoadingTick = null;
      }

      if (isSuccess) {
        this.progressTaiXiuMd5.progress = 1;
        this.lbLoadingTaiXiuMd5.string = "100%";
      } else {
        this.progressTaiXiuMd5.progress = 0;
        this.lbLoadingTaiXiuMd5.string = "0%";
      }

      this.lbLoadingTaiXiuMd5.node.parent.active = false;
    },

    // ─── Tài Xỉu Siêu Tốc Loading Bar ───────────────────────────────
    _startSieuTocLoadingBar: function () {
      var self = this;
      if (!this.lbLoadingTaiXiuSieuToc || !this.progressTaiXiuSieuToc) return;

      this.lbLoadingTaiXiuSieuToc.node.parent.active = true;
      this._sieuTocLoadingProgress = 0;
      this.lbLoadingTaiXiuSieuToc.string = "0%";
      this.progressTaiXiuSieuToc.progress = 0;

      if (this._sieuTocLoadingTick) {
        this.unschedule(this._sieuTocLoadingTick);
        this._sieuTocLoadingTick = null;
      }

      this._sieuTocLoadingTick = function () {
        if (self._sieuTocLoadingProgress < 1) {
          self._sieuTocLoadingProgress += 0.04;
          if (self._sieuTocLoadingProgress > 1) self._sieuTocLoadingProgress = 1;
        }
        self.progressTaiXiuSieuToc.progress = self._sieuTocLoadingProgress;
        self.lbLoadingTaiXiuSieuToc.string = Math.round(self._sieuTocLoadingProgress * 100) + "%";
      };

      this.schedule(this._sieuTocLoadingTick, 0.05);
    },

    _stopSieuTocLoadingBar: function (isSuccess) {
      if (!this.lbLoadingTaiXiuSieuToc || !this.progressTaiXiuSieuToc) return;

      if (this._sieuTocLoadingTick) {
        this.unschedule(this._sieuTocLoadingTick);
        this._sieuTocLoadingTick = null;
      }

      if (isSuccess) {
        this.progressTaiXiuSieuToc.progress = 1;
        this.lbLoadingTaiXiuSieuToc.string = "100%";
      } else {
        this.progressTaiXiuSieuToc.progress = 0;
        this.lbLoadingTaiXiuSieuToc.string = "0%";
      }

      this.lbLoadingTaiXiuSieuToc.node.parent.active = false;
    },

    activeNodeTopBar: function (enable) {
      this.nodeTopBar.active = enable;
      this.nodeSetting.active = enable;
      this.nodeTopBar.getComponent(cc.TopBarView).isCardGame = enable;
      if (enable) {
        this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR_CARD_GAME;
        this.refreshAccountInfo();
      } else {
        this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR;
      }
    },

    //response
    onGetAccountInfoResponse: function (response) {
      if (response !== null) {
        cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
        cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
        cc.LoginController.getInstance().setTopVPResponse(response.TopVP);
      }
      cc.LobbyController.getInstance().topBarUpdateInfo();
      this.lbTopVp.string = cc.Tool.getInstance().formatNumber(
        cc.LoginController.getInstance().getTopVPResponse()
      );
    },

  //   checkVQMMInfo: function () {
  //    var vqmmGetInfoCommand = new cc.VQMMGetInfoCommand;
  //    vqmmGetInfoCommand.execute(this);
  //    },

  //   onVQMMGetInfoResponse: function (response) {
  //  //   response= {"Quantity":1,"IsOpen":false,"Response":0};
  //     if (response !== null && response.Quantity > 0 && response.IsOpen) {
  //       this.createVQMMView();
  //    }
  //    },

    joinGameClicked: function (event, data) {
      if (cc.LoginController.getInstance().checkLogin()) {
        this.joinGame(data);
        this.AudioClick.loop = false;
        this.AudioClick.play();
        cc.DDNA.getInstance().uiInteraction(
          cc.DDNAUILocation.PORTAL,
          cc.DDNA.getInstance().getGameById(data.toString()),
          cc.DDNAUIType.BUTTON
        );
      }
    },

    setIsAudioBg: function (isEnable) {
      if (typeof isEnable !== "undefined") {
          if (this.IsOnAudioBg === isEnable) return; // Avoid re-triggering audio if already in this state
          this.IsOnAudioBg = isEnable;
      } else {
          this.IsOnAudioBg = !this.IsOnAudioBg;
      }
      cc.Tool.getInstance().setItem("@onAudioBg", this.IsOnAudioBg);
      if (this.IsOnAudioBg) this.audioBg.play();
      else this.audioBg.stop();
      if (this.toggleAudio) {
          this.toggleAudio.isChecked = this.IsOnAudioBg;
      }
    },

    playAudioBg: function () {
      if (this.IsOnAudioBg) {
        this.audioBg.play();
      } else {
        this.audioBg.stop();
      }
    },
  });
}.call(this));
