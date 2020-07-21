import * as io from "socket.io-client";
import { chatMessages } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("addChatMsg", (msg) => {
            console.log(
                `Got a msg in the client! I'm abt to statrt the WHOLE REDUX PROCESS by dispatching here ${msg}`
            );
        });

        socket.on("chatMessages", (msgs) => {
            console.log("this is our lassst msgsss", msgs);
            store.dispatch(chatMessages(msgs));
        });
        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
    }
};
