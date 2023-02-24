export interface Key {
    privateKey: string;
    publicKey: string;
}

export interface KeyDoc {
    key: Key;
    last_updated: Date;
}
