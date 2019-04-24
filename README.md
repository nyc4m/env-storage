# Env-storage
[![Build Status](https://travis-ci.org/nyc4m/env-storage.svg?branch=master)](https://travis-ci.org/nyc4m/env-storage)

**Stop** accessing environment variable from anywhere, there's an other way !

With this package you can register them at the beginning of your code, 
And you will be able to safely access them later :slightly_smiling_face:

### Installation

```
 npm install env-storage 
```

### Overall process
```javascript
let storage = new EnvStorage();
storage.add('MY_VAR')
//.. register more

try {
    storage.check() //checking if all the var are defined
} catch {
    //handle error
}
let value = storage.get('MY_VAR') //safely access the value
```

### Alias
You can define an alias using the second argument of
the `add` method

```javascript
storage.add('MY_PAINFUL_VAR_LONG_NAME', 'dankAlias');
```

### Default value
You can define a default value for the env variable.
If you define a default value, the program won't crash in case the var is not defined and will use de default value

```javascript
storage.add('MIGHT_NOT_BE_DEFINED', 'shorterAlias', 'defaultValue');
```
