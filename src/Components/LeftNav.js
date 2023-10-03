import React, { useState, useEffect } from "react";
import { Explore, Left_Nav, Subscriptions } from "./Constant";
import styles from '../Components/Common.module.scss';

const LeftNav = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showSecondDiv, setShowSecondDiv] = useState(false);

    const handleNavClick = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 750) {
                setShowSecondDiv(true);
            } else {
                setShowSecondDiv(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={styles.nav_bar}>
            {showSecondDiv && (
                <div className={`${styles.leftNav_container} second-div`}>
                    {Left_Nav.map((nav, index) => (
                        <div key={index}>
                            <div
                                className={activeIndex === index ? styles.inner_nav_active : styles.inner_nav}
                                onClick={() => handleNavClick(index)}
                            >
                                <img src={nav.img} alt={nav.name} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!showSecondDiv && (
                <div className={`${styles.leftNav_container} first-div`}>
                    {Left_Nav.map((nav, index) => (
                        <div key={index}>
                            <div
                                className={activeIndex === index ? styles.inner_nav_active : styles.inner_nav}
                                onClick={() => handleNavClick(index)}
                            >
                                <img src={nav.img} alt={nav.name} />
                                {nav.name}
                            </div>
                            {(index === 2 || index === 7) ? (
                                <div className={styles.line}></div>
                            ) : null}
                        </div>
                    ))}
                    <div>
                        <p className={styles.title}>Subscriptions</p>
                        {Subscriptions.map((nav, index) => (
                            <div key={index}>
                                <div className={activeIndex === index ? styles.inner_nav_active : styles.inner_nav}
                                    onClick={() => handleNavClick(index)}
                                >
                                    <img src={nav.img} alt={nav.name} />
                                    <p>{nav.name}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.line}></div>
                    </div>
                    <div>
                        <p className={styles.title2}>Explore</p>
                        {Explore.map((nav, index) => (
                            <div key={index}>
                                <div className={activeIndex === index ? styles.inner_nav_active : styles.inner_nav}
                                    onClick={() => handleNavClick(index)}
                                >
                                    <img src={nav.img} alt={nav.name} />
                                    <p>{nav.name}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.line}></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LeftNav;
