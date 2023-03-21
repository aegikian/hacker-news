import axios from 'axios'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { INews } from '../interfaces/IAllNews'
import './css/NewsPage.css'

export const NewsPage: FC = () => {
    const [news, setNews] = useState<INews>();
    const [comment, setComment] = useState<INews>()
    const [date, setDate] = useState<Date>();
    const params = useParams()
    const ref = useRef<any>(news?.text)
    let [isLoading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        fetchNews()
    }, [])

    
    async function fetchNews() {
      await  axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`)
            .then(function (response) {
                setNews(response.data)
                let date = new Date(response.data.time * 1000)
                setDate(date)
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
        setLoading(true)
        axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${news?.kids}.json`)
            .then(function (response) {
                setComment(response.data)
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





  return isLoading ? (
      <div>
          <div className='link_back_container'>
              <Link to='/' type='button' className='link_back'>Back</Link>
          </div>
          <div>
          <div>{news?.url}</div>
          <h5>{news?.title}</h5>
              <h5>{news?.text}</h5>
          <h5 ref={ref}/>
          <div className='grid_direction'>
             
              <h5>Date: {date?.toLocaleDateString()}</h5>
              <h5>Author: <br /> { news?.by}</h5>
              <h5>{news?.descendants} comment</h5>
              </div>
              <div style={{backgroundColor: 'whitesmoke'}}>
                  <h5>{comment?.text}</h5>
              </div>
              </div>
    </div>
  ) : (
          <h1>Loading...</h1>
  )
}
