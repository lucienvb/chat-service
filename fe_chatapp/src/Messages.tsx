import React from "react"

export default function MessageInput({ messages }: { messages: string[] }) {
    return (
    <div>
        {messages.map((message, index) => (
            <div key={index}>{message}</div>
        ))}
    </div>
    )
}