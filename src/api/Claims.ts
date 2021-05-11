import { Api } from './Api';

export class Claims {
    static all() {
        return Api.get('/claims')
    }
}