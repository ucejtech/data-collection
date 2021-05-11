import { Api } from './Api';

export class AccountsApi {
    static all() {
        return Api.get('/accounts')
    }

    static partial(page:number, limit: number) {
        return Api.get(`/accounts?_page=${page}&_limit=${limit}`)
    }
    static getAccountClaims(id: string, page: number, limit: number) {
        return Promise.all([
            Api.get(`/accounts/${id}`),
            Api.get(`/accounts/${id}/claims?_page=${page}&_limit=${limit}`)
        ])
    }
    static findEmail(email: string) {
        return Api.get(`/accounts?debtor.email=${email}`)
    }
}