import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="error_page">
      <p className="error_page_quatreCent">404</p>
      <p className="error_page_introuvable">
        Oups! La page que vous demandez n'existe pas.
      </p>
      <Link className="error_page_link" to="/">
        Retourner sur la page d’accueil
      </Link>
    </div>
  )
}

export default ErrorPage
