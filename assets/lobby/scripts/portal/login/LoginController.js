/**
 * Created by Nofear on 6/21/2017.
 */
import Configs from "../../shootFish/common/Configs";
import BroadcastReceiver from "../../shootFish/common/BroadcastReceiver";

(function () {
    var LoginController;

    LoginController = (function () {
        var instance;

        function LoginController() {
        }

        instance = void 0;

        LoginController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        LoginController.prototype.setLoginView = function (loginView) {
            return this.loginView = loginView;
        };

        LoginController.prototype.setRegisterView = function (registerView) {
            return this.registerView = registerView;
        };

        LoginController.prototype.setForgotPassView = function (forgotPassView) {
            return this.forgotPassView = forgotPassView;
        };

        LoginController.prototype.setNicknameView = function (nicknameView) {
            return this.nicknameView = nicknameView;
        };

        LoginController.prototype.setOTPView = function (otpView) {
            return this.otpView = otpView;
        };

        LoginController.prototype.showLogin = function (enable) {
            return this.loginView.showLogin(enable);
        };

        LoginController.prototype.stayOnTop = function (enable) {
            return this.loginView.stayOnTop(enable);
        };

        LoginController.prototype.showRegister = function (enable) {
            return this.registerView.showRegister(enable);
        };

        LoginController.prototype.showForgotPass = function (enable) {
            return this.forgotPassView.showForgotPass(enable);
        };

        LoginController.prototype.showNickname = function (enable) {
            return this.nicknameView.showNickname(enable);
        };

        LoginController.prototype.showOTP = function (enable) {
            this.otpView.showOTP(enable);

            //this.stayOnTop(!enable);
        };

        LoginController.prototype.getLoginResponse = function () {
            return this.loginResponse;
        };

        LoginController.prototype.setLoginResponse = function (loginResponse) {
            if (Configs && Configs.Login) {
                Configs.Login.Coin = loginResponse.Balance;
            }
            BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
            return this.loginResponse = loginResponse;
        };

        LoginController.prototype.getNextVPResponse = function () {
            return this.nextVPResponse;
        };

        LoginController.prototype.setNextVPResponse = function (nextVPResponse) {
            return this.nextVPResponse = nextVPResponse;
        };

        LoginController.prototype.getUserId = function () {
            return this.userId;
        };

        LoginController.prototype.setUserId = function (id) {
            return this.userId = id;
        };

        LoginController.prototype.setUsername = function (username) {
            if (Configs && Configs.Login) {
                Configs.Login.Username = username;
            }
            return this.username = username;
        };

        LoginController.prototype.getUsername = function () {
            return this.username;
        };

        LoginController.prototype.setNickname = function (nickname) {
            return this.nickname = nickname;
        };

        LoginController.prototype.getNickname = function () {
            return this.nickname;
        };

        LoginController.prototype.setPassword = function (password) {
            if (Configs && Configs.Login) {
                Configs.Login.Password = password;
            }
            return this.password = password;
        };

        LoginController.prototype.getPassword = function () {
            return this.password;
        };

        LoginController.prototype.setLoginState = function (loginState) {
            return this.loginState = loginState;
        };

        LoginController.prototype.getLoginState = function () {
            return !!this.loginState;
        };

        LoginController.prototype.setLoginType = function (loginType) {
            return this.loginType = loginType;
        };

        LoginController.prototype.getLoginType = function () {
            return this.loginType;
        };

        LoginController.prototype.checkLogin = function () {
            if (this.loginState) {
                //ok
                return true;
            } else {
                //chua login
                cc.LobbyController.getInstance().createLoginView();
                this.showRegister(false);
                this.showLogin(true);
                return false;
            }
        };

        LoginController.prototype.getTopVPResponse = function () {
            return this.topVPResponse === undefined ? "0" : this.topVPResponse;
        };

        LoginController.prototype.setTopVPResponse = function (nextVPResponse) {
            return this.topVPResponse = nextVPResponse;
        };

        return LoginController;

    })();

    cc.LoginController = LoginController;

}).call(this);

