import Image from 'next/image'
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {getComments, getUsername, postNewComment} from "../../api-client";

const CommentAnswerBox = ({username, sendNewCommentClick}) => {
    const [messageInput, setMessageInput] = useState();
    const onMessageInputChange = (event) => {
        setMessageInput(event.target.value)
    }
    const onMessageInputSubmit = () => {
        const input = messageInput;
        sendNewCommentClick(input);
        setMessageInput(null)
    }
    return (
        <div className="">
            <div className="w-fullbg-white p-2 pt-4 rounded shadow-lg">
                <div className="flex ml-3">
                    <div className="mr-3">
                        <div className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10">
                            <Image height={"100%"} width={"100%"} src="/images/tabler-icon-user.png"
                                   alt="Own User Profile Picture"/>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-semibold mt-3">{username}</h1>
                    </div>
                </div>
                <div className="mt-3 p-3 w-full">
                    <textarea onChange={onMessageInputChange} rows={3} className="border p-2 rounded w-full" placeholder="Seid nett zu einander...">
                        {messageInput}
                    </textarea>
                </div>
                <div className="flex justify-end mx-3">
                    <div>
                        <button
                            onClick={onMessageInputSubmit}
                            className="px-5 py-1 mb-2 bg-gray-800 text-white rounded font-light hover:bg-gray-700">
                            Absenden
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
const CommentBox = ({comment, userId, datetime}) => {
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        async function apiCall() {
            // @ts-ignore
            const anzeigeName = (await getUsername(userId)).anzeigeName;
            console.log(anzeigeName)
            setAuthor(anzeigeName);
        }
        apiCall();
    }, []);
    console.log(author)
    return (
        <div className="flex">
            <div className="flex-shrink-0 mr-3">
                <div className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10">
                    <Image height={"100%"} width={"100%"} src="/images/tabler-icon-user.png"
                           alt="User Profile Picture"/>
                </div>
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{author}</strong>
                <span className="ml-2 text-xs text-gray-400">{new Date(datetime).toLocaleDateString()}</span>
                <p className="text-sm pt-1">
                    {comment}
                </p>
            </div>
        </div>
    );
}
const CommentSection = ({messages}) => {
    return (
        <div className="antialiased max-w-screen-sm mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 mt-3">Kommentare</h3>
            <div className="space-y-4">
                {messages.map((message, index) =>{
                    return <CommentBox key={index} userId={message.from.userId} comment={message.message} datetime={message.createdAt}/>
                })}
            </div>
        </div>
    );
}

export const MessagesTab = ({baumId}) => {
    const session = useSession();
    const [messages, setMessages] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        async function APICall() {
            const messages = await getComments(baumId);
            setMessages(messages);
        }
        APICall();
    }, [isSubmitted]);

    const sendNewCommentClick = async (message) => {
        await postNewComment(baumId, message)
        setIsSubmitted(true);
        // quick fix to reload component
        setTimeout(()=> {
            setIsSubmitted(false);
        })

    }
    return (<>
        <CommentSection messages={messages}/>
        {
            (session.status === "authenticated" && !isSubmitted) &&
            /* anzeigeName is not defined in userObject should be overwritten the type with custom object*/
                //@ts-ignore
            <CommentAnswerBox sendNewCommentClick={sendNewCommentClick} username={session.data.user.anzeigeName}/>
        }
    </>)
}


