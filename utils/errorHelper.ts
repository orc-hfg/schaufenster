import { ref } from "vue"

export const errorHelper = () => {

    const defaultResetTime = 10000
    const error_msg = ref('')
    const ok_msg = ref('')
    

    const handle_error = (msg:string, error:any) => {
        const mmsg = 'ERROR: ' + msg + ' error: ' + JSON.stringify(error)
        console.error(mmsg)
        error_msg.value = mmsg
    }

    const handle_http_error = (msg:string, error:Response) => {
        const mmsg = 'ERROR: ' + msg + ' status: ' + error.status
        console.error(mmsg)
        error_msg.value = mmsg
    }

    const reset_error = () => { error_msg.value = '' }
    const reset_ok = () => { ok_msg.value = '' }

    const timed_handle_error = (msg: string, error: any, msecs?:number) => {
        msecs = msecs || defaultResetTime
        handle_error(msg, error)
        setTimeout(() => {
            reset_error()
        },msecs) 
    }

    const timed_handle_ok = (msg: string, msecs?:number) => {
        msecs = msecs || defaultResetTime
        ok_msg.value = msg
        setTimeout(() => {
            reset_ok()
        },msecs) 
    }


    return {
        error_msg,
        ok_msg,
        handle_error,
        handle_http_error,
        reset_error,
        reset_ok,
        timed_handle_error,
        timed_handle_ok

    }
}