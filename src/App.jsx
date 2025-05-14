import './App.css'
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaLocationDot, FaLink } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { HiOfficeBuilding } from "react-icons/hi";
import { useState } from 'react';


function StatCard(props) {
  const {label, value} = props
  return (
    <div className="stat">
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  )
}

function Contact(props) {
  return (
    <div className='contact' >
      {props.icon}
      <p className={props.label ? undefined : 'inactive'}>{props.label || "Not Available"}</p>
    </div>
  )
}


function App() {

  const [isDark, setIsDark] = useState(false)
  const [profile, setProfile] = useState({
    followers: 1,
    following:1,
    repos:1,
    name: "E",
    username: 'eo',
    dateJoined: '25 Dec 2025',
    bio:"Banga soup is bae",
    imgUrl: "https://info.orcid.org/wp-content/uploads/2019/11/github-logo.jpg",
    location: 'CafeOne',
    twitterUsername: "E",
    blog: "bangasoup.com",
    company:"VF"
  })

  const toggleMode=()=> {
    setIsDark(prev=>!prev)
  }


  const getUser = async (formData) => {
        const username = formData.get('username')
        const link = `https://api.github.com/users/${username}`

        const res = await fetch(link, {
          method: 'GET',
          headers: {
            accept: "application/vnd.github+json"
          }
        })
        const data = await res.json()
        console.log(data)
        const {bio, blog, company, created_at, followers, following, location, login, name, public_repos, twitter_username, avatar_url} = data


        setProfile(prev=>{
          return {
            followers: followers,
            following:following,
            repos:public_repos,
            name: name,
            username: login,
            dateJoined: '25 Dec 2025',
            bio:bio,
            imgUrl: avatar_url,
            location: location,
            twitterUsername: twitter_username,
            blog: blog,
            company:company
          }
        })
  }

  return (
    <main className={isDark ? "dark" : undefined}>
      <div className="container">
        <div className="header">
          <h1>devfinder</h1>
          <button onClick={toggleMode}>{isDark ? 'LIGHT' : 'DARK'} { isDark ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}</button>
        </div>

        <form action={getUser}>
          <FiSearch size={30} color='var(--primary-blue)' />
          <input name='username' placeholder='Search Github username...' />
          <button>Search</button>
        </form>

        <div className="card">
          <div className="picture">
               <img src={profile.imgUrl || "https://info.orcid.org/wp-content/uploads/2019/11/github-logo.jpg"} />
          </div>
       
          <div className="details">
            <div className="names">
              <div className="name">
                <h1>{profile.name}</h1>
                <p>@{profile.username}</p>
              </div>
              <p className="date">
                Joined {profile.dateJoined}
              </p>
            </div>
            <p className={profile.bio ? undefined : 'inactive'}>{profile.bio || "This profile has no bio"}</p>
            <div className="stats">
              <StatCard label="Repos" value={profile.repos} />
              <StatCard label="Followers" value={profile.followers} />
              <StatCard label="Following" value={profile.following} />

            </div>
            <div className="contacts">
              <Contact icon={<FaLocationDot color='var(--dark-grey)'  />} label={profile.location} />
              <Contact icon={<IoLogoTwitter color='var(--dark-grey)'  />} label={profile.twitterUsername}  />
              <Contact icon={<FaLink color='var(--dark-grey)'  />} label={profile.blog}  />
              <Contact icon={<HiOfficeBuilding color='var(--dark-grey)'  />} label={profile.company}  />
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default App
