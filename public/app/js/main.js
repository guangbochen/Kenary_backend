
// app bootstrap for configuring Require.js and loading initally important dependencies
require.config ({
    waitSeconds : 15,
    paths: {
        jquery     : 'vendor/jquery/dist/jquery.min',
        underscore : 'vendor/underscore-amd/underscore-min',
        backbone   : 'vendor/backbone-amd/backbone-min',
        syphon     : 'vendor/tidepool-backbone.syphon/lib/amd/backbone.syphon.min',
        text       : 'vendor/requirejs-text/text',
        d3         : 'vendor/d3/d3.min',
        nvd3       : 'vendor/nvd3/nv.d3',
        alertify   : 'vendor/alertify.js/lib/alertify.min',
        switch     : 'vendor/bootstrap-switch/build/js/bootstrap-switch.min',
        pubnub     : 'vendor/pubnub/web/pubnub.min',
        // parsley        : 'vendor/parsleyjs/dist/parsley.min',
        // bootstrap      : 'vendor/bootstrap/dist/js/bootstrap.min',
        // async          : 'vendor/requirejs-plugins/src/async',
        // ladda          : 'vendor/ladda/dist/ladda.min',
        // spin           : 'vendor/ladda/dist/spin.min',
        // maskedinput    : 'vendor/jquery-maskedinputs/dist/jquery.maskedinput.min',
        // timepicker     : 'vendor/jt.timepicker/jquery.timepicker.min',
        // fancybox       : 'vendor/fancybox/source/jquery.fancybox.pack',
    }
});

require ([ 

    // Load our app module and pass it to our definition function
    'app',
], function (App) {

    // The "app" dependency is passed in as "App"
    App.initialize();
});
