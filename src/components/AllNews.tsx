import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { INews } from '../interfaces/IAllNews'
import './css/AllNews.css'
import { News } from './News';

export const AllNews = () => {
    const [news, setNews] = useState<INews[]>([]);
    const [date, setDate] = useState<Date[]>([]);
    let indexes: number[];
    let [ready, setReady] = useState<boolean>(false)

    const history = useNavigate()


    useEffect(() => {
      fetchNews()
    }, [])

    // I don't have access to the full news list,
    // knowingly using the wrong solution

    async function fetchNews() {
         await axios
            .get(`https://hacker-news.firebaseio.com/v0/newstories.json?limit=100`,)
            .then(function (response) {
                indexes = response.data;
            })
            .catch((error) => {
              if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
            })
        for (let i = 0; i <= 100; i++) {
            await axios
                .get(`https://hacker-news.firebaseio.com/v0/item/${indexes[i]}.json?print=pretty`,)
                .then(function (response) {
                    setNews(prevState => {
                        let news = [...prevState];
                        news[i] = (response.data);
                        return news;
                    })
                    setDate(prevState => {
                        let date = [...prevState];
                        date[i] = (new Date(response.data.time * 1000));
                        return date;
                    })
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                })
        }
        setReady(true);
    }

    setInterval(() => {
            fetchNews()
    }, 6000000)

     return !ready ? (
        <div>
            <button onClick={fetchNews} className='button_update'>Update</button>
            {news.map((print, i) => (
                <News
                    key={print.id}
                news={news[i]}
                date={date[i]}
                onClick={() => history('/news/' + news[i]?.id)}
                />
            ))
            }
         </div>
     ) : (
             <h1>Loading...</h1>
    )
}
