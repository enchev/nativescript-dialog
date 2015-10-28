# NativeScript Dialog

A NativeScript plugin for iOS and Android that allows you to create custom dialog.

## Installation
`tns plugin add nativescript-dialog`

## Usage

###
```XML
<Page>
   <StackLayout>
     <Button text="Show dialog" tap="buttonTap" />
   </StackLayout>
</Page>
```

```JavaScript
var platform = require("platform");
var application = require("application");
var dialog = require("nativescript-dialog");

exports.buttonTap = function(args){
  var nativeView;

  if(platform.device.os === platform.platformNames.ios){
	  nativeView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.UIActivityIndicatorViewStyleGray);
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
  ).then(function(r){ console.log("Result: " + r); },
  function(e){console.log("Error: " + e)});
}
```
iOS | Android
------------ | -------------
![iOS](/ios.png) | ![Android](/android.png)
