import './App.css'
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaLocationDot, FaLink } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { HiOfficeBuilding } from "react-icons/hi";
import { useState } from 'react';


function getActualMonth(index) {
  switch (index) {
    case 0:
      return 'January'
      break;

    case 1:
      return 'February'
      break;

    case 2:
      return 'March'
      break;

    case 3:
      return 'April'
      break;

    case 4:
      return 'May'
      break;

    case 5:
      return 'June'
      break;

    case 6:
      return 'July'
      break;

    case 7:
      return 'August'
      break;

    case 8:
      return 'September'
      break;

    case 9:
      return 'October'
      break;

    case 10:
      return 'November'
      break;

    case 11:
      return 'December'
      break;

    default:
      return 'Month unknown'
      break;
  }
}


function StatCard(props) {
  const { label, value } = props
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
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    followers: 1,
    following: 1,
    repos: 1,
    name: "E",
    username: 'eo',
    dateJoined: '25 Dec 2025',
    bio: "Banga soup is bae",
    imgUrl: "https://info.orcid.org/wp-content/uploads/2019/11/github-logo.jpg",
    location: 'CafeOne',
    twitterUsername: "E",
    blog: "bangasoup.com",
    company: "VF"
  })

  const toggleMode = () => {
    setIsDark(prev => !prev)
  }


  const getUser = async (formData) => {

    try {

      setIsLoading(true)

      const username = formData.get('username')
      const link = `https://api.github.com/users/${username}`

      const res = await fetch(link, {
        method: 'GET',
        headers: {
          accept: "application/vnd.github+json"
        }
      })
      const data = await res.json()
      const { bio, blog, company, created_at, followers, following, location, login, name, public_repos, twitter_username, avatar_url } = data

      const date = new Date(created_at)
      const year = date.getFullYear()
      const month = getActualMonth(date.getMonth())
      const day = date.getDate()


     const dateJoined = `${day} ${month} ${year}`


      setProfile(prev => {
        return {
          followers: followers,
          following: following,
          repos: public_repos,
          name: name,
          username: login,
          dateJoined: dateJoined,
          bio: bio,
          imgUrl: avatar_url,
          location: location,
          twitterUsername: twitter_username,
          blog: blog,
          company: company
        }
      })
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <main className={isDark ? "dark" : undefined}>
      <div className="container">
        <div className="header">
          <h1>devfinder</h1>
          <button onClick={toggleMode}>{isDark ? 'LIGHT' : 'DARK'} {isDark ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}</button>
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

          {
            isLoading === true ?
              <p>Loading</p> : (

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
                    <Contact icon={<FaLocationDot color='var(--dark-grey)' />} label={profile.location} />
                    <Contact icon={<IoLogoTwitter color='var(--dark-grey)' />} label={profile.twitterUsername} />
                    <Contact icon={<FaLink color='var(--dark-grey)' />} label={profile.blog} />
                    <Contact icon={<HiOfficeBuilding color='var(--dark-grey)' />} label={profile.company} />
                  </div>
                </div>
              )
          }

        </div>
      </div>

    </main>
  )
}

export default App
