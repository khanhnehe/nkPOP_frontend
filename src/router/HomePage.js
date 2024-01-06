import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/register');
        } else {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return null; // or return some JSX if you want to render something when isLoggedIn is true
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);