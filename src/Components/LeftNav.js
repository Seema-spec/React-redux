import React, { useState, useEffect } from "react";
import { Explore, Left_Nav, Subscriptions } from "./Constant";
import styles from '../Components/Common.module.scss';

const LeftNav = () => {
    const [activeIndexLeftNav, setActiveIndexLeftNav] = useState(null);
    const [activeIndexSubscriptions, setActiveIndexSubscriptions] = useState(null);
    const [activeIndexExplore, setActiveIndexExplore] = useState(null);

    const handleNavClick = (index, section) => {
        switch (section) {
            case 'leftNav':
                setActiveIndexLeftNav(index);
                break;
            case 'subscriptions':
                setActiveIndexSubscriptions(index);
                break;
            case 'explore':
                setActiveIndexExplore(index);
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.nav_bar}>
            <div className={`${styles.leftNav_container} first-div`}>
                {/* LeftNav section */}
                {Left_Nav.map((nav, index) => (
                    <div key={index}>
                        <div
                            className={activeIndexLeftNav === index ? styles.inner_nav_active : styles.inner_nav}
                            onClick={() => handleNavClick(index, 'leftNav')}
                        >
                            <img src={nav.img} alt={nav.name} />
                            {nav.name}
                        </div>
                        {(index === 2 || index === 7) ? (
                            <div className={styles.line}></div>
                        ) : null}
                    </div>
                ))}

                {/* Subscriptions section */}
                <div>
                    <p className={styles.title}>Subscriptions</p>
                    {Subscriptions.map((nav, index) => (
                        <div key={index}>
                            <div className={activeIndexSubscriptions === index ? styles.inner_nav_active : styles.inner_nav}
                                onClick={() => handleNavClick(index, 'subscriptions')}
                            >
                                <img src={nav.img} alt={nav.name} />
                                <p>{nav.name}</p>
                            </div>
                        </div>
                    ))}
                    <div className={styles.line}></div>
                </div>

                {/* Explore section */}
                <div>
                    <p className={styles.title2}>Explore</p>
                    {Explore.map((nav, index) => (
                        <div key={index}>
                            <div className={activeIndexExplore === index ? styles.inner_nav_active : styles.inner_nav}
                                onClick={() => handleNavClick(index, 'explore')}
                            >
                                <img src={nav.img} alt={nav.name} />
                                <p>{nav.name}</p>
                            </div>
                        </div>
                    ))}
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    )
}

export default LeftNav;
