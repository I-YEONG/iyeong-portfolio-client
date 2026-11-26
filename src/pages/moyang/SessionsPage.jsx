import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ServerPersonalProgram } from '@/features/moyang/personal-program/ServerPersonalProgram';
import styles from '@/features/moyang/personal-program/PersonalProgram.module.css';
import { useMockStorageScope } from '@/features/moyang/hooks/useMockStorageScope';
export const SessionsPage = () => {
    const { key, state } = useLocation();
    const storageScope = useMockStorageScope();
    const pageRef = useRef(null);
    useLayoutEffect(() => {
        pageRef.current?.scrollIntoView({ block: 'start' });
    }, [key]);
    return (<div className={styles.route} ref={pageRef}>
      <ServerPersonalProgram key={`${key}:${storageScope}`} scope={storageScope} reflection={state?.firstReflection} savedActivity={state?.savedActivity}/>
    </div>);
};
