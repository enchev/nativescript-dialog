import * as application from "application";
let result;

declare var android;
interface alertOptions{
    title: string;
    message: string;
    nativeView: object | any;
    cancelButtonText: string;
    neutralButtonText: string;
    okButtonText: string;
    CancelAllowed: boolean;
}

export function show(options: alertOptions) {
    return new Promise(function (resolve, reject) {
        try {
            if (options) {
                var alert = new android.app.AlertDialog.Builder(application.android.currentContext);

                if (options.title) {
                    alert.setTitle(options.title);
                }

                if (options.message) {
                  alert.setMessage(options.message);
                }


                if (options.nativeView instanceof android.view.View) {
                    alert.setView(options.nativeView);
                }

                if (options.cancelButtonText) {
                    alert.setNegativeButton(options.cancelButtonText, new android.content.DialogInterface.OnClickListener({
                      onClick: function (dialog, id) {
                          dialog.cancel();
                          resolve(false);
                      }
                    }));
                }

                if (options.neutralButtonText) {
                    alert.setNeutralButton(options.neutralButtonText, new android.content.DialogInterface.OnClickListener({
          						onClick: function (dialog, id) {
          							dialog.cancel();
          							resolve(undefined);
          						}
          					}));
                }

                if (options.okButtonText) {
                    alert.setPositiveButton(options.okButtonText, new android.content.DialogInterface.OnClickListener({
          						onClick: function (dialog, id) {
          							dialog.cancel();
          							resolve(true);
          						}
          					}));
                }

                result = {};
                result.resolve = resolve,
                result.dialog = alert.show();
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function close() {
  if(result){

    if(result.dialog instanceof android.app.AlertDialog){
      result.dialog.cancel();
    }

    if(result.resolve instanceof Function){
      result.resolve(true);
    }
  }
}
