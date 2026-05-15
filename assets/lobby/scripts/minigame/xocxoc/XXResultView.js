/**
 * Created by Welcome on 5/28/2019.
 * Refactored 2026-05-11: bo animation 'mobat' skeleton, thay bang sprite tween
 *   (zoom-in -> slide bat sang ngang -> dwell -> zoom-out).
 *   Skeleton animationBat chi con anim 'XocXoc' (lac). State idle = no anim.
 */
(function () {
    cc.XXResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            // ── SKELETON (chi anim XocXoc khi shake) ─────────────────
            animationBat: sp.Skeleton,

            // ── DEALER SPINE ─────────────────────────────────────────
            //  - state BETTING:  play 'bet' (vay chip/keu cuoc)
            //  - cac state khac: play 'idle' (dung yen, xem)
            animationDealer: {
                default: null,
                type: sp.Skeleton,
                tooltip: 'Spine dealer 2 anim: bet (BETTING) + idle (khac). De trong neu khong co dealer.'
            },

            // ── SPRITE REVEAL (Parent_BatDia hierarchy) ──────────────
            nodeParentBatDia: {
                default: null,
                type: cc.Node,
                tooltip: 'Cha cua Dia/4 Vi/Bat. Anchor (0.5, 0.5) de zoom tu tam.'
            },
            nodeDia: {
                default: null,
                type: cc.Node,
                tooltip: 'Sprite cai dia (background, render BOTTOM)'
            },
            nodeBat: {
                default: null,
                type: cc.Node,
                tooltip: 'Sprite cai bat (chen, render TOP - sibling cuoi cung). Tween slide ngang khi mo.'
            },

            // ── 4 VI ─────────────────────────────────────────────────
            spriteVis: [cc.Sprite],
            sfVis: {
                default: [],
                type: [cc.SpriteFrame],
                tooltip: '2 sprite frame: [0]=sap, [1]=ngua'
            },

            // ── TWEEN CONFIG (chinh trong Editor) ────────────────────
            revealZoomScale: {
                default: 1.6,
                type: cc.Float,
                tooltip: 'Scale Parent_BatDia khi zoom-in (1.6 = 160%, kha to)'
            },
            revealZoomInDuration: {
                default: 1.2,
                type: cc.Float,
                tooltip: 'Time zoom-in + di chuyen ve giua (giay)'
            },
            revealZoomOutDuration: {
                default: 1.5,
                type: cc.Float,
                tooltip: 'Time zoom-out + ve vi tri goc (giay) - cham hon zoom-in cho ngot'
            },
            revealMoveToX: {
                default: 0,
                type: cc.Float,
                tooltip: 'X dich chuyen cum BatDia toi (0 = giua man hinh).'
            },
            revealMoveToY: {
                default: 0,
                type: cc.Float,
                tooltip: 'Y dich chuyen cum BatDia toi (0 = giua man hinh).'
            },
            revealSlideX: {
                default: 400,
                type: cc.Float,
                tooltip: 'Bat truot sang phai bao nhieu pixel khi mo'
            },
            revealDuration: {
                default: 1.0,
                type: cc.Float,
                tooltip: 'Time slide bat - cham rai (giay)'
            },
            revealDwellTime: {
                default: 2.0,
                type: cc.Float,
                tooltip: 'Time dwell sau khi mo bat (xem ket qua) (giay)'
            },
            nanDelayMs: {
                default: 5000,
                type: cc.Integer,
                tooltip: 'Bat nan: thoi gian bat up cho mo (ms)'
            },

            // ── RESULT BLINK FX (giu nguyen) ─────────────────────────
            animResult: cc.Animation,
            nodeChan: cc.Node,
            nodeLe: cc.Node,
            nodeChan1: cc.Node,
            nodeChan2: cc.Node,
            nodeChan3: cc.Node,
            nodeLe1: cc.Node,
            nodeLe2: cc.Node,
            nodeLe3: cc.Node,

            // ── JACKPOT Hoang Kim Long ───────────────────────────────
            // Label tween so pool (update moi sessionInfo / moi PlayNow)
            // Co the gan cc.LabelIncrement (tween) hoac cc.Label (set string thuong)
            jackpot: {
                default: null,
                type: cc.Component,
                tooltip: 'Label hien thi pool jackpot. cc.LabelIncrement (tween) hoac cc.Label thuong.'
            },
            // Panel popup hien khi no - chua label tien thuong + fx phao hoa
            nodeJackPot: {
                default: null,
                type: cc.Node,
                tooltip: 'Node popup hien khi no hu. Tat luc onLoad, bat khi nhan jackpotHit.'
            },
            // Label hien so tien user nhan (neu trung) hoac tong pool
            lbJackpot_Hu: {
                default: null,
                type: cc.Label,
                tooltip: 'Label trong popup nodeJackPot - hien tien thuong.'
            },
            // Spine animation hu (optional)
            animationHu: {
                default: null,
                type: sp.Skeleton,
                tooltip: 'Spine animation hu (optional). Play khi no.'
            },
            // Mini-slot 4-dice animation
            nodeSpinView: {
                default: null,
                type: cc.Node,
                tooltip: 'Node spinView (cha cua 4 cot slot). Tat khi onLoad, bat khi nhan SLOT_RESULT.'
            },
            spinCols: {
                default: [],
                type: [cc.Node],
                tooltip: '4 node 1/2/3/4 trong slots (theo thu tu dice 1..4). Code se tu getComponent(XXSpinColumView).'
            },
            spinDurations: {
                default: [],
                type: [cc.Float],
                tooltip: 'Thoi gian moi cot spin truoc khi stop (giay). 4 cot stop stagger. De trong -> auto [1.5, 2.0, 2.5, 3.0].'
            },
        },

        onLoad: function () {
            cc.XXController.getInstance().setXXResultView(this);

            this.currentState = -1;
            this.nodeResult = this.animResult.node;
            this.nodeFxResult = this.nodeChan1.parent;

            // Cache parent cua 4 vi
            this.nodeViParent = this.spriteVis[0].node.parent;

            // Cache vi tri goc cua sprite bat de reset moi vong
            if (this.nodeBat) {
                this._batStartX = this.nodeBat.x;
                this._batStartY = this.nodeBat.y;
            }
            // Cache vi tri goc cua Parent_BatDia (tween reveal di chuyen ve giua,
            // khi xong tween ve lai vi tri nay).
            if (this.nodeParentBatDia) {
                this._parentStartX = this.nodeParentBatDia.x;
                this._parentStartY = this.nodeParentBatDia.y;
            }

            // Defensive: prefab cu chua co revealMoveToX/Y -> Cocos co the load undefined.
            if (this.revealMoveToX == null) this.revealMoveToX = 0;
            if (this.revealMoveToY == null) this.revealMoveToY = 0;

            // JACKPOT: tat popup ban dau
            if (this.nodeJackPot) this.nodeJackPot.active = false;
            if (this.nodeSpinView) this.nodeSpinView.active = false;
            this._lastJackpotValue = 0;

            // Default spinDurations neu user khong gan trong Inspector
            if (!this.spinDurations || this.spinDurations.length === 0) {
                this.spinDurations = [1.5, 2.0, 2.5, 3.0];
            }
        },

        reset: function () {
        },

        // ─────────────────────────────────────────────────────────────
        //  STATE TRANSITION
        // ─────────────────────────────────────────────────────────────
        updateResult: function (players, result, originResult, state, openNow) {
            if (!this.nodeParentBatDia) {
                cc.warn('[XXResultView] nodeParentBatDia chua duoc gan. Mo prefab xocxocView.prefab de gan node.');
                return;
            }

            switch (state) {
                case cc.XXState.BETTING:        // 54 - cho dat cuoc
                    if (this.currentState !== state) {
                        this._showIdle();
                        this._playDealerAnim('bet');
                        // JACKPOT: tat popup van truoc, start spin loop xuyen suot van
                        if (this.nodeJackPot) this.nodeJackPot.active = false;
                        this._startSpinLoop();
                    }
                    break;

                case cc.XXState.WAITING:        // cho phien moi
                    if (this.currentState !== state) {
                        this._showIdle();
                        this._playDealerAnim('idle');
                        cc.XXController.getInstance().initGateChip();
                        this.nodeFxResult.active = false;
                    }
                    break;

                case cc.XXState.SHAKING:        // dang xoc bat
                    if (this.currentState !== state) {
                        this._showShaking();
                        this._playDealerAnim('idle');
                    }
                    break;

                case cc.XXState.OPEN_PLATE:     // mo bat
                    if (this.currentState !== state) {
                        this._showOpenPlate(result, originResult, openNow);
                        this._playDealerAnim('idle');
                    }
                    break;

                case cc.XXState.SHOW_RESULT:    // 15 - hien ket qua + tra chip
                    if (this.currentState !== state) {
                        this._showResult();
                        this._playDealerAnim('idle');
                        this.playPayFx(players, result);
                    }
                    break;
            }

            this.currentState = state;
        },

        // ─────────────────────────────────────────────────────────────
        //  STATE: idle (cho dat cuoc / cho phien)
        //  Bat up dung yen tren dia, skeleton hien nhung khong play anim.
        // ─────────────────────────────────────────────────────────────
        _showIdle: function () {
            // Reset sprite bat ve vi tri goc, hien skeleton bat
            this._resetBatSprite();
            if (this.nodeBat) this.nodeBat.active = false;
            if (this.nodeDia) this.nodeDia.active = false;
            this._resetParentTransform();

            // Skeleton hien thi, khong play anim (none = idle waiting)
            this.animationBat.node.active = true;
            this.animationBat.clearTracks();
            this.animationBat.setToSetupPose();

            // An ket qua
            this.nodeResult.active = false;
            this.nodeViParent.active = false;
            this.nodeFxResult.active = false;
        },

        // ─────────────────────────────────────────────────────────────
        //  STATE: shaking (xoc bat)
        // ─────────────────────────────────────────────────────────────
        _showShaking: function () {
            // An ket qua
            this.nodeResult.active = false;
            this.nodeViParent.active = false;
            this.nodeFxResult.active = false;

            // An sprite bat/dia, hien skeleton play XocXoc
            this._resetBatSprite();
            if (this.nodeBat) this.nodeBat.active = false;
            if (this.nodeDia) this.nodeDia.active = false;
            this._resetParentTransform();

            this.animationBat.node.active = true;
            this.animationBat.clearTracks();
            this.animationBat.setToSetupPose();
            // Spine moi: anim ten 'shake' (cu la 'XocXoc')
            this.animationBat.setAnimation(0, 'shake', false);
        },

        // ─────────────────────────────────────────────────────────────
        //  STATE: open plate (mo bat)
        //  - Setup 4 vi sprite theo result.
        //  - Neu Nan mode: bat up 5s, sau do tween reveal.
        //  - Neu open ngay: tween reveal lien.
        // ─────────────────────────────────────────────────────────────
        _showOpenPlate: function (result, originResult, openNow) {
            var self = this;

            // An skeleton, dung sprite bat thay the
            this.animationBat.node.active = false;
            this.animationBat.clearTracks();

            // Setup parent + dia + bat (ve vi tri goc, scale 1)
            this._resetParentTransform();
            this.nodeDia.active = true;
            this._resetBatSprite();
            this.nodeBat.active = true;

            // Setup 4 vi sprite theo result (chua hien, bi che boi bat)
            this._applyResultToVis(originResult);
            this.nodeViParent.active = true;   // 4 vi co san duoi bat

            // FX result blink (chua hien, hien o SHOW_RESULT)
            this.nodeResult.active = false;
            this.nodeFxResult.active = false;

            // Che do Nan: bat up 5s roi moi tween mo
            if (cc.XXController.getInstance().getIsNan() && !openNow) {
                this.scheduleOnce(function () {
                    self._playRevealSequence();
                }, this.nanDelayMs / 1000);
            } else {
                this._playRevealSequence();
            }
        },

        // ─────────────────────────────────────────────────────────────
        //  STATE: show result (hien fx blink + pay chip)
        // ─────────────────────────────────────────────────────────────
        _showResult: function () {
            // State SHOW_RESULT co the den GIUA luc tween zoom-out cua _playRevealSequence
            // dang chay. KHONG goi _resetParentTransform() o day (no se stopAllActions()
            // -> kill tween zoom-out -> snap ve vi tri goc, mat smoothness).
            // De tween tu hoan thanh, parent se ve vi tri goc tu nhien.
            if (this.nodeBat) this.nodeBat.active = false;
            this.nodeDia.active = true;
            this.nodeViParent.active = true;
            this.animationBat.node.active = false;
        },

        // Play dealer anim ('bet' khi BETTING, 'idle' cac state khac).
        // Tu cache clip dang play -> tranh restart anim moi state transition.
        _playDealerAnim: function (clipName) {
            if (!this.animationDealer) return;
            if (this._dealerCurrentClip === clipName) return;
            this._dealerCurrentClip = clipName;
            try {
                this.animationDealer.clearTracks();
                this.animationDealer.setToSetupPose();
                this.animationDealer.setAnimation(0, clipName, true);  // loop
            } catch (e) {
                cc.warn('[XXResultView] Dealer anim "' + clipName + '" khong ton tai trong spine.');
            }
        },

        _resetParentTransform: function () {
            if (!this.nodeParentBatDia) return;
            this.nodeParentBatDia.stopAllActions();
            this.nodeParentBatDia.scale = 1;
            var sx = (this._parentStartX != null) ? this._parentStartX : 0;
            var sy = (this._parentStartY != null) ? this._parentStartY : 0;
            this.nodeParentBatDia.setPosition(sx, sy);
        },

        // ─────────────────────────────────────────────────────────────
        //  REVEAL TWEEN SEQUENCE
        //  zoom-in (0.3s) -> slide bat sang ngang + fade (0.4s)
        //  -> dwell (1.5s) -> zoom-out (0.3s) -> an bat sprite
        // ─────────────────────────────────────────────────────────────
        _playRevealSequence: function () {
            var self = this;
            var parent = this.nodeParentBatDia;
            var bat = this.nodeBat;
            if (!parent || !bat) return;

            // Reset cum ve vi tri goc
            parent.stopAllActions();
            parent.scale = 1;
            parent.setPosition(this._parentStartX, this._parentStartY);
            this._resetBatSprite();
            bat.active = true;

            var t1 = this.revealZoomInDuration;     // zoom-in + move to center (1.2s)
            var t2 = this.revealDuration;            // slide bat (1.0s)
            var t3 = this.revealDwellTime;           // dwell (2.0s)
            var t4 = this.revealZoomOutDuration;    // zoom-out + move back (1.2s)

            console.log('[XXResultView] reveal: from (' + this._parentStartX + ',' + this._parentStartY +
                ') -> (' + this.revealMoveToX + ',' + this.revealMoveToY +
                '), scale 1 -> ' + this.revealZoomScale +
                ', t1=' + t1 + 's t2=' + t2 + 's t3=' + t3 + 's t4=' + t4 + 's');

            // (a) Zoom-in + move to center -> dwell -> zoom-out + move back
            //     Easing sineInOut cho ca 2 huong = chuyen dong muot, cham rai 2 dau.
            cc.tween(parent)
                .to(t1, {
                    scale: this.revealZoomScale,
                    position: cc.v2(this.revealMoveToX, this.revealMoveToY)
                }, { easing: 'sineInOut' })
                .delay(t2 + t3)
                .to(t4, {
                    scale: 1,
                    position: cc.v2(this._parentStartX, this._parentStartY)
                }, { easing: 'sineInOut' })
                .start();

            // (b) Sau zoom-in: bat truot sang ngang + fade
            this.scheduleOnce(function () {
                cc.tween(bat)
                    .to(t2, {
                        x: self._batStartX + self.revealSlideX,
                        opacity: 0
                    }, { easing: 'cubicOut' })
                    .call(function () {
                        bat.active = false;
                    })
                    .start();
            }, t1);
        },

        _resetBatSprite: function () {
            if (!this.nodeBat) return;
            this.nodeBat.x = this._batStartX;
            this.nodeBat.y = this._batStartY;
            this.nodeBat.opacity = 255;
            this.nodeBat.stopAllActions();
        },

        // Set sprite frame cho 4 vi theo originResult ("0,1,0,1" - 0=sap, 1=ngua)
        _applyResultToVis: function (originResult) {
            if (!originResult) return;
            var self = this;
            var results = String(originResult).split(',');
            results.forEach(function (r, i) {
                if (i < self.spriteVis.length) {
                    var idx = parseInt(r, 10);
                    if (idx >= 0 && idx < self.sfVis.length) {
                        self.spriteVis[i].spriteFrame = self.sfVis[idx];
                    }
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        //  PAY CHIP FX (giu nguyen logic cu)
        // ─────────────────────────────────────────────────────────────
        playPayFx: function (players, result) {
            var self = this;
            var gateChips = cc.XXController.getInstance().getGateChips();
            var bigGate = parseInt(result.BigGate);
            var smallGate = parseInt(result.SmallGate);

            this.nodeFxResult.active = true;
            this.nodeResult.active = true;
            this.animResult.stop();

            this.nodeChan1.active = false;
            this.nodeChan2.active = false;
            this.nodeChan3.active = false;
            this.nodeLe1.active = false;
            this.nodeLe2.active = false;
            this.nodeLe3.active = false;

            switch (bigGate) {
                case cc.XXGate.EVEN: self.animResult.play('chan_blink'); break;
                case cc.XXGate.ODD:  self.animResult.play('le_blink'); break;
            }
            switch (smallGate) {
                case cc.XXGate.THREE_UP:   self.nodeLe1.active = true; self.nodeLe2.active = true; break;
                case cc.XXGate.THREE_DOWN: self.nodeLe1.active = true; self.nodeLe3.active = true; break;
                case cc.XXGate.FOUR_DOWN:  self.nodeChan1.active = true; self.nodeChan3.active = true; break;
                case cc.XXGate.FOUR_UP:    self.nodeChan1.active = true; self.nodeChan2.active = true; break;
                default:                   self.nodeChan1.active = true;
            }

            var arrGateWin = [bigGate, smallGate];
            var arrGateLose = [];
            gateChips.map(function (gate, index) {
                if (!arrGateWin.includes(index)) arrGateLose.push(index);
            });

            this.fxMoveChip(arrGateLose, cc.XX_FX.LOSE);
            setTimeout(function () {
                self.fxMoveChip(arrGateWin, cc.XX_FX.DEALER_PAY);
            }, 1000);
            setTimeout(function () {
                self.fxMoveChip(arrGateWin, cc.XX_FX.PAY);
            }, 2000);
        },

        fxMoveChip: function (arrGate, typeFx) {
            try {
                var gateChips = cc.XXController.getInstance().getGateChips();
                arrGate.map(function (gateIndex) {
                    if (gateChips[gateIndex] && gateChips[gateIndex].length) {
                        gateChips[gateIndex].forEach(function (chip) {
                            switch (typeFx) {
                                case cc.XX_FX.LOSE:       cc.XXController.getInstance().playFxLost(chip); break;
                                case cc.XX_FX.DEALER_PAY: cc.XXController.getInstance().playFxDealerPay(chip); break;
                                case cc.XX_FX.PAY:        cc.XXController.getInstance().playFxPay(chip); break;
                            }
                        });
                    }
                });
            } catch (e) { /* ignore */ }
        },

        // ─────────────────────────────────────────────────────────────
        //  JACKPOT Hoang Kim Long
        // ─────────────────────────────────────────────────────────────

        // Set label pool. Support ca cc.LabelIncrement (tween) va cc.Label (set string).
        _setJackpotPool: function (pool) {
            if (!this.jackpot) return;
            var val = pool || 0;
            try {
                if (typeof this.jackpot.tweenValueto === 'function') {
                    this.jackpot.tweenValueto(val);
                } else if (this.jackpot.string !== undefined) {
                    this.jackpot.string = cc.Tool.getInstance().formatNumber(val);
                }
            } catch (e) {
                cc.warn('[XXResultView] _setJackpotPool err', e);
            }
        },

        // Server push pool init khi user PlayNow (JACKPOT_INFO)
        updateJackpotPool: function (pool) {
            this._setJackpotPool(pool);
            this._lastJackpotValue = pool;
        },

        // Helper: resolve XXSpinColumView component tu spinCols (co the la Node hoac Component)
        _resolveSpinCols: function () {
            if (!this.spinCols) return [];
            return this.spinCols.map(function (n) {
                if (!n) return null;
                if (typeof n.spin === 'function') return n;
                if (n.getComponent) return n.getComponent(cc.XXSpinColumView);
                return null;
            });
        },

        // Start spin loop - goi khi BETTING bat dau. Spin lien tuc cho den khi SLOT_RESULT.
        _startSpinLoop: function () {
            if (!this.nodeSpinView) {
                console.warn('[XXResultView] _startSpinLoop: nodeSpinView chua gan');
                return;
            }
            if (!this.spinCols || this.spinCols.length === 0) {
                console.warn('[XXResultView] _startSpinLoop: spinCols chua gan');
                return;
            }
            if (this._isSpinning) {
                console.log('[XXResultView] _startSpinLoop: dang spin roi, bo qua');
                return;
            }

            this.nodeSpinView.active = true;
            var direct = this.nodeSpinView.parent;
            if (direct && direct.active === false) direct.active = true;

            var cols = this._resolveSpinCols();
            cols.forEach(function (col, i) {
                if (col && typeof col.spin === 'function') {
                    col.spin(i + 1);
                } else {
                    console.warn('[XXResultView] col[' + i + '] resolve XXSpinColumView fail');
                }
            });
            this._isSpinning = true;
            console.log('[XXResultView] _startSpinLoop: spin start tat ca 4 cot');
        },

        // Server push 4 dice mini-slot sau khi roll (SLOT_RESULT).
        // Logic: spin DA chay tu BETTING -> day chi stop stagger voi ketQua final.
        applySlotResult: function (slot) {
            console.log('[XXResultView] applySlotResult called, slot=', slot);
            if (!slot) { console.warn('[XXResultView] slot null/undefined'); return; }
            try {
                if (!cc.XXSpinController) {
                    console.warn('[XXResultView] cc.XXSpinController KHONG load');
                    return;
                }
                cc.XXSpinController.getInstance().setKetQua([slot.Dice1, slot.Dice2, slot.Dice3, slot.Dice4]);
                cc.XXSpinController.getInstance().setSpinResponse(slot);

                // Edge case: client join mid-game, miss BETTING start -> start spin now
                if (!this._isSpinning) {
                    console.log('[XXResultView] applySlotResult: spin chua start (join giua van) - start now');
                    this._startSpinLoop();
                }

                // Stop stagger
                var self = this;
                var cols = this._resolveSpinCols();
                cols.forEach(function (col, i) {
                    var dur = self.spinDurations[i] != null ? self.spinDurations[i] : (1.5 + i * 0.5);
                    self.scheduleOnce(function () {
                        if (col && typeof col.stop === 'function') {
                            console.log('[XXResultView] stop col[' + i + '] after ' + dur + 's, dice=' + slot['Dice' + (i + 1)]);
                            col.stop();
                        }
                    }, dur);
                });

                // Sau khi cot cuoi stop them 1.5s: clear flag _isSpinning + an spinView (neu khong no)
                var lastDur = this.spinDurations[this.spinDurations.length - 1] || 3.0;
                this.scheduleOnce(function () {
                    self._isSpinning = false;
                    if (!slot.IsJackpot && self.nodeSpinView) {
                        self.nodeSpinView.active = false;
                    }
                    // Neu no hu -> nodeJackPot popup se che len (handle trong applyJackpotHit)
                }, lastDur + 1.5);
            } catch (e) { console.warn('applySlotResult err', e); }
        },

        // Server push khi no hu (JACKPOT_HIT)
        applyJackpotHit: function (hit) {
            if (!hit || !this.nodeJackPot) return;
            try {
                var myId = cc.LoginController.getInstance().getUserId();
                var myAward = 0;
                var winners = hit.Winners || [];
                for (var i = 0; i < winners.length; i++) {
                    if (winners[i].AccountID == myId) { myAward = winners[i].Award; break; }
                }
                if (this.lbJackpot_Hu) {
                    // User trung: show tien user nhan. Khong trung: show tong pool.
                    this.lbJackpot_Hu.string = cc.Tool.getInstance().formatNumber(myAward > 0 ? myAward : (hit.Pool || 0));
                }
                this.nodeJackPot.active = true;
                // Optional: play spine hu
                if (this.animationHu) {
                    try {
                        this.animationHu.clearTracks();
                        this.animationHu.setToSetupPose();
                        this.animationHu.setAnimation(0, 'boom', false);
                    } catch (e) { /* anim 'boom' khong ton tai - ignore */ }
                }
                console.log('[XXResultView] Jackpot hit! pool=' + hit.Pool + ' myAward=' + myAward);
            } catch (e) { console.warn('applyJackpotHit err', e); }
        },
    });
}).call(this);
