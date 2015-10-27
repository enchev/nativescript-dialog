var platform = require("platform");
var application = require("application");
var dialog = require("nativescript-dialog");

exports.showLoadingDialog = function(args){
  var nativeView;

  if(platform.device.os === platform.platformNames.ios){
	nativeView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.UIActivityIndicatorViewStyleGray);
    nativeView.translatesAutoresizingMaskIntoConstraints = false;
    nativeView.startAnimating();
  } else if(platform.device.os === platform.platformNames.android){
	nativeView = new android.widget.ProgressBar(application.android.currentContext);
    nativeView.setIndeterminate(true);
  }

  dialog.show({
	title: "Loading...",
	message: "Please wait!",
	cancelButtonText: "Cancel",
	nativeView: nativeView}
  ).then(function(r){
    // Cancel loading here
  },
  function(e){
    dialog.show({title: "Error", message: "Error: " + e, okButtonText: "Close"});
  });
}

exports.showCustomSwitchDialog = function(args){
  var options = {
  	title: "My Custom Dialog",
  	message: "Please use the switch to turn something on/off",
    okButtonText: "Ok",
  	cancelButtonText: "Cancel",
  	nativeView: platform.device.os === platform.platformNames.ios ? new UISwitch() : new android.widget.Switch(application.android.currentContext)
  };

  dialog.show(options).then(
    function(r){
      if(r){
        dialog.show({
          title: "Result",
          message: "You've pressed OK button and the switch is " +
            ((platform.device.os === platform.platformNames.ios) ? options.nativeView.on : options.nativeView.isChecked()) ? "checked" : "not checked"),
          okButtonText: "Close"
        });
      } else {
        dialog.show({title: "Result", message: "You've pressed Cancel button", okButtonText: "Close"});
      }

    },
    function(e){
      dialog.show({title: "Error", message: "Error: " + e, okButtonText: "Close"});
    }
  );
}
