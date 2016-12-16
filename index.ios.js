var dialogsCommon = require("ui/dialogs/dialogs-common");

var result;

exports.show = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            if (options) {
                var alert = SDCAlertController.alloc().initWithTitleMessagePreferredStyle(options.title || "", options.message || "", SDCAlertControllerStyle.Alert);

                if (options.nativeView instanceof UIView) {
                    alert.contentView.addSubview(options.nativeView);

                    if(options.nativeView.centerXAnchor) {
                      options.nativeView.translatesAutoresizingMaskIntoConstraints = false;
                      options.nativeView.centerXAnchor.constraintEqualToAnchor(alert.contentView.centerXAnchor).active = true;
                      options.nativeView.topAnchor.constraintEqualToAnchor(alert.contentView.topAnchor).active = true;
                      options.nativeView.bottomAnchor.constraintEqualToAnchor(alert.contentView.bottomAnchor).active = true;
                    } else {
                      var xCenterConstraint = NSLayoutConstraint.constraintWithItemAttributeRelatedByToItemAttributeMultiplierConstant(options.nativeView, NSLayoutAttributeCenterX, NSLayoutRelationEqual, alert.contentView, NSLayoutAttributeCenterX, 1.0, 0);
                      alert.contentView.addConstraint(xCenterConstraint);

                      var yCenterConstraint = NSLayoutConstraint.constraintWithItemAttributeRelatedByToItemAttributeMultiplierConstant(options.nativeView, NSLayoutAttributeCenterY, NSLayoutRelationEqual, alert.contentView, NSLayoutAttributeCenterY, 1.0, 0);
                      alert.contentView.addConstraint(yCenterConstraint);

                      var views = {"newView": options.nativeView};

                      var widthConstraints = NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews("H:[newView(100)]", 0, null, views);
                      alert.contentView.addConstraints(widthConstraints);

                      var heightConstraints = NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews("V:[newView(100)]", 0, null, views);
                      alert.contentView.addConstraints(heightConstraints);
                    }
                }

                if (options.cancelButtonText) {
                    alert.add(SDCAlertAction.alloc().initWithTitleStyleHandler(options.cancelButtonText,
                        SDCAlertActionStyle.Default, function (args) {
                            resolve(false);
                        }));
                }

                if (options.neutralButtonText) {
                    alert.add(SDCAlertAction.alloc().initWithTitleStyleHandler(options.neutralButtonText,
                        SDCAlertActionStyle.Default, function (args) {
                            resolve(undefined);
                        }));
                }

                if (options.okButtonText) {
                    alert.add(SDCAlertAction.alloc().initWithTitleStyleHandler(options.okButtonText,
                        SDCAlertActionStyle.Default, function (args) {
                            resolve(true);
                        }));
                }


                result = {};
                result.resolve = resolve,
                result.dialog = alert;

                if (alert) {
                  var currentPage = dialogsCommon.getCurrentPage();
                  if (currentPage) {
                    var viewController = currentPage.ios;
                    if (viewController) {
                      viewController.presentViewControllerAnimatedCompletion(alert, true, null);
                    }
                  }
                }
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

exports.close = function () {
  if(result){

    if(result.dialog instanceof SDCAlertController){
      result.dialog.dismissAnimatedCompletion(true, null);
    }

    if(result.resolve instanceof Function){
      result.resolve(true);
    }
  }
}
