
define ([

    'jquery',
    'backbone',
    'router', 

], function ($, Backbone, Router) {

    // Add truncate ability for String prototype
    String.prototype.trunc = function(n, useWordBoundary) {
        var toLong = this.length>n,
        s_ = toLong ? this.substr(0,n-1) : this;
        s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
        return  toLong ? s_ + '&hellip;' : s_;
    };

    // Add replace a char or string at a position for String prototype
    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    };

    //initalise pubnub
    var pubnub = PUBNUB.init({
        subscribe_key : 'sub-c-077f7902-66ad-11e3-b1d4-02ee2ddab7fe',
        publish_key: 'pub-c-8021207d-c906-4f21-ac84-7d5773c9255b'
    });

    // Add close view ability for Backbone View prototype
    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        if (this.onClose) this.onClose();
    };

    var initialize = function () {

        // Pass in and initialize our Router module
        var router = new Router();
        Backbone.history.start();
    };

    return { initialize: initialize };
});



