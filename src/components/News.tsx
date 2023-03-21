import { FC } from 'react'
import { INews } from '../interfaces/IAllNews'

interface New {
    news?: INews;
    onClick?: (news?: INews) => void;
    date?: Date;
}

export const  News: FC<New> = ({news, onClick, date}) => {
  return (
      <div onClick={() => onClick?.(news)}>
          <div className='news_one'>
              {news?.title}
              <div className='grid_direction'>
                  <h5>Author: <br /> {news?.by}</h5>
                  <h5>{news?.score}&#128077;</h5>
                  <h5>Published on: <br /> {date?.toLocaleDateString()}</h5>
                  </div>
              </div>
      </div>
  )
}
