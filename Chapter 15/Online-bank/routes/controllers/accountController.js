import * as userService from "../../services/userService.js";

const getAccounts = async ({ response, state, render }) => {
    const authenticated = await state.session.get("authenticated")

    if (!authenticated) {
        response.status = 401
        return
    }

    /** Get the userID from session */
    const userID = (await state.session.get("user")).id
    const res = await userService.getAccounts(userID)
    render("accounts.eta", { accounts: res.rows })
}

const postAccounts = async ({ state, response, request }) => {
    const authenticated = await state.session.get("authenticated")

    if (!authenticated) {
        response.status = 401
        return
    }

    const body = request.body()
    const params = await body.value
  
    const userID = (await state.session.get("user")).id
    const countName = params.get("name")
    await userService.addCount(countName, userID)
    response.redirect("/accounts")
}

const getAccount = async ({ params, render }) => {
    const accountID = params.id
    const res = await userService.getAccount(accountID)
    render("account.eta",  res.rows[0])
}

const deposits = async ({ params, response, request, state }) => {
    const accountID = params.id
    const res = (await userService.getAccount(accountID)).rows[0]
    //console.log(res)
    const currentUserID = (await state.session.get("user")).id
    const storedUserID = res.user_id
    const balance = res.balance

    if ( currentUserID !== storedUserID ) {
        response.status = 401
        return 
    }

    const body = request.body()
    const postParams = await body.value
    const currentAmount = Number(postParams.get("amount")) + Number(balance)
    await userService.deposits(currentAmount, accountID)

    response.redirect("/accounts")
}

const withdraw = async ({ params, response, request, state }) => {
    const accountID = params.id
    const res = (await userService.getAccount(accountID)).rows[0]
    const currentUserID = (await state.session.get("user")).id
    const storedUserID = res.user_id
    const balance = res.balance
    //console.log(currentUserID + " | " + storedUserID)

    const body = request.body()
    const postParams = await body.value
    const currentAmount = Number(balance) - Number(postParams.get("amount"))

    if ( currentUserID !== storedUserID || currentAmount < 0) {
        response.status = 401
        return 
    }

    await userService.deposits(currentAmount, accountID)
    response.redirect("/accounts")
}

export { getAccounts, postAccounts, getAccount, deposits, withdraw}