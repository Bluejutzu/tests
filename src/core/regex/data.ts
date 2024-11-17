const defaultMatchers = {
    racialSlursMatchers: [
        /\b(n[i1l!|]+[gqk]+[gqka@e3]*[rz]?)\b/,
        /\b(n[i1l!|]+[gqk]+[gqk!@e3]*[rz]?|n[i1l!|]*g[a@]r?|n[i1l!|]*k[a@]r?|n[i1l!|]*g[a@]n?|n[i1l!|]*k[a@]n?|n[i1l!|]*g[a@]?|n[i1l!|]*k[a@]?|n[i1l!|]*[gqk]+)\b/,
        /\b(nega|negga|n[i1l!|]*gga)\b/i
    ],
    derogatoryMatchers: [
        /\b(b[i1!|]*tch)\b/,
        /\b(m[o0]r[o0]n)\b/,
        /\b(a[s5]sh[o0]le)\b/,
        /\b(r[e3]tard)\b/,
        /\b(m[i1l!|]*dget)\b/i,
        /\b(f[a@][gqk]{2}[o0t]+)\b/i
    ],
    channelMatchers: [
        /^https?:\/\/(?:www\.)?discord\.com\/?\d*$/,
        /^https?:\/\/(?:www\.)?discord\.com\/(channels|invites|app|users)\/\d+\/\d+\/?\d*$/
    ]
};

const outputs = {
    success: "color:green",
    error: "color:red"
};

export const data = {
    defaultMatchers,
    outputs
};
