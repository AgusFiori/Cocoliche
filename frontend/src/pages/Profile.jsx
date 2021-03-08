import React from "react";
import { connect } from 'react-redux';

const Profile = (props) => {
  
  return (
    <div>
      <h2>Tu perfil</h2>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    loggedUser: state.authR.loggedUser,
    reservations: state.reservationsR.reservations
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)