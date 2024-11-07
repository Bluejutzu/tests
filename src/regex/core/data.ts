const testTerms = {
    racialSlurs: ["nigga", "nigger", "niggar", "niger", "niga", "nigar", "nikka", "nikar", "nigan", "nikan", "nigeria"],
    derogatory: ["bitch", "moron", "asshole", "retard"]
};

const defaultMatchers = {
    racialSlursMatchers: [
        /\b(n[i1l!|]+[gqk]+[gqka@e3]*[rz]?)\b/,
        /\b(n[i1l!|]+[gqk]+[gqk!@e3]*[rz]?|n[i1l!|]*g[a@]r?|n[i1l!|]*k[a@]r?|n[i1l!|]*g[a@]n?|n[i1l!|]*k[a@]n?|n[i1l!|]*g[a@]?|n[i1l!|]*k[a@]?|n[i1l!|]*[gqk]+)\b/
    ],
    derogatoryMatchers: [/\b(b[i1!|]*tch)\b/, /\b(m[o0]r[o0]n)\b/, /\b(a[s5]sh[o0]le)\b/, /\b(r[e3]tard)\b/],
    channelMatchers: [
        /^https?:\/\/(?:www\.)?discord\.com\/$/,
        /^https?:\/\/(?:www\.)?discord\.com\/(channels|invites|app|users)\/\d+\/\d+\/?\d*$/
    ]
};

const outputs = {
    success: "color:green",
    error: "color:red"
};

export const data = {
    defaultMatchers,
    testTerms,
    outputs
};
