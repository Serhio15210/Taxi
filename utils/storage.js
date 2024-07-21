export const saveToken = (token) => {
    try {
        if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)}
    } catch(err) {
        console.log(err)
    }
}

export const loadToken = () => {
    try {
        if (typeof window !== 'undefined') {
        const serializedState = localStorage.getItem('token')
        if (serializedState === null) {
            return undefined
        }
        return serializedState}
    } catch (err) {
        console.log(err)
        return undefined
    }
}

export const removeToken = () => {
    try {
      localStorage.removeItem('token')
    } catch(err) {
        console.log(err)
    }
}
