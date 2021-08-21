import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { MdClose, MdSearch } from 'react-icons/md';
import { Content, Wrapper } from './GifBox.styles';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import useEventListener from '../../hooks/useEventListener';
import { Title } from '../UserLikeBox/UserLikeBox.styles';
const GIFFY_API_KEY = 'Qd732pYgN3hhybxIXLZThsa4hn5UXTSa';
const GifBox = ({ open, onClose, setGif }) => {
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [total_count, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const ref = useRef();

  useEventListener('mousedown', window, (e) => {
    if (!ref.current?.contains(e.target)) {
      setSearch('');
      setData([]);
      setOffset(0);
      setTotalCount(0);
      onClose();
    }
  });

  const handleCloseGif = () => {
    setSearch('');
    setData([]);
    setOffset(0);
    setTotalCount(0);
    onClose();
  };

  const fetchMoreData = async () => {
    const res = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIFFY_API_KEY}&q=${search}&limit=20&offset=${offset}`
    );
    console.log(res.data);
    setData([...data, ...res.data.data]);
    setOffset((offset) => offset + 20);
    setTotalCount(res.data.pagination.total_count);
  };

  const handleSelectGif = (url) => {
    setGif(url);
    setSearch('');
    setData([]);
    setOffset(0);
    setTotalCount(0);
    onClose();
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search && search.trim().length) {
        const res = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${GIFFY_API_KEY}&q=${search}&limit=20`
        );
        console.log(res.data);
        setData(res.data.data);
        setOffset(20);
        setTotalCount(res.data.pagination.total_count);
      }
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return open
    ? ReactDom.createPortal(
        <Wrapper>
          <Content ref={ref}>
            <div className='header'>
              <MdClose className='close' onClick={handleCloseGif} />
              <div className='search'>
                <MdSearch />
                <input
                  type='text'
                  placeholder='Search for GIFs'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            {search && search.trim() ? (
              <div id='scrollableDiv' className='content'>
                <InfiniteScroll
                  dataLength={data.length}
                  next={fetchMoreData}
                  hasMore={offset <= total_count}
                  loader={<p>Loading...</p>}
                  scrollableTarget='scrollableDiv'
                >
                  <div className='abc'>
                    {data.map((el, index) => {
                      return (
                        <img
                          onClick={() =>
                            handleSelectGif(el.images.fixed_height?.url)
                          }
                          key={el.id + index}
                          src={el.images.fixed_height?.url}
                          alt=''
                        />
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            ) : (
              <Title>Type something to search gifs...</Title>
            )}
          </Content>
        </Wrapper>,
        document.getElementById('gif-portal')
      )
    : null;
};

export default GifBox;
