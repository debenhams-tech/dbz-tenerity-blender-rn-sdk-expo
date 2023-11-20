export type Banner = {
    id: string;
    active: boolean;
    t: string;
    r: string;
    b: string;
    l: string;
    w: string;
    h: string;
    url: string;
    html: string;
    target: '_blank' | '_parent';
    timeout: number;
    zIndex: number;
    closeOnClick: boolean;
    showInContainer: boolean;
};
