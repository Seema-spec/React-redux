import React, { useEffect, useState, useRef } from 'react';
import styles from '../Components/Common.module.scss';
import Icon from '../assets/youtube.png'
import { Videos } from './Constant';
import Pagination from './Pagination';
import LeftNav from './LeftNav';



const VideoListing = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subHeader, setSubHeader] = useState([
    { text: 'All', isActive: true },
    { text: 'Music', isActive: false },
    { text: 'Arijit Singh', isActive: false },
    { text: 'Lo fi', isActive: false },
    { text: 'Live', isActive: false },
    { text: 'Mixes', isActive: false },
    { text: 'Jukebox', isActive: false },
    { text: 'News', isActive: false },
    { text: 'Mantras', isActive: false },
    { text: 'Latest Song', isActive: false },
    { text: 'Pop Music', isActive: false },
    { text: 'Poem', isActive: false },
    { text: 'Story', isActive: false },
    { text: 'Shorts', isActive: false },
    { text: 'Mantras', isActive: false },
    { text: 'Story', isActive: false },
  ]);

  useEffect(() => {
    setSearchResults(Videos);
  }, [])

  const handleSearch = () => {
    const regex = new RegExp(query, 'i');
    if (query === '') {
      setSearchResults(Videos);
    } else{
      const results = Videos.filter((video) => regex.test(video.title));
      setSearchResults(results);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const regex = new RegExp(query, 'i');
    if (query === '') {
      setSearchResults(Videos);
    } else {
      const results = Videos.filter((video) => regex.test(video.title));
      setSearchResults(results);
    }
    setCurrentPage(1);
  }, [query]);

  const videoRef = useRef(null);

  const handleHeaderClick = (index) => {
    const updatedSubHeader = [...subHeader];
    updatedSubHeader.forEach((header) => {
      header.isActive = false;
    });
    updatedSubHeader[index].isActive = true;
    setSubHeader(updatedSubHeader);
  };

  const ITEMS_PER_PAGE = 6;
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIdx = startIdx + ITEMS_PER_PAGE;

  const currentResults = searchResults.slice(startIdx, endIdx);
  console.log(currentResults);
  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };



  return (
    <div className={styles.container}>
      <div className={styles.top_header}>
        <div className={styles.Header}>
          <div className={styles.bars_icon}>
            <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
            <img src={Icon} alt='' />
          </div>
          <div className={styles.middle_header}>
            <div className={styles.search_box}>
              <input
                type="text"
                placeholder="Search for videos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleSearch} >Search</button>
            </div>
            <div className={styles.microphone}>
              <i class="fa fa-microphone fa-lg" aria-hidden="true"></i></div>
          </div>
          <div className={styles.right_icon}>
            <i class="fa fa-video-camera fa-lg" aria-hidden="true"></i>
            <i class="fa fa-bell fa-lg" aria-hidden="true"></i>
            <div className={styles.profile}>
              <p>S</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className={styles.middle_container}>
        <LeftNav />
        <div className={styles.right_container}>
          <div className={styles.sub_header} >
            {subHeader.map((header, index) => (
              <div
                key={index}
                className={header.isActive ? styles.sub_header_text_active : styles.sub_header_text}
                onClick={() => handleHeaderClick(index)}
              >
                <div style={{ width: "max-content" }}> {header.text}
                </div>

              </div>
            ))}
          </div>
          {currentResults.length > 0 ?
            (
              <div className={styles.card}>
                {currentResults.map((data) => (
                  <div className={styles.card_box}>
                    <video className={styles.banner_img} width="100%" controls ref={videoRef} muted preload="auto">
                      <source src={data?.img} type="video/mp4" />
                      <div className={styles.video_overlay}>
                        <span className={styles.play_text}>Play</span>
                      </div>
                    </video>
                    <div className={styles.video_content}>
                      <div className={styles.video_title}>
                        <div className={styles.img_icon}>
                          <img src={data.img1} alt='' />
                        </div>
                      </div>
                      <div className={styles.card_bottom}>
                        <p>{data.title}</p>
                        {data.genre}
                        <div className={styles.card_bottom_text}>
                          <div>{data.views} </div>
                          <div className={styles.dot} />
                          <div>{data.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
            :
            (
              <div className={styles.card}>
                {Videos.map((data) => (
                  <div className={styles.card_box}>
                    <video className='banner-img' width="100%" autoPlay ref={videoRef} muted preload="auto">
                      <source src={data?.img} type="video/mp4" />
                    </video>
                    <div className={styles.video_content}>
                      <div className={styles.video_title}>
                        <div className={styles.img_icon}>
                          <img src={data.img1} alt='' />
                        </div>
                      </div>
                      <div className={styles.card_bottom}>
                        <p>{data.title}</p>
                        {data.genre}
                        <div className={styles.card_bottom_text}>
                          <div>{data.views} </div>
                          <div className={styles.dot} />
                          <div>{data.time}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )

          }

        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>


  )
}

export default VideoListing;
