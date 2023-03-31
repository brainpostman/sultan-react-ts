// export default function deepCopyMap<K, V>(map: Map<K, V>): Map<K, V> {
//     let cloneMap = new Map<K, V>();
//     for (let [key, value] of map.entries()) {
//         cloneMap.set(key, Object.assign({}, value));
//     }

//     return cloneMap;
// }

export default function deepCopyMap<K, V>(map: Map<K, V>): Map<K, V> {
    let cloneMap = new Map<K, V>();
    for (let [key, value] of map.entries()) {
        cloneMap.set(key, JSON.parse(JSON.stringify(value)));
    }

    return cloneMap;
}
