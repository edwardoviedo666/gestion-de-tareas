// infrastructure/providers/environment.provider.ts
export enum EnvironmentEnum {
    Local = "local",
    Development = "development",
    Production = "production",
}

export class EnvironmentProvider {
    static getEnvironment(): EnvironmentEnum {
        const env = process.env.NODE_ENV as EnvironmentEnum;

        if (env === EnvironmentEnum.Production) return EnvironmentEnum.Production;
        if (env === EnvironmentEnum.Development) return EnvironmentEnum.Development;
        return EnvironmentEnum.Local;
    }

    static isProduction(): boolean {
        return this.getEnvironment() === EnvironmentEnum.Production;
    }

    static isDevelopment(): boolean {
        return this.getEnvironment() === EnvironmentEnum.Development;
    }

    static isLocal(): boolean {
        return this.getEnvironment() === EnvironmentEnum.Local;
    }
}
