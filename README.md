# Env-storage

**Stop** accessing environment variable from anywhere, there's an other way !

With this package you can register them at the beginning of your code, 
And you will be able to safely access them later :slightly_smiling_face:

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
