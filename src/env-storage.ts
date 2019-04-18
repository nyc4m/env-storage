/**
 * This class provide an entry point to read environment variables.
 * They should all be declared in a Main class for instance, 
 * or at the beginning of the application
 */
export class EnvStorage {

    private envVariables: string[];
    private nameAndValues: Map<string, string>;

    private static readonly instance = new EnvStorage();

    static get Instance(): EnvStorage {
        return this.instance;
    }

    private constructor() {
        this.envVariables = [];
        this.nameAndValues = new Map();
    }

    /**
     * Add a new environment variable to check
     */
    add(variableName: string): void{
        this.envVariables.push(variableName);
    }

    /**
     * Check if all the env variables are defined
     * And hydrate a map to safely access environment variable
     */
    check(): void {
        //For all variables
        //Filter for variables that are not defined
        //if the output is not empty => one variable is not defined => return false
        let undefinedEnvVar = this.envVariables
        .filter((variableName) => {
            let envValue = process.env[variableName] || '';
            if (envValue === '') {
                return true
            } else {
                this.nameAndValues.set(variableName, envValue);
                return false;
            }
        })
        if (undefinedEnvVar.length > 0 ){
            throw new Error(`Environment variables are not set: ${undefinedEnvVar}, please provides values`);
        }
    }

    get(variableName: string): string {
        let value = this.nameAndValues.get(variableName);
        if (value === undefined) {
            throw new Error(`The index '${variableName}' does not exist.`);
        }
        return value;
    }
}
