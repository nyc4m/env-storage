/**
 * This class provide an entry point to read environment variables.
 * They should all be declared in a Main class for instance,
 * or at the beginning of the application
 */
export class EnvStorage {
    private alias: Map<string, string> = new Map();

    private defaultValues: Map<string, string> = new Map();

    private addAlias(name: string, alias: string): EnvStorage {
        this.alias.set(name, alias);
        return this;
    }

    private envVariables: string[] = [];

    private nameAndValues: Map<string, string> = new Map();

    /**
     * Add a new environment variable to check
     * @param variableName the name of the env variable to look for
     * @param alias an alias to access it during the execution ;)
     * @param defaultValue default value, make the env variable optionnal
     */
    add(variableName: string, alias?: string, defaultValue?: string): void {
        this.envVariables.push(variableName);
        if (alias != undefined) {
            this.alias.set(alias, variableName);
        }
        if (defaultValue != undefined) {
            this.defaultValues.set(variableName, defaultValue);
        }
    }

    /**
     * Check if all the env variables are defined
     * And hydrate a map to safely access environment variable
     */
    check(): void {
        //For all variables
        //Filter for variables that are not defined
        //if the output is not empty => one variable is not defined => return false
        let undefinedEnvVar = this.envVariables.filter(variableName => {
            let envValue =
                process.env[variableName] ||
                this.defaultValues.get(variableName) ||
                '';
            if (envValue === '') {
                return true;
            } else {
                this.nameAndValues.set(variableName, envValue);
                return false;
            }
        });
        if (undefinedEnvVar.length > 0) {
            throw new Error(
                `Environment variables are not set: ${undefinedEnvVar}, please provides values`
            );
        }
    }

    get(variableNameOrAlias: string): string {
        let name =
            this.alias.get(variableNameOrAlias) != undefined
                ? this.alias.get(variableNameOrAlias)
                : variableNameOrAlias;
        let value = this.nameAndValues.get(name!);
        if (value === undefined) {
            throw new Error(`The index '${name}' does not exist.`);
        }
        return value;
    }
}
