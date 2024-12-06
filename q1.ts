function watch(
    obj: Object,
    getCallback: (key, value) => void | undefined,
    setCallback: (key, value) => void | undefined
) {
    return new Proxy(obj, {
        get(target, property, receiver) {
            if (property in target) {
                getCallback(property, '');
            }
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            const hadProperty = property in target;
            const result = Reflect.set(target, property, value, receiver);
            if (!hadProperty || target[property] !== value) {
                setCallback(property, value);
            }
            return result;
        }
    });
}

const obj: Record<string, any> = {};
const watchedObj: Record<string, any> = watch(
obj,
(key, value) => console.log('property accessed: ', key),
(key, value) => console.log('property modified: ', key, value)
)
watchedObj.foo;
watchedObj.foo = true;
watchedObj.foo;