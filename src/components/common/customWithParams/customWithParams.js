import {useParams, useLocation, useNavigate} from "react-router-dom";


const customWithParams = (Component) => {
    return (props) => {
        let location = useLocation()
        let history = useNavigate()
        let params = useParams()
        return <Component location={location} history={history} params={params} {...props}/>
    }
}

export default customWithParams