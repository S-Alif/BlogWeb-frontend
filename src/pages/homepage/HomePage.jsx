import axios from 'axios';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Cards from '../../components/cards/Cards';
import Navigation from './../../components/navigation/Navigation';
import baseUrl from '../../components/Url';
import Footer from '../../components/footer/Footer';

const HomePage = () => {

  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    let url = baseUrl+"/blogs"

    if(category != ""){
      url = baseUrl+"/blogs/"+category
    }
    
    let newData = async() => {
      await axios.get(url)
        .then(res => {
          setData(res.data['data'])
        })
        .catch(err => console.log(err))
    }
    newData()
  }, [category])

  // search operation
  useEffect(() => {
    (async () => {
      axios.get(baseUrl+'/search/'+ search)
        .then(res => {
          setData(res.data['data'])
        })
    })()
  }, [search])

  return (
    <>

    <Navigation />

      <section className="home">
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center">

          <h1 className='text-light fw-bolder display-1'>BlogWeb</h1>

          <div className="text pt-3">
            <TypeAnimation
              sequence={[
                'Find',
                1000,
                'Read',
                1000,
                'Write',
                1000,
              ]}
              wrapper="p"
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
              className="text-light fs-3 fw-bold"
              cursor={false}
            />

            <p className='d-inline-block text-light fs-3 fw-bold ps-2'>quality blogs</p>
          </div>
        </div>
      </section>

      <section className="blogs py-5 my-5">
        <div className="container">
          <h2 className='fw-bolder fs-2 mt-5 border-bottom border-2 pb-3 mb-4'>Read blogs</h2>

          <div className="row mb-5">
            <div className="col-12">
              <input type="text" className='form-control border border-black' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search...' />
            </div>
            <div className="col-2 mt-4">
              <select className='form-select' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="science">science</option>
                <option value="tech">tech</option>
                <option value="web development">web development</option>
              </select>
            </div>
          </div>

          <div className="row">
            {
              data.map((e, index) => (
                <Cards data={e} key={index} />
              ))
            }
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;