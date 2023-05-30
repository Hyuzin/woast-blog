import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import PropTypes from 'prop-types';


const ProtectedRoute = ({component}) => {
  const [currentUser] = useContext(AuthContext); // Your logic to check if the user is authenticated

    if(currentUser != null) {
        return {component}
    } else {
        return <Redirect to="/" />
    }

//   return class extends React.Component {

//       if (isAuthenticated) {
//         // User is authenticated, render the component
//         return <WrappedComponent {...this.props} />;
//       } else {
//         // User is not authenticated, redirect to login page
//         return <Redirect to="/login" />;
//       }
//     }
//   };
};

ProtectedRoute.propTypes = {
    component: PropTypes.elementType,
  };
  

export default ProtectedRoute;
