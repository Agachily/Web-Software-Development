import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import { bcrypt } from "../../deps.js";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
}

const showRegisterForm = ({ render }) => {
    render("register.eta")
}

const addUser = async ({ request, response, render }) => {
    const body = request.body({ type: "form" })
    const params = await body.value
    const userData = {
        email : params.get("email"),
        password : params.get("password"),
    }
 
    /** Validate the data */
    const [passes, errors] = await validasaur.validate(
        userData,
        userValidationRules,
    );

    if (!passes) {
        userData.validationErrors = errors
        render("register.eta", userData)
    } else {
        await userService.addUser(userData.email, await bcrypt.hash(userData.password))
        response.redirect("/auth/login")
    }
}

export { showRegisterForm, addUser }