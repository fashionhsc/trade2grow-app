const tryCatch = (fn, setLoading) => {
    return async function (...args) {
        try {
            await fn(...args);
        } catch (error) {
            console.error('❌ Error in tryCatch:', error);
        } finally {
            if (setLoading && typeof setLoading === 'function') {
                setLoading(false);
            }
        };
    }
}


export default tryCatch;