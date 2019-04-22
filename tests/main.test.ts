import { EnvStorage } from '../src/env-storage';
let storage: EnvStorage;
beforeEach(() => {
    storage = new EnvStorage();
});
it('Read unexisting var', () => {
    storage.add('TeSt1');
    expect(() => {
        storage.check();
    }).toThrow();
});

it('Read one existing var', () => {
    storage.add('TEST1');
    expect(() => {
        storage.check();
    }).not.toThrow();
});

it('Read with no alias', () => {
    storage.add('TEST1');
    storage.check();
    expect(storage.get('TEST1')).toBe('Hello World');
});

it('Read one alias', () => {
    storage.add('TEST1', 'test');
    storage.check();
    expect(storage.get('test')).toBe('Hello World');
});

it('Read default value', () => {
    let value = 'this is a default value';
    storage.add('TEST3', 'test', value);
    storage.check();
    expect(storage.get('test')).toBe(value);
});

it('Read real value, not default', () => {
    let value = 'this is a default value';
    storage.add('TEST1', 'test', value);
    storage.check();
    expect(storage.get('test')).not.toBe(value);
    expect(storage.get('test')).toBe('Hello World');
});

it('Read empty value', () => {
    storage.add('TEST2');
    expect(() => {
        storage.check();
    }).toThrow();
});
