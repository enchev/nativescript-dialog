exports.show = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            if (options) {
                var alert = SDCAlertController.alloc().initWithTitleMessage(NSAttributedString.alloc().initWithString(options.title || ""), NSAttributedString.alloc().initWithString(options.message || ""));

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
                    alert.addAction(SDCAlertAction.alloc().initWithTitleStyleHandler(options.cancelButtonText,
                        AlertActionStyle.Default, function (args) {
                            resolve(false);
                        }));
                }

                if (options.neutralButtonText) {
                    alert.addAction(SDCAlertAction.alloc().initWithTitleStyleHandler(options.neutralButtonText,
                        AlertActionStyle.Default, function (args) {
                            resolve(undefined);
                        }));
                }

                if (options.okButtonText) {
                    alert.addAction(SDCAlertAction.alloc().initWithTitleStyleHandler(options.okButtonText,
                        AlertActionStyle.Default, function (args) {
                            resolve(true);
                        }));
                }

                alert.presentWithAnimatedCompletion(true, null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}
