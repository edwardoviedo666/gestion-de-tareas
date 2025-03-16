import {EnvironmentEnum} from "app/infraestructure/providers/environment.enum";

export function providerFactory<T>(map: Record<string, T>, defaultProvider: T): T {
    const env = process.env.NEXT_PUBLIC_ENV || EnvironmentEnum.Local;
    return map[env] || defaultProvider;
}