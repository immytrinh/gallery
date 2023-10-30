import { useState, useEffect } from 'react';
import './styles.css'
import {Waypoint} from 'react-waypoint'

function App() {
  const [img, setImg] = useState('all')
  const [res, setRes] = useState([])
  const [page, setPage] = useState(1)
  const [hasPage, setHasPage] = useState(true)
  const [last, setLast] = useState('all')
  const Access_Key = '7ctqT5oHVgNvH253s-1qdvGv_uyY_5MNx1-gbgf8ysk'
  //const Access_Key = 'TV3z_Il1OGZR3v_i7WSOOFukA12Z5_K6Bu-Qg5uUxOg'


  useEffect(() => {
    fetchRequest()
  }, [last])

  const fetchRequest = async() => {
    if (!hasPage) return
    const data = await fetch(
      `https://api.unsplash.com/search/photos?&query=${last}&client_id=${Access_Key}&page=${page}&per_page=30`
    )

    const dataJ = await data.json()
    if (dataJ.total === res.length + dataJ.results.length) {
      setHasPage(false)
    }

    const result = dataJ.results
    console.log(result)
    setRes(res.concat(result))
    setPage(page => page + 1)
  }

  const Submit = (temp) => {
    setLast(temp)
    setPage(1)
    setRes([])
    setHasPage(true)
  };

  const LoadMoreData = () => {
    if (page > 1) {
      fetchRequest()
    }
  }

  return (
    <div className='App'>
      <div>
        <input 
          type="text"
          placeholder='Type here to search for photos'
          value={img}
          onChange={(e) => setImg(e.target.value)}/>
        <button onClick={() => Submit(img)}>Search</button>
      </div>
      <div>
        {res.map((val) => {
          return (
            <div id="gallery">
              <img
                key={val.id}
                src={val.urls.small}
                alt="val.alt_description"
              />
            </div>
          );
        })}
        {hasPage && (
          <Waypoint 
            onEnter={LoadMoreData}>
            <h4 className='loading'>Loading...</h4>
          </Waypoint>
        )}
      </div>
    </div>
  )
}

export default App