'use client'
import { useState } from "react";
import { ArrowRight, BookOpen, Briefcase, Clock, Eye, MessageSquare, Play } from 'lucide-react';
import Tabs from "@/components/common/Tabs";
import Title from "@/components/common/Title";
import styleContainer from '@/sass/components/common/container.module.scss';
import styles from '@/sass/pages/home/lastest-publication.module.scss';
import { useTranslations } from "next-intl";

const videoData = [
    {
        id: 1,
        title: "What Is The Marketing?",
        description: "Marketing is a vital administrative science globally. Due to its significant developments, the marketing function has become an essential means for businesses to ensure professional success and sustainability in the business environment.",
        duration: "12:45",
        views: "2.5K Views",
        date: "2 days ago",
        thumbnail: "/asstes/logo.png",
    },
]

const Videos = ({ watchNow }) => {
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
                            {watchNow} <ArrowRight />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const LastestPublication = () => {
    const t = useTranslations('LatestPublication');
    const [activeTabId, setActiveTabId] = useState(1);

    const tabs = [
        { id: 1, icon: <Play />, title: t('tabs.videos') },
        { id: 2, icon: <BookOpen />, title: t('tabs.courses') },
        { id: 3, icon: <MessageSquare />, title: t('tabs.blogs') },
        { id: 4, icon: <Briefcase />, title: t('tabs.consultancy') },
        { id: 5, icon: <Briefcase />, title: t('tabs.workWithUs') },
    ];

    const tabContentMap = {
        1: <Videos watchNow={t('watchNow')} />,
    };

    return (
        <section>
            <div className={styleContainer.container}>
                <Title title={t('title')} span={t('titleSpan')} />
                <Tabs
                    activeTabId={activeTabId}
                    onTabChange={setActiveTabId}
                    tabs={tabs}
                    className={styles.publicationTabs}
                    tabClassName={styles.publicationTab}
                />
                {tabContentMap[activeTabId]}
            </div>
        </section>
    );
};

export default LastestPublication;
