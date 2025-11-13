const users = []

export const findAll = async () => users
export const findById = async (id) => users.find(b => b.id === id)
export const createUser = async (data) => {
    const newUser = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date()
    }
    users.push(newUser)
    return newUser
}
export const updateById = async (id, patch) => {
    const ind = users.findIndex(b => b.id === id)
    if(ind === -1) return null
    users[ind] = {...users[ind], ...patch, updatedAt: new Date()}
    return users[ind]
}
export const deleteById = async (id) => {
    const ind = users.findIndex(b => b.id === id)
    if(ind === -1) return null
    const removed = users.splice(ind, 1)
    return removed
}