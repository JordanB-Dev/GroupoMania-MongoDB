import { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateProfilAdmin from '../UpdateProfilAdmin'
import { dateParser } from '../Utils'

const WallContent = ({ data }) => {
  const userData = useSelector((state) => state.userReducer)
  const [open, setOpen] = useState(false)

  return (
    <div className="wall_container">
      <div className="wall_container_header">
        {data.isBan === false || data.isAdmin === true ? (
          <h1>
            Profil de {data.firstname} {data.lastname}
          </h1>
        ) : (
          <h1 className="red">Compte désactiver</h1>
        )}
        <img src={data.picture} alt={data._id} />
        <h3>Bio</h3>
        <p>{data.bio}</p>
        <h4>Membre depuis le : {dateParser(data.createdAt)}</h4>
      </div>
      {userData.isAdmin && (
        <div className="dropdown_admin">
          <div className="dropdown" id={`dropdown-$admin`}>
            <div className="dropdown_header">
              <div className="dropdown_tilte">Administrateur</div>
              <a
                className={`dropdown_fleche ${open}`}
                href={`#dropdown-admin`}
                onClick={() => setOpen(!open)}
              >
                <img src="./img/icons/fleche.svg" alt="Ouvrir cette liste" />
              </a>
            </div>

            {open && (
              <div className="dropdown_description">
                <UpdateProfilAdmin data={data} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default WallContent
