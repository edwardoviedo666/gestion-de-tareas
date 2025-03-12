import {EnvironmentEnum} from "./enums/environment.enum";

export function providerFactory<T>(providers: Record<EnvironmentEnum, T>): T {
    const env = (process.env.NEXT_PUBLIC_ENV as EnvironmentEnum) || EnvironmentEnum.Local;
    return providers[env];
}
