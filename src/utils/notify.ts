import iziToast, { IziToastPosition } from "izitoast"

export const notify = {
    success: (message: string, header: string, pos:  IziToastPosition) => {
        const title = header ? header : 'Success'
        const position = pos ? pos : 'topRight'
        iziToast.success({ title, position, message })
    },
    error: (message: string, header: string, pos:  IziToastPosition) => {
        const title = header ? header : 'Error'
        const position = pos ? pos : 'topRight'
        iziToast.error({ title, position, message })
    },
    info: (message: string, header: string, pos:  IziToastPosition) => {
        const title = header ? header : 'Error'
        const position = pos ? pos : 'topRight'
        iziToast.info({ title, position, message })
    },
    warning: (message: string, header: string, pos:  IziToastPosition) => {
        const title = header ? header : 'Warning'
        const position = pos ? pos : 'topRight'
        iziToast.warning({ title, position, message })
    }
}