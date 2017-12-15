export const sendMessage = ((msgobj) => {
    return {
        type: 'SEND_MESSAGE',
        payload: msgobj
    }
})

