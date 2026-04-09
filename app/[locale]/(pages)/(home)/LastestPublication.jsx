'use client'
import Tabs from "@/components/common/Tabs";
import Title from "@/components/common/Title";
import styleContainer from '@/sass/components/common/container.module.scss';
import styles from '@/sass/pages/home/lastest-publication.module.scss';
import { ArrowRight, BookOpen, Briefcase, Clock, Eye, MessageSquare, Play } from 'lucide-react';
import { useState } from "react";

const tabs = [
    {
        id: 1,
        icon: <Play />,
        title: 'Videos',
    },
    {
        id: 2,
        icon: <BookOpen />,
        title: 'Courses',
    },
    {
        id: 3,
        icon: <MessageSquare />,
        title: 'Blogs',
    },
    {
        id: 4,
        icon: <Briefcase />,
        title: 'Consultancy',
    },
    {
        id: 5,
        icon: <Briefcase />,
        title: 'Work With Us',
    }
]

const videoData = [
    {
        id: 1,
        title: "What Is The Marketing?",
        description: "Marketing is a vital administrative science globally. Due to its significant developments, the marketing function has become an essential means for businesses to ensure professional success and sustainability in the business environment.",
        duration: "12:45",
        views: "2.5K Views",
        date: "2 days ago",
        thumbnail: "/images/video-thumb.jpg",
    },
]

const Videos = () => {
    return (
        <div>
            {videoData.map((video) => (
                <div key={video.id} className={styles.videoCard}>
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className={styles.videoThumbnail}
                    />
                    <button className={styles.playBtn} aria-label="Play video">
                        <Play />
                    </button>
                    <div className={styles.videoContent}>
                        <h3 className={styles.videoTitle}>{video.title}</h3>
                        <p className={styles.videoDescription}>{video.description}</p>

                        <div className={styles.videoMeta}>
                            <span className={styles.metaItem}>
                                <Clock /> {video.duration}
                            </span>
                            <span className={styles.metaItem}>
                                <Eye /> {video.views}
                            </span>
                            <span className={styles.metaItem}>
                                {video.date}
                            </span>
                        </div>

                        <button className={styles.watchNowBtn}>
                            Watch Now <ArrowRight />
                        </button>
                    </div>

                </div>
            ))}
        </div>
    )
}

const tabContentMap = {
    1: <Videos />,
    // 2: <Courses />,
    // 3: <Blogs />,
    // 4: <Consultancy />,
    // 5: <WorkWithUs />,
}

const LastestPublication = () => {
    const [activeTabId, setActiveTabId] = useState(1)
    return (
        <section>
            <div className={styleContainer.container}>
                <Title title="Latest " span="Publication" />
                <Tabs
                    activeTabId={activeTabId}
                    onTabChange={setActiveTabId}
                    tabs={tabs}
                />
                {tabContentMap[activeTabId]}
            </div>
        </section>
    );
};

export default LastestPublication;