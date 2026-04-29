"use client";
import { useState } from "react";
import { Inbox, Mail, Calendar, Clock, CheckCheck } from "lucide-react";
import styles from "@/sass/pages/my-profile/my-profile.module.scss";

const initialMessages = [
    {
        id: 1,
        type: "announcement",
        title: "Welcome to British Academy!",
        from: "British Academy Admin (admin)",
        date: "2025-01-10",
        isRead: true,
    },
    {
        id: 2,
        type: "announcement",
        title: "New Module Available - Project Management",
        from: "British Academy Admin (admin)",
        date: "2025-01-10",
        isRead: true,
    },
    {
        id: 3,
        type: "announcement",
        title: "Your Digital Marketing Certificate is Ready!",
        from: "British Academy Admin (admin)",
        date: "2025-01-10",
        isRead: false,
    },
];

const Messages = () => {
    const [messages, setMessages] = useState(initialMessages);

    const markAsRead = (id) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
        );
    };

    return (
        <div>
            <div className={styles.msgsHeader}>
                <h2>Messages</h2>
                <div className={styles.msgCount}>
                    <Mail size={14} />
                    <span>{messages.length} Message(s)</span>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className={styles.noMsgs}>
                    <Inbox size={40} />
                    <span>No messages yet</span>
                </div>
            ) : (
                <div className={styles.msgList}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.msgCard} ${!msg.isRead ? styles.unread : ""}`}
                        >
                            <div className={styles.msgIconArea}>
                                <Inbox size={30} />
                            </div>

                            <div className={styles.msgContent}>
                                <span className={styles.msgBadge}>{msg.type}</span>

                                <h3 className={styles.msgTitle}>{msg.title}</h3>
                                <p className={styles.msgFrom}>From: {msg.from}</p>

                                <div className={styles.msgMeta}>
                                    <span className={styles.msgMetaItem}>
                                        <Calendar size={12} />
                                        Date: {msg.date}
                                    </span>
                                    <span
                                        className={`${styles.msgMetaItem} ${
                                            msg.isRead ? styles.statusRead : styles.statusUnread
                                        }`}
                                    >
                                        <Clock size={12} />
                                        Status: {msg.isRead ? "Read" : "Unread"}
                                    </span>
                                </div>

                                <div className={styles.msgActions}>
                                    <button className={styles.btnViewMsg}>
                                        <Mail size={14} />
                                        View Message
                                    </button>
                                    <button
                                        className={`${styles.btnMarkRead} ${msg.isRead ? styles.alreadyRead : ""}`}
                                        onClick={() => !msg.isRead && markAsRead(msg.id)}
                                        disabled={msg.isRead}
                                    >
                                        <CheckCheck size={14} />
                                        Mark as Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;
