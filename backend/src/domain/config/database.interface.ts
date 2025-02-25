export interface DatabaseConfig {
    getDatabaseURL(): string;
    getDatabaseSync(): boolean;
}
