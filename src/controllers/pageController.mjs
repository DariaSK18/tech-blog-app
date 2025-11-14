export const homePage = (req, res) => {
    res.render('index', {title: 'Home'})
}
export const loginPage = (req, res) => {
    res.render('login', {title: 'Login'})
}
export const registerPage = (req, res) => {
    res.render('register', {title: 'Register'})
}
export const profilePage = (req, res) => {
    res.render('profile', {title: 'Profile'})
}