export function providerFactory<T>(map: Record<string, T>, defaultProvider: T): T {
    const env = process.env.NEXT_PUBLIC_ENV || "local";
    return map[env] || defaultProvider;
}