/**
 * Created by Nofear on 6/8/2017.
 */
(function() {
    cc.LocationStatus = cc.Enum({
        AuthorizationStatusNotDetermined: 0, //Chưa hỏi
        AuthorizationStatusRestricted: 1, //Bị hạn chế
        AuthorizationStatusDenied: 2, //Từ chối
        AuthorizationStatusAuthorizedAlways: 3, //Luôn luôn
        AuthorizationStatusAuthorizedWhenInUse: 4, //Khi sử dụng
        LocationServicesDisabled: -99, //Location bị tắt
    });
}).call(this);