export const loadFromLocalStorage = <T>(storageName: string): T | undefined => {
    try {
        const serializedState = localStorage.getItem(storageName);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};

export const saveToLocalStorage = <T>(state: T, storageName: string): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(storageName, serializedState);
    } catch (e) {
        console.warn(e);
    }
};
