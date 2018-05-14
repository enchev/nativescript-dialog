interface alertOptions{
    title: string;
    message: string;
    nativeView: object | any;
    cancelButtonText: string;
    neutralButtonText: string;
    okButtonText: string;
    CancelAllowed: boolean;
}

export function show(options: alertOptions);
export function close();