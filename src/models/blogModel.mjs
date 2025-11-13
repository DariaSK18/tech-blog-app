const blogs = []

export const findAll = async () => blogs
export const findById = async (id) => blogs.find(b => b.id === id)
export const createBlog = async (data) => {
    const newBlog = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date()
    }
    blogs.push(newBlog)
    return newBlog
}
export const updateById = async (id, patch) => {
    const ind = blogs.findIndex(b => b.id === id)
    if(ind === -1) return null
    blogs[ind] = {...blogs[ind], ...patch, updatedAt: new Date()}
    return blogs[ind]
}
export const deleteById = async (id) => {
    const ind = blogs.findIndex(b => b.id === id)
    if(ind === -1) return null
    const removed = blogs.splice(ind, 1)
    return removed
}